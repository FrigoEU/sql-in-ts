import { isEqual, isString } from "lodash";
import { encoders } from "./query";
import postgres from "postgres";

type Tag<T> = { _tag: T };
type RelationNameInQuery = string & Tag<"RelationNameInQuery">;
type RelationName = string & Tag<"RelationName">;
type FieldName = string & Tag<"FieldName">;

type BuildingUpQueryContents<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> = {
  outerScope: DB<OuterScope> | InMem<OuterScope>;
  inScope: {
    [key in keyof InScope]: RelationName | Select<OuterScope, any, any>;
  };
  from?:
    | { tag: "relation"; relation: RelationName; as?: string }
    | { tag: "select"; select: Select<OuterScope, any, any>; as: string };
  where: Expr<boolean>[];
  joins: {
    rel:
      | { tag: "relation"; relation: RelationName; as?: string }
      | {
          tag: "select";
          select: Select<OuterScope, any, any>;
          as: string;
        };
    type: "INNER" | "LEFT" | "RIGHT";
    on: Expr<boolean>;
  }[];
  groupBy: null | Expr<any>[];
};

export class BuildingUpQuery<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> {
  protected outerScope: DB<OuterScope> | InMem<OuterScope>;
  protected contents: BuildingUpQueryContents<OuterScope, InScope>;

  public constructor(
    db: DB<OuterScope> | InMem<OuterScope>,
    contents: BuildingUpQueryContents<OuterScope, InScope>
  ) {
    this.outerScope = db;
    this.contents = contents || ({} as InScope);
  }
}

export class InitialSelect<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> extends BuildingUpQuery<OuterScope, InScope> {
  public FROM<FromRelName extends keyof OuterScope>(
    cb: (
      db: {
        [tableName in keyof OuterScope & string]: tableName;
      } & { SELECT: () => InitialSelect<OuterScope, {}> }
    ) => FromRelName
  ): BeforeProject<
    OuterScope,
    InScope & { [k in FromRelName]: OuterScope[FromRelName] }
  > & {
    AS: <AsRelName extends string>(
      as: AsRelName
    ) => BeforeProject<
      OuterScope,
      InScope & { [k in AsRelName]: OuterScope[FromRelName] }
    >;
  };
  public FROM<
    FromRelName extends keyof OuterScope,
    FromRel extends Record<FieldName, any>,
    NewInScope extends InScope & { [k in FromRelName]: FromRel }
  >(
    cb: (
      db: {
        [tableName in keyof OuterScope & string]: tableName;
      } & { SELECT: () => InitialSelect<OuterScope, {}> }
    ) => Select<any, any, FromRel>
  ): {
    AS: <AsRelName extends string>(
      as: AsRelName
    ) => BeforeProject<OuterScope, InScope & { [k in AsRelName]: FromRel }>;
  };
  public FROM<
    FromRelName extends keyof OuterScope,
    FromRel extends Record<FieldName, any>,
    NewInScope extends InScope & { [k in FromRelName]: FromRel }
  >(
    cb: (
      db: {
        [tableName in keyof OuterScope & string]: tableName;
      } & { SELECT: () => InitialSelect<OuterScope, {}> }
    ) => FromRelName | Select<OuterScope, any, FromRel>
  ):
    | (BeforeProject<OuterScope, NewInScope> & {
        AS: <AsRelName extends string>(
          as: AsRelName
        ) => BeforeProject<OuterScope, InScope & { [k in AsRelName]: FromRel }>;
      })
    | {
        AS: <AsRelName extends string>(
          as: AsRelName
        ) => BeforeProject<OuterScope, InScope & { [k in AsRelName]: FromRel }>;
      } {
    const tableOrSelect = cb({
      ...(() => {
        const relNames = {} as {
          [tableName in keyof OuterScope & string]: tableName;
        };
        for (let k of object_keys(
          isDb(this.outerScope) ? this.outerScope.tables : this.outerScope.data
        )) {
          const asRelationName = k as RelationName;
          relNames[k] = asRelationName;
        }
        return relNames;
      })(),
      SELECT: () => this.outerScope.SELECT(),
    });
    const self = this;
    if (isString(tableOrSelect)) {
      const relname = tableOrSelect as string as RelationNameInQuery;
      const newInScope = {
        ...self.contents.inScope,
        ...{ [relname]: tableOrSelect },
      };
      const sel = new BeforeProject(this.outerScope, {
        ...self.contents,
        inScope: newInScope,
        from: { tag: "relation", relation: tableOrSelect as RelationName },
      }) as BeforeProject<OuterScope, NewInScope> & {
        AS: <AsRelName extends string>(
          asStr: AsRelName
        ) => BeforeProject<OuterScope, InScope & { [k in AsRelName]: FromRel }>;
      };
      sel.AS = function <AsRelName extends string>(
        asStr: AsRelName
      ): BeforeProject<OuterScope, InScope & { [k in AsRelName]: FromRel }> {
        const res = new BeforeProject(self.outerScope, {
          ...self.contents,
          from: {
            tag: "relation",
            relation: tableOrSelect as RelationName,
            as: asStr,
          },
          inScope: {
            ...self.contents.inScope,
            ...{ [asStr]: tableOrSelect },
          },
        }) as BeforeProject<
          OuterScope,
          InScope & { [k in AsRelName]: FromRel }
        >;
        return res;
      };
      return sel;
    } else {
      return {
        AS: function <AsRelName extends string>(
          asStr: AsRelName
        ): BeforeProject<OuterScope, InScope & { [k in AsRelName]: FromRel }> {
          return new BeforeProject(self.outerScope, {
            ...self.contents,
            inScope: {
              ...self.contents.inScope,
              ...{ [asStr]: tableOrSelect },
            },
          }) as BeforeProject<
            OuterScope,
            InScope & { [k in AsRelName]: FromRel }
          >;
        },
      };
    }
  }
}

