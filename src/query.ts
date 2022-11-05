import postgres from "postgres";

const encoders = {
  boolean: {
    deserialize: function (b: Buffer) {
      // can probably optim this
      return b.toString("utf8") === "t" ? true : false;
    },
  },
  int: {
    deserialize: function (b: Buffer) {
      // can maybe optim this
      return +b.toString("utf8");
    },
  },
};

type pgtype = keyof typeof encoders;

export function NOT(val: BooleanExpr): BooleanExpr {
  return new BooleanExpr({
    tag: "unaryOp",
    val,
    operatorName: "NOT",
  });
}

export const op = {
  NOT,
};

export function val<A>(a: A): Expr<A> {
  // TODO need serialization and maybe also escaping
  return new Expr(
    { deserialize: null as any /* not important*/ },
    {
      tag: "value",
      val: a,
    }
  );
}

type ExprSum<A> =
  | { tag: "value"; val: A }
  | {
      tag: "unaryOp";
      val: Expr<boolean>;
      operatorName: string;
    }
  | {
      tag: "binaryOp";
      left: Expr<any>;
      operatorName: string;
      right: Expr<any>;
    }
  | {
      tag: "column";
      tableName: string;
      tableSchema: string;
      field: Field<A>;
    };

// export type Expr<A> = ExprSum<A> & Encoder<A>;

class Expr<A> {
  public readonly exprSum: ExprSum<A>;
  public readonly encoder: Encoder<A>;
  constructor(encoder: Encoder<A>, exprSum: ExprSum<A>) {
    this.exprSum = exprSum;
    this.encoder = encoder;
  }

  public EQ(right: Expr<A>): BooleanExpr {
    return new BooleanExpr({
      tag: "binaryOp",
      left: this,
      right,
      operatorName: "=",
    });
  }

  public toSql(): string {
    return exprToSql(this);
  }
}

class BooleanExpr extends Expr<boolean> {
  constructor(exprSum: ExprSum<boolean>) {
    super(encoders.boolean, exprSum);
  }
  public AND(right: BooleanExpr): BooleanExpr {
    const self = this;
    return new BooleanExpr({
      left: self,
      right: right,
      tag: "binaryOp",
      operatorName: "AND",
    });
  }
  public OR(right: BooleanExpr): BooleanExpr {
    const self = this;
    return new BooleanExpr({
      left: self,
      right: right,
      tag: "binaryOp",
      operatorName: "OR",
    });
  }
}

export function AND(...preds: [BooleanExpr, BooleanExpr, ...BooleanExpr[]]) {
  return preds.slice(2).reduce(
    (acc, pred) => {
      return new BooleanExpr({
        left: acc,
        right: pred,
        tag: "binaryOp",
        operatorName: "AND",
      });
    },
    new BooleanExpr({
      left: preds[0],
      right: preds[1],
      tag: "binaryOp",
      operatorName: "AND",
    })
  );
}

type Encoder<A> = {
  deserialize: (b: Buffer) => A;
};

type GetTypeFromExpr<F> = F extends Expr<infer T> ? T : never;

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
    FromTableName extends keyof AllTablesInDB,
    FromTable extends AllTablesInDB[FromTableName],
    NewTablesInScope extends TablesInScope & {
      [k in FromTableName]: FromTable;
    },
    NewTablesInScopeNullable extends TablesInScope & {
      [k in FromTableName]: MakeTableDefNullable<FromTable>;
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
  ): Select<AllTablesInDB, NewTablesInScopeNullable, Returns> {
    const table = this.db.tables[t] as FromTable;
    const newTableInScope = { [t]: this.db.tables[t] } as unknown as {
      [k in FromTableName]: FromTable;
    };
    const newTableInScopeNullable = {
      [t]: this.db.tables[t], // TODO make expressions nullable (= Change encoder?)
    } as unknown as {
      [k in FromTableName]: MakeTableDefNullable<FromTable>;
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
      joins: this.contents.joins.concat({ table, type: "LEFT", on: expr }),
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
            (key) =>
              exprToSql(this.contents.returns[key]) + " AS " + key.toString()
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
          exprToSql(j.on)
      ),
      (this.contents.where.length > 0 ? "WHERE " : "") +
        this.contents.where.map(exprToSql).join("\n  AND "),
    ].join("\n");
  }

  run(pg: postgres.Sql<any>): Promise<Returns[]> {
    const sqlText = this.toSql();
    console.log("Running query: ");
    console.log(sqlText);
    return pg
      .unsafe(sqlText, undefined /* params */, { prepare: true })
      .raw()
      .then((res) => this.deserializeResults(res));
  }

  private deserializeResults(rawRows: Buffer[][]): Returns[] {
    debugger;
    const names = object_keys(this.contents.returns);
    const self = this;
    return rawRows.map(function (cols) {
      const returnRow: Returns = {} as Returns;
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const returnsExpr = self.contents.returns[name];
        returnRow[name] = returnsExpr.encoder.deserialize(cols[i]);
      }
      return returnRow;
    });
  }
}

function exprToSql(expr: Expr<any>): string {
  if (expr.exprSum.tag === "column") {
    return (
      expr.exprSum.tableSchema +
      "." +
      expr.exprSum.tableName +
      "." +
      expr.exprSum.field.name
    );
  } else if (expr.exprSum.tag === "unaryOp") {
    return expr.exprSum.operatorName + ` (${exprToSql(expr)})`;
  } else if (expr.exprSum.tag === "binaryOp") {
    return (
      exprToSql(expr.exprSum.left) +
      " " +
      expr.exprSum.operatorName +
      " " +
      exprToSql(expr.exprSum.right)
    );
  } else if (expr.exprSum.tag === "value") {
    return expr.exprSum.val; // TODO we need escaping here probably?
  } else {
    return checkAllCasesHandled(expr.exprSum);
  }
}

export type Field<T> = {
  name: string;
  type: pgtype;
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
      const encoder = encoders[col.type];
      tableOfExprs[columnName] = new Expr(encoder, {
        tag: "column",
        tableName: tableDef.name,
        tableSchema: tableDef.schema,
        field: col,
      });
    }
    scope[tableName] = tableOfExprs as any;
  }
  return scope;
}
