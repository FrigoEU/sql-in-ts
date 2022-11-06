import { isArray, isBoolean, isNumber, isString } from "lodash";
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
};

// type GetTypeFromExpr<F> = F extends Expr<infer T> ? T : never;

export class Select<
  AllTablesInDB extends {
    [tableName: string]: TableDef<string, { [fieldname: string]: Field<any> }>;
  },
  TablesInScope extends {
    [tableName: string]: TableDef<string, { [fieldname: string]: Field<any> }>;
  },
  Returns extends { [returnname: string]: any }
> {
  private db: DB<AllTablesInDB>;
  private contents: {
    tablesInScope: TablesInScope;
    from?: string;
    where: Expr<boolean>[];
    joins: {
      table: TableDef<string, { [fieldname: string]: Field<any> }>;
      type: "INNER" | "LEFT" | "RIGHT";
      on: Expr<boolean>;
    }[];
    groupBy: null | Expr<any>[];
    returns: { [k in keyof Returns]: Expr<Returns[k]> };
  };

  public constructor(
    db: DB<AllTablesInDB>,
    contents: {
      tablesInScope: TablesInScope;
      from?: string;
      where: Expr<boolean>[];
      joins: {
        table: TableDef<string, { [fieldname: string]: Field<any> }>;
        type: "INNER" | "LEFT" | "RIGHT";
        on: Expr<boolean>;
      }[];
      groupBy: null | Expr<any>[];
      returns: { [k in keyof Returns]: Expr<Returns[k]> };
    }
  ) {
    this.db = db;
    this.contents = contents || ({} as TablesInScope);
  }

  FROM<FromTableName extends keyof AllTablesInDB>(
    t: FromTableName
  ): Select<
    AllTablesInDB,
    TablesInScope & { [k in FromTableName]: AllTablesInDB[FromTableName] },
    Returns
  > {
    const table = this.db.tables[t];
    const newTableInScope = { [t]: this.db.tables[t] } as {
      [k in FromTableName]: AllTablesInDB[FromTableName];
    };
    return new Select(this.db, {
      ...this.contents,
      tablesInScope: { ...this.contents.tablesInScope, ...newTableInScope },
      from: table.schema + "." + table.name,
    });
  }

  JOIN<
    FromTableName extends keyof AllTablesInDB,
    FromTable extends AllTablesInDB[FromTableName],
    NewTablesInScope extends TablesInScope & {
      [k in FromTableName]: FromTable;
    }
  >(
    t: FromTableName,
    makeExpr: (scope: {
      [t in keyof NewTablesInScope]: {
        [f in keyof NewTablesInScope[t]["fields"]]: Expr<
          GetTypeFromField<NewTablesInScope[t]["fields"][f]>
        >;
      };
    }) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScope, Returns> {
    const table = this.db.tables[t] as FromTable;
    const newTableInScope = { [t]: this.db.tables[t] } as {
      [k in FromTableName]: FromTable;
    };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScope,
    } as NewTablesInScope;
    const expr = makeExpr(makeScopeObjFromTablesInScope(newTablesInScope));
    return new Select(this.db, {
      ...this.contents,
      tablesInScope: newTablesInScope,
      joins: this.contents.joins.concat({ table, type: "INNER", on: expr }),
    });
  }

  JOIN_LEFT<
    JoiningTableName extends keyof AllTablesInDB,
    JoiningTable extends AllTablesInDB[JoiningTableName],
    NewTablesInScope extends TablesInScope & {
      [k in JoiningTableName]: JoiningTable;
    },
    NewTablesInScopeNullable extends TablesInScope & {
      [k in JoiningTableName]: MakeTableDefNullable<JoiningTable>;
    }
  >(
    t: JoiningTableName,
    makeExpr: (scope: {
      [t in keyof NewTablesInScope]: {
        [f in keyof NewTablesInScope[t]["fields"]]: Expr<
          GetTypeFromField<NewTablesInScope[t]["fields"][f]>
        >;
      };
    }) => Expr<boolean>
  ): Select<AllTablesInDB, NewTablesInScopeNullable, Returns> {
    const table = this.db.tables[t] as JoiningTable;
    const newTableInScope = { [t]: this.db.tables[t] } as unknown as {
      [k in JoiningTableName]: JoiningTable;
    };
    const newTableInScopeNullable = {
      [t]: nullifyTable(table), // TODO make expressions nullable (= Change encoder?)
    } as unknown as {
      [k in JoiningTableName]: MakeTableDefNullable<JoiningTable>;
    };
    const newTablesInScope = {
      ...this.contents.tablesInScope,
      ...newTableInScope,
    } as NewTablesInScope;
    const newTablesInScopeNullable = {
      ...this.contents.tablesInScope,
      ...newTableInScopeNullable,
    } as NewTablesInScopeNullable;
    const expr = makeExpr(makeScopeObjFromTablesInScope(newTablesInScope));
    return new Select(this.db, {
      ...this.contents,
      tablesInScope: newTablesInScopeNullable,
      joins: this.contents.joins.concat({
        table: nullifyTable(table),
        type: "LEFT",
        on: expr,
      }),
    });
  }

  WHERE(
    cb: (scope: {
      [t in keyof TablesInScope]: {
        [f in keyof TablesInScope[t]["fields"]]: Expr<
          GetTypeFromField<TablesInScope[t]["fields"][f]>
        >;
      };
    }) => Expr<boolean>
  ) {
    const scope = makeScopeObjFromTablesInScope(this.contents.tablesInScope);

    const expr = cb(scope);
    return new Select(this.db, {
      ...this.contents,
      where: this.contents.where.concat(expr),
    });
  }

  GROUP_BY(
    cb: (scope: {
      [t in keyof TablesInScope]: {
        [f in keyof TablesInScope[t]["fields"]]: Expr<
          GetTypeFromField<TablesInScope[t]["fields"][f]>
        >;
      };
    }) => Expr<any> | Expr<any>[]
  ) {
    const scope = makeScopeObjFromTablesInScope(this.contents.tablesInScope);

    const expr = cb(scope);

    return new Select(this.db, {
      ...this.contents,
      groupBy: Array.isArray(expr) ? expr : [expr],
    });
  }

  PROJECT<NewReturns extends { [columnname: string]: any }>(
    cb: (scope: {
      [t in keyof TablesInScope]: {
        [f in keyof TablesInScope[t]["fields"]]: Expr<
          GetTypeFromField<TablesInScope[t]["fields"][f]>
        >;
      };
    }) => { [k in keyof NewReturns]: Expr<NewReturns[k]> }
  ) {
    const scope = makeScopeObjFromTablesInScope(this.contents.tablesInScope);

    const exprs = cb(scope);

    return new Select(this.db, {
      ...this.contents,
      returns: exprs,
    });
  }

  toSql(): string {
    return [
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
          j.table.schema +
          "." +
          j.table.name +
          " ON " +
          j.on.asSql
      ),
      (this.contents.where.length > 0 ? "WHERE " : "") +
        this.contents.where.map((e) => e.asSql).join("\n  AND "),
      this.contents.groupBy === null
        ? ""
        : "GROUP BY " + this.contents.groupBy.map((e) => e.asSql).join(", "),
    ].join("\n");
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
        returnRow[name] = returnsExpr.encoder.deserialize(
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

function nullifyTable<
  Name extends string,
  Fields extends { [fieldname: string]: Field<any> }
>(
  t: TableDef<Name, { [K in keyof Fields]: Field<Fields[K]> }>
): TableDef<Name, { [K in keyof Fields]: Field<null | Fields[K]> }> {
  const nullifiedFields = {} as {
    [K in keyof Fields]: Field<null | Fields[K]>;
  };
  const keys = object_keys(t.fields);
  for (let key of keys) {
    const field = t.fields[key];
    nullifiedFields[key] = {
      name: field.name,
      type: field.type,
      nullable: true,
    };
  }
  return {
    ...t,
    fields: nullifiedFields,
  };
}

type MakeTableDefNullable<A> = A extends TableDef<infer Name, infer Fields>
  ? TableDef<Name, { [f in keyof Fields]: MakeFieldNullable<Fields[f]> }>
  : never;

type MakeFieldNullable<A> = A extends Field<infer T> ? Field<T | null> : never;

export type DB<
  AllTablesInDB extends {
    [tableName: string]: TableDef<string, { [fieldname: string]: Field<any> }>;
  }
> = {
  readonly tables: AllTablesInDB;
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
export type ScalarT = {
  kind: "scalar";
  name: string;
};
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
  AllTablesInDB extends { [tableName: string]: TableDef<any, any> }
>(db: DB<AllTablesInDB>) {
  return new Select(db, {
    tablesInScope: {},
    where: [],
    joins: [],
    returns: [],
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

function makeScopeObjFromTablesInScope<
  TablesInScope extends {
    [tableName: string]: TableDef<string, { [fieldname: string]: Field<any> }>;
  }
>(
  tablesInScope: TablesInScope
): {
  [t in keyof TablesInScope]: {
    [f in keyof TablesInScope[t]["fields"]]: Expr<
      GetTypeFromField<TablesInScope[t]["fields"][f]>
    >;
  };
} {
  const scope = {} as {
    [t in keyof TablesInScope]: {
      [f in keyof TablesInScope[t]["fields"]]: Expr<
        GetTypeFromField<TablesInScope[t]["fields"][f]>
      >;
    };
  };
  for (let tableName of object_keys(tablesInScope)) {
    const tableDef: TableDef<string, { [fieldname: string]: Field<any> }> =
      tablesInScope[tableName];
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
      tableOfExprs[columnName] = new Expr(
        encoder as any,
        `${tableDef.schema}.${tableDef.name}.${col.name}`
      );
    }
    scope[tableName] = tableOfExprs as any;
  }
  return scope;
}
