export function eq<A>(left: Expr<A>, right: Expr<A>): Expr<boolean> {
  return {
    tag: "binaryOp",
    left,
    right,
    operatorName: "=",
  };
}

export function not(val: Expr<boolean>): Expr<boolean> {
  return {
    tag: "unaryOp",
    val,
    operatorName: "NOT",
  };
}

export const op = {
  eq,
  not,
};

export function val<A>(a: A): Expr<A> {
  return { tag: "value", val: a };
}

export type Expr<A> =
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

  from<FromTableName extends keyof AllTablesInDB>(
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

  innerJoin<
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

  where(
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

  project<NewReturns extends { [columnname: string]: any }>(
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
}

function exprToSql(expr: Expr<any>): string {
  if (expr.tag === "column") {
    return expr.tableSchema + "." + expr.tableName + "." + expr.field.name;
  } else if (expr.tag === "unaryOp") {
    return expr.operatorName + ` (${exprToSql(expr.val)})`;
  } else if (expr.tag === "binaryOp") {
    return (
      exprToSql(expr.left) +
      " " +
      expr.operatorName +
      " " +
      exprToSql(expr.right)
    );
  } else if (expr.tag === "value") {
    return expr.val; // TODO we need escaping here probably?
  } else {
    return checkAllCasesHandled(expr);
  }
}

export type Field<T> = {
  name: string;
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

export function select<
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
      tableOfExprs[columnName] = {
        tag: "column",
        tableName: tableDef.name,
        tableSchema: tableDef.schema,
        field: col,
      };
    }
    scope[tableName] = tableOfExprs as any;
  }
  return scope;
}