export class BeforeProject<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> extends BuildingUpQuery<OuterScope, InScope> {
  JOIN() {
    // TODO
  }

  PROJECT<NewReturns extends { [columnname: string]: any }>(
    cb: (scope: {
      [tableName in keyof InScope]: {
        [colName in keyof InScope[tableName]]: Expr<
          InScope[tableName][colName]
        >;
      };
    }) => {
      [colName in keyof NewReturns]: Expr<NewReturns[colName]>;
    }
  ): Select<OuterScope, InScope, NewReturns> {
    const scope = {} as {
      [relName in keyof InScope]: {
        [colName in keyof InScope[relName]]: Expr<InScope[relName][colName]>;
      };
    };

    for (let k of object_keys(this.contents.inScope)) {
      const key: keyof InScope = k;
      const val: RelationName | Select<OuterScope, any, any> =
        this.contents.inScope[key];
      if (isString(val)) {
        const exprs = makeExpressionsForRelationFromOuterScope(
          this.outerScope,
          val,
          k as string
        );
        // we need the forced cast here, because we have no typelevel proof that OuterScope[val] = InScope[key]
        scope[key] = exprs as unknown as {
          [colName in keyof InScope[typeof key]]: Expr<
            InScope[typeof key][colName]
          >;
        };
      } else {
        type SelectReturns = GetReturnsFromSelect<typeof val>;
        const exprs = {} as {
          [colName in keyof SelectReturns]: Expr<SelectReturns[colName]>;
        };
        const returns = val.getReturns();
        const outerKey = key;
        let k: keyof typeof returns;
        for (k of object_keys(returns)) {
          if (!isString(k) || !isString(outerKey)) {
            continue;
          }
          const val = returns[k];
          exprs[k] = {
            ...val,
            asSql: `${outerKey}.${k}`,
          };
          scope[key] = exprs as any; // TS is completely lost here
        }
      }
    }

    const exprs = cb(scope);

    return new Select(this.outerScope, this.contents, exprs);
  }
}

type GetReturnsFromSelect<T> = T extends Select<any, any, infer Returns>
  ? Returns
  : never;

export class Select<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>,
  Returns extends Record<FieldName, any>
