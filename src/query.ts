import { isBoolean, isNumber, isString, isSymbol } from "lodash";
import postgres from "postgres";
import { arrayParser } from "./arrayparser";

export const encoders: {
  boolean: Encoder<boolean>;
  number: Encoder<number>;
  string: Encoder<string>;
} = {
  boolean: {
    deserialize: function (b: any) {
      return b === "t" /* in sql */ || b === true /* in json */ ? true : false;
    },
    serialize: function (b: boolean) {
      return b === true ? "true" : b === false ? "false" : "null";
    },
  },
  number: {
    deserialize: function (b: any) {
      return +b;
    },
    serialize: function (n: number) {
      return n.toString();
    },
  },
  string: {
    deserialize: function (b: any) {
      return b;
    },
    serialize: (s: string) => s,
  },
} as const;

type ScalarT =
  | null
  | number
  | string
  | boolean
  | Array<ScalarT>
  | { [key: string]: ScalarT } /* JSON */;

// type RelationT<> = /* To encapsulate a subselect ? */

export function NOT(val: Expr<boolean>): Expr<boolean> {
  return new Expr(encoders.boolean, `NOT (${val.asSql})`);
}
export function EQ<A>(left: Expr<A>, right: Expr<A>): Expr<boolean> {
  return new Expr(encoders.boolean, `${left.asSql} = ${right.asSql}`);
}
export function PLUS(left: Expr<number>, right: Expr<number>): Expr<number> {
  return new Expr(encoders.number, `${left.asSql} + ${right.asSql}`);
}

export const op = {
  NOT,
  EQ,
  PLUS,
};

export function JSON_BUILD_OBJECT<Obj extends { [key: string]: any }>(o: {
  [K in keyof Obj]: Expr<Obj[K]>;
}): Expr<Obj> {
  const keys: (keyof Obj)[] = object_keys(o);

  const keysAndValues = keys
    .map((key) => `'${String(key)}', ${o[key].asSql}`)
    .join(", ");

  return new Expr(
    {
      deserialize: function (b: string) {
        console.log(b);
        const js = JSON.parse(b);
        for (let key of keys) {
          js[key] = o[key].encoder.deserialize(js[key]);
        }
        return js;
      },
    },
    `JSON_BUILD_OBJECT(${keysAndValues})`
  );
}

export function ARRAY_AGG<T>(ex: Expr<T>): Expr<T[]> {
  return new Expr(
    {
      deserialize: function (b: any) {
        return arrayParser(b, ex.encoder.deserialize);
      },
    },
    `ARRAY_AGG(${ex.asSql})`
  );
}

export function val<T extends boolean | number | string>(a: T): Expr<T> {
  // TODO need serialization and maybe also escaping
  if (isBoolean(a)) {
    return new Expr(encoders.boolean, `${a}`) as Expr<typeof a>;
  } else if (isNumber(a)) {
    return new Expr(encoders.number, `${a}`) as Expr<typeof a>;
  } else if (isString(a)) {
    return new Expr(encoders.string, `${a}`) as Expr<typeof a>;
  } else {
    throw new Error("Not allowed");
  }
}

class Expr<A> {
  public readonly encoder: Encoder<A>;
  public readonly asSql: string;
  constructor(encoder: Encoder<A>, asSql: string) {
    this.asSql = asSql;
    this.encoder = encoder;
  }
}

export function AND(
  ...preds: [Expr<boolean>, Expr<boolean>, ...Expr<boolean>[]]
) {
  return preds.slice(2).reduce((acc, pred) => {
    return new Expr(encoders.boolean, `(${acc.asSql}) AND (${pred.asSql})`);
  }, new Expr(encoders.boolean, `(${preds[0].asSql}) AND (${preds[1].asSql})`));
}

export function CONCAT(...preds: [Expr<string>, ...Expr<string>[]]) {
  return new Expr(
    encoders.string,
    `CONCAT(${preds.map((p) => p.asSql).join(", ")})`
  );
}

type Encoder<A> = {
  deserialize: (b: any) => A;
  serialize: (A: A) => string;
};

// type GetTypeFromExpr<F> = F extends Expr<infer T> ? T : never;

export class Select<
  AllTablesInDB extends Record<string, { [fieldname: string]: any }>,
  TablesInScope extends {
    [tableName: string]: { [fieldname: string]: any };
  },
  Returns extends { [returnname: string]: any }
