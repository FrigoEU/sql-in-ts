import { isBoolean, isNumber, isString } from "lodash";
import postgres from "postgres";
import { arrayParser } from "./arrayparser";

const encoders: {
  boolean: Encoder<boolean>;
  number: Encoder<number>;
  string: Encoder<string>;
} = {
  boolean: {
    deserialize: function (b: any) {
      return b === "t" /* in sql */ || b === true /* in json */ ? true : false;
    },
  },
  number: {
    deserialize: function (b: any) {
      return +b;
    },
  },
  string: {
    deserialize: function (b: any) {
      return b;
    },
  },
} as const;

type pgtype = keyof typeof encoders;

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

export function JSON_BUILD_OBJECT<Obj extends { [key: string]: any }>(
  o: {
    [K in keyof Obj]: Expr<Obj[K]>;
  }
): Expr<Obj> {
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
};

// type GetTypeFromExpr<F> = F extends Expr<infer T> ? T : never;

export class Select<
  AllTablesInDB extends {
    [tableName: string]: { [fieldname: string]: any };
  },
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
    from?: string;
    where: Expr<boolean>[];
    joins: {
      table:
        | { tag: "table"; table: TableDef<any, any> }
        | { tag: "select"; select: Select<AllTablesInDB, any, any> };
      type: "INNER" | "LEFT" | "RIGHT";
      on: Expr<boolean>;
      as: string;
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
      from?: string;
      where: Expr<boolean>[];
      joins: {
        table:
          | { tag: "table"; table: TableDef<any, any> }
          | { tag: "select"; select: Select<AllTablesInDB, any, any> };
        type: "INNER" | "LEFT" | "RIGHT";
        on: Expr<boolean>;
        as: string;
      }[];
      groupBy: null | Expr<any>[];
      returns: { [colName in keyof Returns]: Expr<Returns[colName]> };
    }
  ) {
    this.db = db;
    this.contents = contents || ({} as TablesInScope);
  }

  FROM<
    FromTableName extends keyof AllTablesInDB,
    FromTable extends AllTablesInDB[FromTableName],
    NewTablesInScope extends TablesInScope & { [k in FromTableName]: FromTable }
  >(t: FromTableName): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const table = this.db.tables[t];
    const newTableInScope = {
      [t]: makeExpressionsFromTableDef(table, table.name),
    } as {
      [k in FromTableName]: {
        [colName in keyof FromTable]: FromTable[colName];
      };
    };
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
      from: table.schema + "." + table.name,
    });
  }

  JOIN<
    FromTableName extends keyof AllTablesInDB,
    FromTable extends AllTablesInDB[FromTableName],
    NewTablesInScope extends TablesInScope &
      {
        [k in FromTableName]: FromTable;
      }
  >(
    t: FromTableName,
    makeExpr: (
      scope: {
        [tableName in keyof NewTablesInScope]: {
          [colName in keyof NewTablesInScope[tableName]]: Expr<
            NewTablesInScope[tableName][colName]
          >;
        };
      }
    ) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const table = this.db.tables[t] as MakeTableDefFromRecord<FromTable>;
    const tableAsExpr = makeExpressionsFromTableDef(table, table.name);
    const newTableInScope = { [t]: tableAsExpr } as {
      [k in FromTableName]: { [col in keyof FromTable]: Expr<FromTable[col]> };
    };
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
        table: { tag: "table", table },
        type: "INNER",
        on: expr,
        as: table.name,
      }),
    });
  }

  JOIN_SUBSELECT<
    AS extends string,
    SubSelectReturns extends { [returnname: string]: any },
    NewTablesInScope extends TablesInScope & { [k in AS]: SubSelectReturns }
  >(
    t: AS,
    select: Select<AllTablesInDB, any, SubSelectReturns>,
    makeExpr: (
      scope: {
        [tableName in keyof NewTablesInScope]: {
          [colName in keyof NewTablesInScope[tableName]]: Expr<
            NewTablesInScope[tableName][colName]
          >;
        };
      }
    ) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const newTableInScope = {} as {
      [colName in keyof SubSelectReturns]: Expr<SubSelectReturns[colName]>;
    };
    for (let colName of object_keys(select.contents.returns)) {
      const origExpr = select.contents.returns[colName];
      newTableInScope[colName] = new Expr(
        origExpr.encoder,
        `${t}.${String(colName)}`
      );
    }
    const newTableInScopeRec = { [t]: newTableInScope } as {
      [k in AS]: typeof newTableInScope;
    };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScopeRec,
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
        table: { tag: "select", select: select },
        type: "INNER",
        on: expr,
        as: t,
      }),
    });
  }

  JOIN_LATERAL<
    AS extends string,
    SubSelectReturns extends { [returnname: string]: any },
    NewTablesInScope extends TablesInScope & { [k in AS]: SubSelectReturns }
  >(
    t: AS,
    select: (
      scope: {
        [tableName in keyof TablesInScope]: {
          [colName in keyof TablesInScope[tableName]]: Expr<
            TablesInScope[tableName][colName]
          >;
        };
      }
    ) => Select<AllTablesInDB, any, SubSelectReturns>,
    makeExpr: (
      scope: {
        [tableName in keyof NewTablesInScope]: {
          [colName in keyof NewTablesInScope[tableName]]: Expr<
            NewTablesInScope[tableName][colName]
          >;
        };
      }
    ) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const nestedSelect = select(this.contents.tablesInScope);
    const newTableInScope = {} as {
      [colName in keyof SubSelectReturns]: Expr<SubSelectReturns[colName]>;
    };
    for (let colName of object_keys(nestedSelect.contents.returns)) {
      const origExpr = nestedSelect.contents.returns[colName];
      newTableInScope[colName] = new Expr(
        origExpr.encoder,
        `${t}.${String(colName)}`
      );
    }
    const newTableInScopeRec = { [t]: newTableInScope } as {
      [k in AS]: typeof newTableInScope;
    };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScopeRec,
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
        table: { tag: "select", select: nestedSelect },
        type: "INNER",
        on: expr,
        as: t,
      }),
    });
  }

  JOIN_LEFT<
    JoiningTableName extends keyof AllTablesInDB,
    JoiningTable extends AllTablesInDB[JoiningTableName],
    NewTablesInScope extends TablesInScope &
      {
        [k in JoiningTableName]: JoiningTable;
      },
    NewTablesInScopeAsExprs extends {
      [tableName in keyof NewTablesInScope]: {
        [colName in keyof NewTablesInScope[tableName]]: Expr<
          NewTablesInScope[tableName][colName]
        >;
      };
    },
    NewTablesInScopeNullable extends TablesInScope &
      {
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
    t: JoiningTableName,
    makeExpr: (scope: NewTablesInScopeAsExprs) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScopeNullable, Returns> {
    const table = this.db.tables[t] as MakeTableDefFromRecord<JoiningTable>;
    const tableAsExpr = makeExpressionsFromTableDef(table, table.name) as {
      [colName in keyof JoiningTable]: Expr<JoiningTable[colName]>;
    };
    const newTableInScope = {
      [t]: tableAsExpr,
    } as {
      [k in JoiningTableName]: typeof tableAsExpr;
    };
    const newTableInScopeNullable = {
      [t]: nullifyRecord(tableAsExpr),
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
          table: { tag: "table", table: table },
          type: "LEFT",
          on: expr,
          as: t as string,
        }),
      }
    );
  }

  WHERE(
    cb: (
      scope: {
        [t in keyof TablesInScope]: {
          [f in keyof TablesInScope[t]]: Expr<
            GetTypeFromField<TablesInScope[t][f]>
          >;
        };
      }
    ) => Expr<boolean>
  ): Select<AllTablesInDB, TablesInScope, Returns> {
    const expr = cb(this.contents.tablesInScope);
    return new Select(this.db, {
      ...this.contents,
      where: this.contents.where.concat(expr),
    });
  }

  GROUP_BY(
    cb: (
      scope: {
        [t in keyof TablesInScope]: {
          [f in keyof TablesInScope[t]]: Expr<
            GetTypeFromField<TablesInScope[t][f]>
          >;
        };
      }
    ) => Expr<any> | Expr<any>[]
  ): Select<AllTablesInDB, TablesInScope, Returns> {
    const scope = this.contents.tablesInScope;

    const expr = cb(scope);

    return new Select(this.db, {
      ...this.contents,
      groupBy: Array.isArray(expr) ? expr : [expr],
    });
  }

  PROJECT<NewReturns extends { [columnname: string]: ScalarT }>(
    cb: (
      scope: {
        [tableName in keyof TablesInScope]: {
          [colName in keyof TablesInScope[tableName]]: Expr<
            TablesInScope[tableName][colName]
          >;
        };
      }
    ) => {
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

  toSql(): string {
    return [
      "(",
      "SELECT " +
        object_keys(this.contents.returns)
          .map(
            (key) => this.contents.returns[key].asSql + " AS " + key.toString()
          )
          .join(", "),
      this.contents.from ? "FROM " + this.contents.from : "",
      ...this.contents.joins.map(
        (j) =>
          j.type +
          " JOIN " +
          (j.table.tag === "table"
            ? j.table.table.schema + "." + j.table.table.name
            : j.table.select.toSql()) +
          " AS " +
          j.as +
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

export type Field<T> = {
  name: string;
  type: "string" | "int" | "boolean";
  nullable: boolean;
};

type GetTypeFromField<F> = F extends Field<infer T> ? T : never;

export type TableDef<
  Name extends string,
  Fields extends { [fieldname: string]: Field<any> }
> = {
  readonly name: Name;
  readonly schema: string;
  readonly fields: Fields;
  readonly primaryKey: (keyof Fields)[];
  readonly defaults: (keyof Fields)[];
};

type MakeTableDefFromRecord<Record> = Record extends { [col: string]: any }
  ? TableDef<any, { [col in keyof Record]: Field<Record[col]> }>
  : never;

function nullifyRecord<Fields extends { [fieldname: string]: any }>(
  t: { [K in keyof Fields]: Expr<Fields[K]> }
): { [K in keyof Fields]: Expr<null | Fields[K]> } {
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

export type DB<
  AllTablesInDB extends {
    [tableName: string]: { [fieldname: string]: any };
  }
> = {
  readonly tables: {
    [tableName in keyof AllTablesInDB]: MakeTableDefFromRecord<
      AllTablesInDB[tableName]
    >;
  };
  readonly views: ReadonlyArray<{
    readonly name: string;
    readonly schema: string;
    readonly rel: RecordT;
  }>;
  // readonly domains: ReadonlyArray<{
  //   readonly name: QName;
  //   readonly type: SimpleT;
  // }>;
};

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
  fields: Field<any>[];
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

export function SELECT<
  AllTablesInDB extends { [tableName: string]: { [colName: string]: any } }
>(db: DB<AllTablesInDB>) {
  return new Select<AllTablesInDB, {}, {}>(db, {
    tablesInScope: {},
    where: [],
    joins: [],
    returns: {},
    groupBy: null,
  });
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
  TableInScope extends { [fieldname: string]: any }
>(
  tableDef: TableDef<
    any,
    { [k in keyof TableInScope]: Field<TableInScope[k]> }
  >,
  as: string
): { [k in keyof TableInScope]: Expr<TableInScope[k]> } {
  const tableOfExprs = {} as {
    [f in keyof typeof tableDef["fields"]]: Expr<
      GetTypeFromField<typeof tableDef["fields"][f]>
    >;
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