> extends BuildingUpQuery<OuterScope, InScope> {
  private returns: { [colName in keyof Returns]: Expr<Returns[colName]> };

  constructor(
    db: DB<OuterScope> | InMem<OuterScope>,
    contents: BuildingUpQueryContents<OuterScope, InScope>,
    returns: { [colName in keyof Returns]: Expr<Returns[colName]> }
  ) {
    super(db, contents);
    this.returns = returns;
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
    const names = object_keys(this.returns);
    const self = this;
    return rawRows.map(function (cols) {
      const returnRow: Returns = {} as Returns;
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const returnsExpr = self.returns[name];
        const col = cols[i];
        returnRow[name as keyof Returns] = returnsExpr.encoder.deserialize(
          col?.toString("utf8") || null
        );
      }
      return returnRow;
    });
  }

  getReturns(): { [colName in keyof Returns]: Expr<Returns[colName]> } {
    return this.returns;
  }

  toSql(): string {
    return [
      "(",
      "SELECT " +
        object_keys(this.returns)
          .map((key) => this.returns[key].asSql + " AS " + key.toString())
          .join(", "),
      this.contents.from
        ? "FROM " + relationOrSubselectToSql(this.contents.from)
        : "",
      ...this.contents.joins.map(
        (j) =>
          j.type +
          " JOIN " +
          relationOrSubselectToSql(j.rel) +
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

    function relationOrSubselectToSql(
      f:
        | { tag: "relation"; relation: RelationName; as?: string }
        | { tag: "select"; select: Select<OuterScope, any, any>; as: string }
    ) {
      if (f.tag === "relation") {
        return f.relation + (f.as ? " AS " + f.as : "");
      } else if (f.tag === "select") {
        return f.select.toSql() + " AS " + f.as;
      } else if (f) {
        return checkAllCasesHandled(f);
      }
    }
  }

  public runInMemory(data: {
    [k in keyof OuterScope]: OuterScope[k][];
  }): Returns[] {
    const f = this.contents.from;
    if (f === undefined) {
      throw new Error("No from clause");
    }
    const from_ = (function () {
      if (f.tag === "relation") {
        return [
          (f.as || f.relation) as keyof InScope,
          data[f.relation],
        ] as const;
      } else {
        return [f.as as keyof InScope, f.select.runInMemory(data)] as const;
      }
    })();

    const rows = from_[1].map((fro) => ({
      [from_[0]]: fro,
    }));

    // TODO joins, group, order

    const res = [] as Returns[];

    for (let fromRow of rows) {
      const resRow = {} as Returns;
      for (let k of object_keys(this.returns)) {
        const val = this.returns[k];
        resRow[k] = val.inMem(fromRow);
      }
      res.push(resRow);
    }

    return res;
  }
}

function noop<T>(t: T): T {
  return t;
}
const noopEncoder = {
  deserialize: noop,
};

function makeExpressionsForRelationFromOuterScope<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  RelName extends keyof OuterScope & string
>(
  f: DB<OuterScope> | InMem<OuterScope>,
  n: RelName,
  asStr: string
): {
  [fieldname in keyof OuterScope[RelName]]: Expr<
    OuterScope[RelName][fieldname]
  >;
} {
  if (isDb(f)) {
    const res = {} as {
      [fieldname in keyof OuterScope[RelName]]: Expr<
        OuterScope[RelName][fieldname]
      >;
    };

    const tableDef = f.tables[n];
    for (let key of object_keys(tableDef.fields)) {
      const fieldDef: FieldDef<any> = tableDef.fields[key];
      res[key] = {
        encoder:
          // Should we take "nullable" into account here?
          toEncoder(fieldDef.type),
        asSql: asStr + "." + fieldDef.name,
        inMem: (scope) => {
          return scope[asStr][fieldDef.name];
        },
      };
    }

    return res;
  } else {
    const dummy = {};
    const res = new Proxy(dummy, {
      get: function (_, prop): Expr<any> {
        return {
          encoder: noopEncoder,
          asSql: "", // sql is not imporant in the InMemory case
          inMem: (s) => s[n][prop],
        };
      },
    }) as {
      [fieldname in keyof OuterScope[RelName]]: Expr<
        OuterScope[RelName][fieldname]
      >;
    };

    return res;
  }
}

function toEncoder(f: FieldDef<any>["type"]): Encoder<any> {
  if (f === "string") {
    return encoders.string;
  } else if (f === "int") {
    return encoders.number;
  } else if (f === "boolean") {
    return encoders.boolean;
  } else {
    throw new Error(`Unknown field type ${f}`);
  }
}

export class DB<
  AllTablesInDB extends { [tableName: string]: { [colName: string]: any } }
> {
  public readonly tables: {
    [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
      tableName,
      AllTablesInDB[tableName]
    >;
  };
  // public readonly views: ReadonlyArray<{
  //   readonly name: string;
  //   readonly schema: string;
  //   readonly rel: RecordT;
  // }>;

  constructor(inp: {
    tables: {
      [tableName in keyof AllTablesInDB & string]: MakeTableDefFromRecord<
        tableName,
        AllTablesInDB[tableName]
      >;
    };
    // views: ReadonlyArray<{
    //   readonly name: string;
    //   readonly schema: string;
    //   readonly rel: RecordT;
    // }>;
  }) {
    this.tables = inp.tables;
    // this.views = inp.views;
  }

  public SELECT() {
    return new InitialSelect<AllTablesInDB, {}>(this, {
      outerScope: this,
      inScope: {},
      where: [],
      joins: [],
      groupBy: null,
    });
  }
}

export class InMem<
  AllTablesInDB extends { [tableName: string]: { [colName: string]: any } }
> {
  public readonly data: AllTablesInDB;

  constructor(inp: AllTablesInDB) {
    this.data = inp;
  }

  public SELECT() {
    return new InitialSelect<AllTablesInDB, {}>(this, {
      outerScope: this,
      inScope: {},
      where: [],
      joins: [],
      groupBy: null,
    });
  }
}

type Expr<A> = {
  readonly encoder: Encoder<A>;
  readonly asSql: string;
  readonly inMem: (scope: any) => A;
};

type Encoder<A> = {
  deserialize: (b: any) => A;
};

export type RecordT = {
  kind: "record";
  fields: FieldDef<any>[];
};

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

function isDb<T extends { [tableName: string]: { [colName: string]: any } }>(
  d: DB<T> | InMem<T>
): d is DB<T> {
  if (d instanceof DB) {
    return true;
  } else {
    return false;
  }
}

export function object_keys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export function EQ<A>(left: Expr<A>, right: Expr<A>): Expr<boolean> {
  return {
    encoder: encoders.boolean,
    asSql: `${left.asSql} = ${right.asSql}`,
    inMem: (scope) => {
      return isEqual(left.inMem(scope), right.inMem(scope));
    },
  };
}

function checkAllCasesHandled(a: never): never {
  throw new Error(
    `checkAllCasesHandled assertion failed: ${JSON.stringify(a)}`
  );
}