> {
  private db: DB<AllTablesInDB>;
  private contents: {
    tablesInScope: {
      [tableName in keyof TablesInScope]: {
        [colName in keyof TablesInScope[tableName]]: Expr<
          TablesInScope[tableName][colName]
        >;
      };
    };
    from?:
      | { tag: "table"; table: TableDef<any, any>; as?: string }
      | { tag: "select"; select: Select<AllTablesInDB, any, any>; as: string };
    where: Expr<boolean>[];
    joins: {
      table:
        | { tag: "table"; table: TableDef<any, any>; as?: string }
        | {
            tag: "select";
            select: Select<AllTablesInDB, any, any>;
            as: string;
          };
      type: "INNER" | "LEFT" | "RIGHT";
      on: Expr<boolean>;
    }[];
    groupBy: null | Expr<any>[];
    returns: { [colName in keyof Returns]: Expr<Returns[colName]> };
  };

  public constructor(
    db: DB<AllTablesInDB>,
    contents: {
      tablesInScope: {
        [tableName in keyof TablesInScope]: {
          [colName in keyof TablesInScope[tableName]]: Expr<
            TablesInScope[tableName][colName]
          >;
        };
      };
      from?:
        | { tag: "table"; table: TableDef<any, any>; as?: string }
        | {
            tag: "select";
            select: Select<AllTablesInDB, any, any>;
            as: string;
          };
      where: Expr<boolean>[];
      joins: {
        table:
          | { tag: "table"; table: TableDef<any, any>; as?: string }
          | {
              tag: "select";
              select: Select<AllTablesInDB, any, any>;
              as: string;
            };
        type: "INNER" | "LEFT" | "RIGHT";
        on: Expr<boolean>;
      }[];
      groupBy: null | Expr<any>[];
      returns: { [colName in keyof Returns]: Expr<Returns[colName]> };
    }
  ) {
    this.db = db;
    this.contents = contents || ({} as TablesInScope);
  }

  private makeDbObj(): {
    [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
      tableName,
      AllTablesInDB[tableName]
    >;
  } & { SELECT: () => Select<AllTablesInDB, {}, {}> } {
    const dbObj = {} as {
      [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
        tableName,
        AllTablesInDB[tableName]
      >;
    };
    const allTablesInDbNames = object_keys(
      this.db.tables
    ) as (keyof AllTablesInDB & string)[];
    for (let tableName of allTablesInDbNames) {
      dbObj[tableName] = this.db.tables[tableName];
    }
    return {
      ...dbObj,
      SELECT: () => this.db.SELECT(),
    };
  }

  FROM<
    FromTableName extends string,
    FromTable extends { [colName: string]: any },
    NewTablesInScope extends TablesInScope & { [k in FromTableName]: FromTable }
  >(
    cb: (
      db: {
        [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
          tableName,
          AllTablesInDB[tableName]
        >;
      } & { SELECT: () => Select<AllTablesInDB, {}, {}> }
    ) => TableOrNamedSelect<FromTableName, FromTable>
  ): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const tableOrSelect = cb(this.makeDbObj());
    const [fromClause, name, newTable] =
      this.extractTableOrNamedSelect(tableOrSelect);
    const newTableInScope = { [name]: newTable };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScope,
    } as {
      [tableName in keyof NewTablesInScope]: {
        [colName in keyof NewTablesInScope[tableName]]: Expr<
          NewTablesInScope[tableName][colName]
        >;
      };
    };
    return new Select(this.db, {
      ...this.contents,
      tablesInScope: newTablesInScope,
      from: fromClause,
    });
  }

  JOIN<
    FromTableName extends string,
    FromTable extends { [colName: string]: any },
    NewTablesInScope extends TablesInScope & {
      [k in FromTableName]: FromTable;
    }
  >(
    cb: (
      db: {
        [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
          tableName,
          AllTablesInDB[tableName]
        >;
      } & { SELECT: () => Select<AllTablesInDB, {}, {}> }
    ) => TableOrNamedSelect<FromTableName, FromTable>,
    makeExpr: (scope: {
      [tableName in keyof NewTablesInScope]: {
        [colName in keyof NewTablesInScope[tableName]]: Expr<
          NewTablesInScope[tableName][colName]
        >;
      };
    }) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const tableOrSelect = cb(this.makeDbObj());
    const [clause, name, newTable] =
      this.extractTableOrNamedSelect(tableOrSelect);
    const newTableInScope = { [name]: newTable };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScope,
    } as {
      [tableName in keyof NewTablesInScope]: {
        [colName in keyof NewTablesInScope[tableName]]: Expr<
          NewTablesInScope[tableName][colName]
        >;
      };
    };
    const expr = makeExpr(newTablesInScope);
    return new Select(this.db, {
      ...this.contents,
      tablesInScope: newTablesInScope,
      joins: this.contents.joins.concat({
        table: clause,
        type: "INNER",
        on: expr,
      }),
    });
  }

  // JOIN_LATERAL<
  //   AS extends string,
  //   SubSelectReturns extends { [returnname: string]: any },
  //   NewTablesInScope extends TablesInScope & { [k in AS]: SubSelectReturns }
  // >(
  //   t: AS,
  //   select: (scope: {
  //     [tableName in keyof TablesInScope]: {
  //       [colName in keyof TablesInScope[tableName]]: Expr<
  //         TablesInScope[tableName][colName]
  //       >;
  //     };
  //   }) => Select<AllTablesInDB, any, SubSelectReturns>,
  //   makeExpr: (scope: {
  //     [tableName in keyof NewTablesInScope]: {
  //       [colName in keyof NewTablesInScope[tableName]]: Expr<
  //         NewTablesInScope[tableName][colName]
  //       >;
  //     };
  //   }) => Expr<boolean>
  // ): Select<AllTablesInDB, NewTablesInScope, Returns> {
  //   const nestedSelect = select(this.contents.tablesInScope);
  //   const newTableInScope = {} as {
  //     [colName in keyof SubSelectReturns]: Expr<SubSelectReturns[colName]>;
  //   };
  //   for (let colName of object_keys(nestedSelect.contents.returns)) {
  //     const origExpr = nestedSelect.contents.returns[colName];
  //     newTableInScope[colName] = new Expr(
  //       origExpr.encoder,
  //       `${t}.${String(colName)}`
  //     );
  //   }
  //   const newTableInScopeRec = { [t]: newTableInScope } as {
  //     [k in AS]: typeof newTableInScope;
  //   };
  //   const newTablesInScope = {
  //     ...this.contents.tablesInScope,
  //     ...newTableInScopeRec,
  //   } as {
  //     [tableName in keyof NewTablesInScope]: {
  //       [colName in keyof NewTablesInScope[tableName]]: Expr<
  //         NewTablesInScope[tableName][colName]
  //       >;
  //     };
  //   };
  //   const expr = makeExpr(newTablesInScope);
  //   return new Select(this.db, {
  //     ...this.contents,
  //     tablesInScope: newTablesInScope,
  //     joins: this.contents.joins.concat({
  //       table: { tag: "select", select: nestedSelect },
  //       type: "INNER",
  //       on: expr,
  //       as: t,
  //     }),
  //   });
  // }

  JOIN_LEFT<
    JoiningTableName extends string,
    JoiningTable extends { [colName: string]: any },
    NewTablesInScope extends TablesInScope & {
      [k in JoiningTableName]: JoiningTable;
    },
    NewTablesInScopeAsExprs extends {
      [tableName in keyof NewTablesInScope]: {
        [colName in keyof NewTablesInScope[tableName]]: Expr<
          NewTablesInScope[tableName][colName]
        >;
      };
    },
    NewTablesInScopeNullable extends TablesInScope & {
      [k in JoiningTableName]: MakeRecordNullable<JoiningTable>;
    },
    NewTablesInScopeNullableAsExprs extends {
      [tableName in keyof NewTablesInScopeNullable]: {
        [colName in keyof NewTablesInScopeNullable[tableName]]: Expr<
          NewTablesInScopeNullable[tableName][colName]
        >;
      };
    }
  >(
    cb: (
      db: {
        [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
          tableName,
          AllTablesInDB[tableName]
        >;
      } & { SELECT: () => Select<AllTablesInDB, {}, {}> }
    ) => TableOrNamedSelect<JoiningTableName, JoiningTable>,
    makeExpr: (scope: NewTablesInScopeAsExprs) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScopeNullable, Returns> {
    const tableOrSelect = cb(this.makeDbObj());
    const [clause, name, newTable] =
      this.extractTableOrNamedSelect(tableOrSelect);
    const newTableInScope = { [name]: newTable };
    const newTableInScopeNullable = {
      [name]: nullifyRecord(newTable),
    } as {
      [k in JoiningTableName]: {
        [colName in keyof JoiningTable]: Expr<JoiningTable | null>;
      };
    };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScope,
    } as NewTablesInScopeAsExprs;
    const newTablesInScopeNullable = {
      ...this.contents.tablesInScope,
      ...newTableInScopeNullable,
    } as NewTablesInScopeNullableAsExprs;
    const expr = makeExpr(newTablesInScope);
    return new Select<AllTablesInDB, NewTablesInScopeNullable, Returns>(
      this.db,
      {
        ...this.contents,
        tablesInScope: newTablesInScopeNullable,
        joins: this.contents.joins.concat({
          table: clause,
          type: "LEFT",
          on: expr,
        }),
      }
    );
  }

  WHERE(
    cb: (scope: {
      [t in keyof TablesInScope]: {
        [f in keyof TablesInScope[t]]: Expr<
          GetTypeFromFieldDef<TablesInScope[t][f]>
        >;
      };
    }) => Expr<boolean>
  ): Select<AllTablesInDB, TablesInScope, Returns> {
    const expr = cb(this.contents.tablesInScope);
    return new Select(this.db, {
      ...this.contents,
      where: this.contents.where.concat(expr),
    });
  }

  GROUP_BY(
    cb: (scope: {
      [t in keyof TablesInScope]: {
        [f in keyof TablesInScope[t]]: Expr<
          GetTypeFromFieldDef<TablesInScope[t][f]>
        >;
      };
    }) => Expr<any> | Expr<any>[]
  ): Select<AllTablesInDB, TablesInScope, Returns> {
    const scope = this.contents.tablesInScope;

    const expr = cb(scope);

    return new Select(this.db, {
      ...this.contents,
      groupBy: Array.isArray(expr) ? expr : [expr],
    });
  }

  PROJECT<NewReturns extends { [columnname: string]: ScalarT }>(
    cb: (scope: {
      [tableName in keyof TablesInScope]: {
        [colName in keyof TablesInScope[tableName]]: Expr<
          TablesInScope[tableName][colName]
        >;
      };
    }) => {
      [colName in keyof NewReturns]: Expr<NewReturns[colName]>;
    }
  ): Select<AllTablesInDB, TablesInScope, NewReturns> {
    const scope = this.contents.tablesInScope;

    const exprs = cb(scope);

    return new Select(this.db, {
      ...this.contents,
      returns: exprs,
    });
  }

  private extractTableOrNamedSelect<
    Name extends string,
    Relation extends { [fieldname: string]: FieldDef<any> }
  >(
    s: TableOrNamedSelect<Name, Relation>
  ): [
    TableOrNamedSelectInternal,
    Name,
    {
      [colName in keyof Relation]: Expr<Relation[colName]>;
    }
  ] {
    if (isNumber(s) || isSymbol(s)) {
      throw new Error("??");
    }
    if (!("Q" in s)) {
      const newTableInScope = makeExpressionsFromTableDef(s, s.__meta.name) as {
        [colName in keyof Relation]: Expr<Relation[colName]>;
      };
      return [
        { tag: "table", table: s } as const,
        s.__meta.name,
        newTableInScope,
      ];
    } else {
      if ("__meta" in s.Q) {
        const newTableInScope = makeExpressionsFromTableDef(s.Q, s.AS) as {
          [colName in keyof Relation]: Expr<Relation[colName]>;
        };
        return [
          { tag: "table", table: s.Q, as: s.AS } as const,
          s.AS,
          newTableInScope,
        ];
      } else {
        const newTableInScope = {} as {
          [colName in keyof Relation]: Expr<Relation[colName]>;
        };
        for (let colName of object_keys(s.Q.contents.returns)) {
          const origExpr = s.Q.contents.returns[colName];
          newTableInScope[colName] = new Expr(
            origExpr.encoder,
            `${String(s.AS)}.${String(colName)}`
          );
        }
        return [
          { tag: "select", select: s.Q, as: s.AS } as const,
          s.AS,
          newTableInScope,
        ];
      }
    }
  }

  private tableOrSelectInternalToSql(t: TableOrNamedSelectInternal): string {
    if (t.tag === "table") {
      return (
        t.table.__meta.schema +
        "." +
        t.table.__meta.name +
        (t.as === undefined ? "" : " AS " + t.as)
      );
    } else {
      return t.select.toSql() + " AS " + t.as;
    }
  }

  toSql(): string {
    return [
      "(",
      "SELECT " +
        object_keys(this.contents.returns)
          .map(
            (key) => this.contents.returns[key].asSql + " AS " + key.toString()
          )
          .join(", "),
      this.contents.from
        ? "FROM " + this.tableOrSelectInternalToSql(this.contents.from)
        : "",
      ...this.contents.joins.map(
        (j) =>
          j.type +
          " JOIN " +
          this.tableOrSelectInternalToSql(j.table) +
          " ON " +
          j.on.asSql
      ),
      (this.contents.where.length > 0 ? "WHERE " : "") +
        this.contents.where.map((e) => e.asSql).join("\n  AND "),
      this.contents.groupBy === null
        ? ""
        : "GROUP BY " + this.contents.groupBy.map((e) => e.asSql).join(", "),
      ")",
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  async run(pg: postgres.Sql<any>): Promise<Returns[]> {
    const sqlText = this.toSql();
    console.log("Running query: ");
    console.log(sqlText);
    return pg
      .unsafe(sqlText, undefined /* params */, { prepare: true })
      .raw()
      .then((res) => this.deserializeResults(res));
  }

  private deserializeResults(rawRows: (Buffer | null)[][]): Returns[] {
    debugger;
    const names = object_keys(this.contents.returns);
    const self = this;
    return rawRows.map(function (cols) {
      const returnRow: Returns = {} as Returns;
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const returnsExpr = self.contents.returns[name];
        const col = cols[i];
        returnRow[name as keyof Returns] = returnsExpr.encoder.deserialize(
          col?.toString("utf8") || null
        );
      }
      return returnRow;
    });
  }
}

export type FieldDef<T> = {
  name: string;
  type: "string" | "int" | "boolean";
  nullable: boolean;
};

type GetTypeFromFieldDef<F> = F extends FieldDef<infer T> ? T : never;

export type TableDef<
  Name extends string,
  Fields extends { [fieldname: string]: FieldDef<any> }
> = {
  readonly __meta: {
    name: Name;
    schema: string;
  };
  readonly fields: Fields;
};

type MakeTableDefFromRecord<Name extends string, Record> = Record extends {
  [col: string]: any;
}
  ? TableDef<Name, { [col in keyof Record]: FieldDef<Record[col]> }>
  : never;

// type DBForCallBack<AllTablesInDB extends Record<string,{[fieldName:string]: any} >> = {
//   [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
//     tableName,
//   AllTablesInDB[tableName]
//     >;
// } & { SELECT: () => Select<AllTablesInDB, {}, {}> }
type TableOrNamedSelect<
  Name extends string,
  Relation extends { [fieldname: string]: FieldDef<any> }
> =
  | TableDef<Name, Relation>
  | { Q: TableDef<any, Relation>; AS: Name }
  | { Q: Select<any, any, Relation>; AS: Name };

type TableOrNamedSelectInternal =
  | { tag: "table"; table: TableDef<any, any>; as?: string }
  | {
      tag: "select";
      select: Select<any, any, any>;
      as: string;
    };

function nullifyRecord<Fields extends { [fieldname: string]: any }>(t: {
  [K in keyof Fields]: Expr<Fields[K]>;
}): { [K in keyof Fields]: Expr<null | Fields[K]> } {
  const nullifiedFields = {} as {
    [K in keyof Fields]: Expr<null | Fields[K]>;
  };
  const keys = object_keys(t);
  for (let key of keys) {
    const field = t[key];
    nullifiedFields[key] = new Expr(
      {
        deserialize: (n: null | any) => {
          return n === null ? null : field.encoder.deserialize(n);
        },
      },
      field.asSql
    );
  }
  return {
    ...t,
    fields: nullifiedFields,
  };
}

type MakeRecordNullable<A> = A extends { [k: string]: any }
  ? { [f in keyof A]: A[f] | null }
  : never;

export type Type = SimpleT | RecordT;
export type AnyScalarT = {
  kind: "anyscalar";
};
export type NullableT<T extends SimpleT> = {
  kind: "nullable";
  typevar: T;
};
export type ArrayT<T> = {
  kind: "array";
  subtype: "array" | "list";
  typevar: T;
};
export type JsonKnownT = {
  kind: "jsonknown";
  record: RecordT;
};
// export type ScalarT = {
//   kind: "scalar";
//   name: string;
// };
export type VoidT = {
  // represents nothing, so zero rows, like when doing an INSERT without RETURNING
  kind: "void";
};
export type SimpleT =
  | AnyScalarT
  | JsonKnownT
  | ScalarT
  | NullableT<any>
  | ArrayT<any>;

export type RecordT = {
  kind: "record";
  fields: FieldDef<any>[];
};

export const BuiltinTypes = {
  Boolean: {
    kind: "scalar",
    name: { name: "boolean" },
  },
  Smallint: {
    kind: "scalar",
    name: { name: "smallint" },
  },
  Integer: {
    kind: "scalar",
    name: { name: "integer" },
  },
  Numeric: {
    kind: "scalar",
    name: { name: "numeric" },
  },
  Bigint: {
    kind: "scalar",
    name: { name: "bigint" },
  },
  Float2: {
    kind: "scalar",
    name: { name: "float2" },
  },
  Float4: {
    kind: "scalar",
    name: { name: "float4" },
  },
  Float8: {
    kind: "scalar",
    name: { name: "float8" },
  },
  Real: {
    kind: "scalar",
    name: { name: "real" },
  },
  Double: {
    kind: "scalar",
    name: { name: "double" },
  },
  Text: {
    kind: "scalar",
    name: { name: "text" },
  },
  AnyScalar: {
    kind: "anyscalar",
  },
  Date: {
    kind: "scalar",
    name: { name: "date" },
  },
  Time: {
    kind: "scalar",
    name: { name: "time" },
  },
  Timestamp: {
    kind: "scalar",
    name: { name: "timestamp" },
  },
  Interval: {
    kind: "scalar",
    name: { name: "interval" },
  },
  Json: {
    kind: "scalar",
    name: { name: "json" },
  },
  Jsonb: {
    kind: "scalar",
    name: { name: "jsonb" },
  },
  Null: {
    kind: "scalar", // correct?
    name: { name: "null" },
  },
} as const;

export class DB<
  AllTablesInDB extends { [tableName: string]: { [colName: string]: any } }
> {
  public readonly tables: {
    [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
      tableName,
      AllTablesInDB[tableName]
    >;
  };
  public readonly views: ReadonlyArray<{
    readonly name: string;
    readonly schema: string;
    readonly rel: RecordT;
  }>;

  constructor(inp: {
    tables: {
      [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
        tableName,
        AllTablesInDB[tableName]
      >;
    };
    views: ReadonlyArray<{
      readonly name: string;
      readonly schema: string;
      readonly rel: RecordT;
    }>;
  }) {
    this.tables = inp.tables;
    this.views = inp.views;
  }

  public SELECT() {
    return new Select<AllTablesInDB, {}, {}>(this, {
      tablesInScope: {},
      where: [],
      joins: [],
      returns: {},
      groupBy: null,
    });
  }
}

export function object_keys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export function checkAllCasesHandled(a: never): never {
  throw new Error(
    `checkAllCasesHandled assertion failed: ${JSON.stringify(a)}`
  );
}

function makeExpressionsFromTableDef<
  Fields extends { [fieldname: string]: any }
>(
  tableDef: TableDef<any, { [k in keyof Fields]: FieldDef<Fields[k]> }>,
  as: string
): { [k in keyof Fields]: Expr<GetTypeFromFieldDef<Fields[k]>> } {
  const tableOfExprs = {} as {
    [f in keyof Fields]: Expr<GetTypeFromFieldDef<Fields[f]>>;
  };
  for (let columnName of object_keys(tableDef.fields)) {
    const col = tableDef.fields[columnName];
    const encoderT = encoders[col.type === "int" ? "number" : col.type];
    const encoder =
      col.nullable === true
        ? {
            deserialize: (n: null | any) => {
              return n === null ? null : encoderT.deserialize(n);
            },
          }
        : encoderT;
    tableOfExprs[columnName] = new Expr(encoder as any, `${as}.${col.name}`);
  }
  return tableOfExprs;
}
