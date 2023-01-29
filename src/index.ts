import { includes, isBoolean, isEqual, isNumber, isString } from "lodash";
import { SimpleT } from "./cli/sql_parser";
import postgres from "postgres";
import { arrayParser } from "./arrayparser";
import * as joda from "@js-joda/core";

type Tag<T> = { _tag: T };
type RelationNameInQuery = string & Tag<"RelationNameInQuery">;
type RelationName = string & Tag<"RelationName">;
type FieldName = string & Tag<"FieldName">;

type BuildingUpSelectContents<
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

export class BuildingUpSelect<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> {
  protected outerScope: DB<OuterScope> | InMem<OuterScope>;
  protected contents: BuildingUpSelectContents<OuterScope, InScope>;

  public constructor(
    db: DB<OuterScope> | InMem<OuterScope>,
    contents: BuildingUpSelectContents<OuterScope, InScope>
  ) {
    this.outerScope = db;
    this.contents = contents || ({} as InScope);
  }
}

export class InitialSelect<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> extends BuildingUpSelect<OuterScope, InScope> {
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
  OuterScope extends Record<string, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>
> extends BuildingUpSelect<OuterScope, InScope> {
  public JOIN<FromRelName extends keyof OuterScope & string>(
    cb: (
      db: {
        [tableName in keyof OuterScope & string]: tableName;
      } & { SELECT: () => InitialSelect<OuterScope, {}> }
    ) => FromRelName
  ): Joining<OuterScope, InScope, FromRelName, OuterScope[FromRelName]> & {
    AS: <AsRelName extends string>(
      as: AsRelName
    ) => Joining<OuterScope, InScope, AsRelName, OuterScope[FromRelName]>;
  };
  public JOIN<
    FromRelName extends keyof OuterScope,
    JoiningRel extends Record<FieldName, any>
  >(
    cb: (
      db: {
        [tableName in keyof OuterScope & string]: tableName;
      } & { SELECT: () => InitialSelect<OuterScope, {}> }
    ) => Select<any, any, JoiningRel>
  ): {
    AS: <AsRelName extends string>(
      as: AsRelName
    ) => Joining<OuterScope, InScope, AsRelName, JoiningRel>;
  };
  public JOIN<
    FromRelName extends keyof OuterScope & string,
    JoiningRel extends Record<FieldName, any>
  >(
    cb: (
      db: {
        [tableName in keyof OuterScope & string]: tableName;
      } & { SELECT: () => InitialSelect<OuterScope, {}> }
    ) => FromRelName | Select<OuterScope, any, JoiningRel>
  ):
    | (Joining<OuterScope, InScope, FromRelName, JoiningRel> & {
        AS: <AsRelName extends string>(
          as: AsRelName
        ) => Joining<OuterScope, InScope, AsRelName, JoiningRel>;
      })
    | {
        AS: <AsRelName extends string>(
          as: AsRelName
        ) => Joining<OuterScope, InScope, AsRelName, JoiningRel>;
      } {
    const tableOrSelect = cb({
      SELECT: () => this.outerScope.SELECT(),
      // Making outer scope object
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
    });
    const self = this;
    if (isString(tableOrSelect)) {
      // User provided a relation as the target of the join
      const joining = new Joining(
        this.outerScope,
        self.contents,
        tableOrSelect,
        tableOrSelect as unknown as RelationName
      ) as Joining<OuterScope, InScope, FromRelName, JoiningRel> & {
        AS: <AsRelName extends string>(
          asStr: AsRelName
        ) => Joining<OuterScope, InScope, AsRelName, JoiningRel>;
      };
      joining.AS = function <AsRelName extends string>(
        asStr: AsRelName
      ): Joining<OuterScope, InScope, AsRelName, JoiningRel> {
        const res = new Joining(
          self.outerScope,
          self.contents,
          asStr,
          tableOrSelect as unknown as RelationName
        ) as Joining<OuterScope, InScope, AsRelName, JoiningRel>;
        return res;
      };
      return joining;
    } else {
      // User provided a select as the target of the join
      return {
        AS: function <AsRelName extends string>(
          asStr: AsRelName
        ): Joining<OuterScope, InScope, AsRelName, JoiningRel> {
          return new Joining(
            self.outerScope,
            self.contents,
            asStr,
            tableOrSelect
          );
        },
      };
    }
  }

  WHERE(
    cb: (scope: {
      [tableName in keyof InScope]: {
        [colName in keyof InScope[tableName]]: Expr<
          InScope[tableName][colName]
        >;
      };
    }) => Expr<boolean>
  ): BeforeProject<OuterScope, InScope> {
    const scope = {} as {
      [relName in keyof InScope]: {
        [colName in keyof InScope[relName]]: Expr<InScope[relName][colName]>;
      };
    };

    //Copy past from PROJECT!
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

    const expr = cb(scope);

    return new BeforeProject(this.outerScope, {
      ...this.contents,
      where: this.contents.where.concat(expr),
    });
  }

  PROJECT<Returns extends { [columnname: string]: any }>(
    cb: (scope: {
      [tableName in keyof InScope]: {
        [colName in keyof InScope[tableName]]: Expr<
          InScope[tableName][colName]
        >;
      };
    }) => {
      [colName in keyof Returns]: Expr<Returns[colName]>;
    }
  ): Select<OuterScope, InScope, Returns> {
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

export class Joining<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>,
  As extends string,
  JoiningRelation extends Record<FieldName, any>
> extends BuildingUpSelect<OuterScope, InScope> {
  private asStr: string;
  private joiningRelation: RelationName | Select<any, any, JoiningRelation>;

  constructor(
    db: DB<OuterScope> | InMem<OuterScope>,
    contents: BuildingUpSelectContents<OuterScope, InScope>,
    asStr: As,
    joiningRelation: RelationName | Select<any, any, JoiningRelation>
  ) {
    super(db, contents);
    this.asStr = asStr;
    this.joiningRelation = joiningRelation;
  }

  ON<NewScope extends InScope & { [k in As]: JoiningRelation }>(
    cb: (scope: {
      [tableName in keyof NewScope]: {
        [colName in keyof NewScope[tableName]]: Expr<
          NewScope[tableName][colName]
        >;
      };
    }) => Expr<boolean>
  ): BeforeProject<OuterScope, NewScope> {
    const scope = {} as {
      [relName in keyof NewScope]: {
        [colName in keyof NewScope[relName]]: Expr<NewScope[relName][colName]>;
      };
    };

    const newInScope = {
      ...this.contents.inScope,
      [this.asStr]: this.joiningRelation,
    };

    for (let k of object_keys(newInScope)) {
      const key = k as keyof NewScope;
      const val: RelationName | Select<OuterScope, any, any> = newInScope[key];
      if (isString(val)) {
        const exprs = makeExpressionsForRelationFromOuterScope(
          this.outerScope,
          val,
          k as string
        );
        // we need the forced cast here, because we have no typelevel proof that OuterScope[val] = InScope[key]
        scope[key] = exprs as unknown as {
          [colName in keyof NewScope[typeof key]]: Expr<
            NewScope[typeof key][colName]
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

    const expr = cb(scope);

    return new BeforeProject(this.outerScope, {
      ...this.contents,
      inScope: newInScope,
      joins: this.contents.joins.concat({
        rel: isString(this.joiningRelation)
          ? {
              tag: "relation",
              relation: this.joiningRelation,
              as: this.asStr !== this.joiningRelation ? this.asStr : undefined,
            }
          : {
              tag: "select",
              select: this.joiningRelation,
              as: this.asStr,
            },
        type: "INNER",
        on: expr,
      }),
    }) as BeforeProject<OuterScope, NewScope>;
  }
}

type GetReturnsFromSelect<T> = T extends Select<any, any, infer Returns>
  ? Returns
  : never;

export class Select<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  InScope extends Record<RelationNameInQuery, Record<FieldName, any>>,
  Returns extends Record<FieldName, any>
> extends BuildingUpSelect<OuterScope, InScope> {
  private returns: { [colName in keyof Returns]: Expr<Returns[colName]> };

  constructor(
    db: DB<OuterScope> | InMem<OuterScope>,
    contents: BuildingUpSelectContents<OuterScope, InScope>,
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
      .then((res) => deserializeResults(this.returns, res));
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

    let rows = from_[1].map((fro) => ({
      [from_[0]]: fro,
    }));

    for (let join of this.contents.joins) {
      if (join.type === "INNER") {
        let newRows = [];
        for (let row of rows) {
          for (let rel of join.rel.tag === "relation"
            ? data[join.rel.relation]
            : join.rel.select.runInMemory(data)) {
            const newRow = {
              ...row,
              [join.rel.tag === "relation"
                ? join.rel.as || join.rel.relation
                : join.rel.as]: rel,
            };
            const pred = join.on.inMem(newRow);
            if (pred) {
              newRows.push(newRow);
            }
          }
        }
        rows = newRows;
      } else {
        throw new Error("Join type not implemented yet");
      }
    }

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

function deserializeResults<Returns extends { [columnname: string]: any }>(
  returnExprs: { [colName in keyof Returns]: Expr<Returns[colName]> },
  rawRows: (Buffer | null)[][]
): Returns[] {
  const names = object_keys(returnExprs);
  return rawRows.map(function (cols) {
    const returnRow: Returns = {} as Returns;
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const returnExpr = returnExprs[name];
      const col = cols[i];
      returnRow[name as keyof Returns] = returnExpr.encoder.deserialize(
        col?.toString("utf8") || null
      );
    }
    return returnRow;
  });
}

function noop<T>(t: T): T {
  return t;
}
const noopEncoder = {
  deserialize: noop,
  serialize: noop,
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

export const encoders: {
  boolean: Encoder<boolean>;
  number: Encoder<number>;
  string: Encoder<string>;
  instant: Encoder<joda.Instant>;
  time: Encoder<joda.LocalTime>;
  timestampWithoutTimeZone: Encoder<joda.LocalDateTime>;
  date: Encoder<joda.LocalDate>;
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
    serialize: (s: string) => "'" + s + "'",
  },
  instant: {
    deserialize: function (b: any) {
      return joda.Instant.parse(b);
    },
    serialize: (s: joda.Instant) => s.toString(),
  },
  time: {
    deserialize: function (b: any) {
      return joda.LocalTime.parse(b);
    },
    serialize: (s: joda.LocalTime) => s.toString(),
  },
  timestampWithoutTimeZone: {
    deserialize: function (b: any) {
      return joda.LocalDateTime.parse(b);
    },
    serialize: (s: joda.LocalDateTime) => s.toString(),
  },
  date: {
    deserialize: function (b: any) {
      return joda.LocalDate.parse(b);
    },
    serialize: (s: joda.LocalDate) => s.toString(),
  },
} as const;

function arrayEncoder<T>(innerEncoder: Encoder<T>): Encoder<Array<T>> {
  return {
    serialize: function (n: any[]) {
      return `'{` + n.map((m) => innerEncoder.serialize(m)).join(",") + `}'`;
    },
    deserialize: function (b: any) {
      return arrayParser(b, innerEncoder.deserialize);
    },
  };
}

function toEncoder(f: FieldDef<any>["type"]): Encoder<any> {
  if (f.kind === "nullable") {
    const innerEncoder = toEncoder(f.typevar);
    return {
      serialize: (n) => (n === null ? "NULL" : innerEncoder.serialize(n)),
      deserialize: (n) => (n === null ? null : innerEncoder.deserialize(n)),
    };
  } else if (f.kind === "array") {
    return arrayEncoder(toEncoder(f.typevar));
  } else if (
    [
      "smallint",
      "integer",
      "bigint",
      "numeric",
      "double",
      "float2",
      "float4",
      "float8",
      "real",
    ].includes(f.name.name)
  ) {
    return encoders.number;
  } else if (f.name.name === "boolean") {
    return encoders.boolean;
  } else if (
    f.name.name === "time" ||
    f.name.name === "time without time zone"
  ) {
    return encoders.time;
  } else if (
    f.name.name === "timestamp without time zone" ||
    f.name.name === "timestamp"
  ) {
    return encoders.timestampWithoutTimeZone;
  } else if (f.name.name === "timestamp with time zone") {
    return encoders.instant;
  } else if (f.name.name === "date") {
    return encoders.date;
  } else {
    return noopEncoder;
  }
}

export class InitialInsert<
  OuterScope extends Record<RelationName, Record<FieldName, any>>
> {
  private db: DB<OuterScope>;

  public constructor(db: DB<OuterScope>) {
    this.db = db;
  }

  public INTO<IntoRelName extends keyof OuterScope & string>(
    cb: (db: {
      [tableName in keyof OuterScope & string]: tableName;
    }) => IntoRelName
  ): InsertInto<OuterScope, IntoRelName> {
    const relname = cb({
      ...(() => {
        const relNames = {} as {
          [tableName in keyof OuterScope & string]: tableName;
        };
        for (let k of object_keys(this.db.tables)) {
          const asRelationName = k as RelationName;
          relNames[k] = asRelationName;
        }
        return relNames;
      })(),
    });

    return new InsertInto(this.db, relname);
  }
}

export class InsertInto<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  IntoRelName extends keyof OuterScope & string
> {
  private db: DB<OuterScope>;
  private relname: IntoRelName;

  public constructor(db: DB<OuterScope>, relname: IntoRelName) {
    this.db = db;
    this.relname = relname;
  }

  public VALUES(
    cb: (scope: { DEFAULT: Expr<any> }) => {
      [colName in keyof OuterScope[IntoRelName]]: Expr<
        OuterScope[IntoRelName][colName]
      >;
    }
  ): Insert<OuterScope, IntoRelName> {
    const values = cb({
      DEFAULT: {
        encoder: noopEncoder, // irrelevant?
        asSql: "DEFAULT",
        inMem: () => {
          throw new Error("Not implemented yet :P");
        },
      },
    });
    return new Insert(this.db, this.relname, values);
  }
}

export class InsertWithReturning<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  IntoRelName extends keyof OuterScope & string,
  Returns extends { [columnname: string]: any } | null
> {
  protected db: DB<OuterScope>;
  protected relname: IntoRelName;
  protected values: {
    [colName in keyof OuterScope[IntoRelName]]: Expr<
      OuterScope[IntoRelName][colName]
    >;
  };
  protected returning:
    | { [colName in keyof Returns]: Expr<Returns[colName]> }
    | null;

  public constructor(
    db: DB<OuterScope>,
    relname: IntoRelName,
    values: {
      [colName in keyof OuterScope[IntoRelName]]: Expr<
        OuterScope[IntoRelName][colName]
      >;
    },
    returning: { [colName in keyof Returns]: Expr<Returns[colName]> } | null
  ) {
    this.db = db;
    this.relname = relname;
    this.values = values;
    this.returning = returning;
  }

  toSql(): string {
    const self = this;
    const returning = this.returning;

    return [
      "INSERT",
      "INTO " + (this.relname as string),
      "(" + object_keys(this.values as any).join(", ") + ")",
      "VALUES ",
      "(" +
        object_keys(self.values)
          .map((k) => self.values[k].asSql)
          .join(", ") +
        ")",
      returning === null
        ? ""
        : "RETURNING " +
          object_keys(returning)
            .map((key) => returning[key].asSql + " AS " + key.toString())
            .join(", "),
      ,
    ]
      .filter((s) => s !== "")
      .join("\n");
  }

  async run(
    pg: postgres.Sql<any>
  ): Promise<Returns extends null ? null : Returns[]> {
    const sqlText = this.toSql();
    console.log("Running insert: ");
    console.log(sqlText);
    return pg
      .unsafe(sqlText, undefined /* params */, { prepare: true })
      .raw()
      .then(
        (res) =>
          (this.returning === null
            ? null
            : deserializeResults(this.returning, res)) as Returns extends null
            ? null
            : Returns[]
      );
  }
}

export class Insert<
  OuterScope extends Record<RelationName, Record<FieldName, any>>,
  IntoRelName extends keyof OuterScope & string
> extends InsertWithReturning<OuterScope, IntoRelName, null> {
  public constructor(
    db: DB<OuterScope>,
    relname: IntoRelName,
    values: {
      [colName in keyof OuterScope[IntoRelName]]: Expr<
        OuterScope[IntoRelName][colName]
      >;
    }
  ) {
    super(db, relname, values, null);
  }

  public RETURNING<Returns extends { [columnname: string]: any }>(
    cb: (table: {
      [field in keyof OuterScope[IntoRelName]]: Expr<
        OuterScope[IntoRelName][field]
      >;
    }) => {
      [colName in keyof Returns]: Expr<Returns[colName]>;
    }
  ): InsertWithReturning<OuterScope, IntoRelName, Returns> {
    const tableDef = this.db.tables[this.relname];
    const scope = {} as {
      [field in keyof OuterScope[IntoRelName]]: Expr<
        OuterScope[IntoRelName][field]
      >;
    };

    for (let key of object_keys(tableDef.fields)) {
      const fieldDef: FieldDef<any> = tableDef.fields[key];
      scope[key] = {
        encoder:
          // Should we take "nullable" into account here?
          toEncoder(fieldDef.type),
        asSql: fieldDef.name,
        inMem: noop, // N/A
      };
    }

    const returning = cb(scope);
    return new InsertWithReturning(
      this.db,
      this.relname,
      this.values,
      returning
    );
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

  public INSERT() {
    return new InitialInsert<AllTablesInDB>(this);
  }
}

export class InMem<
  AllTablesInDB extends { [tableName: string]: { [colName: string]: any } }
> {
  public readonly data: { [k in keyof AllTablesInDB]: AllTablesInDB[k][] };

  constructor(d: { [k in keyof AllTablesInDB]: AllTablesInDB[k][] }) {
    this.data = d;
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
  serialize: (A: A) => string;
  deserialize: (b: any) => A;
};

export type RecordT = {
  kind: "record";
  fields: FieldDef<any>[];
};

export type FieldDef<T> = {
  name: string;
  type: SimpleT;
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

export function EQ<A>(left: Expr<A>, right: Expr<A>): Expr<boolean>;
export function EQ<A>(left: Expr<A>, right: Expr<A | null>): Expr<boolean>;
export function EQ<A>(left: Expr<A | null>, right: Expr<A>): Expr<boolean>;
export function EQ<A>(
  left: Expr<A | null>,
  right: Expr<A | null>
): Expr<boolean> {
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

export function JSON_BUILD_OBJECT<Obj extends { [key: string]: any }>(o: {
  [K in keyof Obj]: Expr<Obj[K]>;
}): Expr<Obj> {
  const keys: (keyof Obj)[] = object_keys(o);

  const keysAndValues = keys
    .map((key) => `'${String(key)}', ${o[key].asSql}`)
    .join(", ");

  return {
    encoder: {
      deserialize: function (b: string) {
        console.log(b);
        const js = JSON.parse(b);
        for (let key of keys) {
          js[key] = o[key].encoder.deserialize(js[key]);
        }
        return js;
      },
      serialize: function (b: Obj): string {
        return JSON.stringify(b, function replacer(key, val) {
          const expr = o[key];
          if (expr) {
            expr.encoder.serialize(val);
          } else {
            return val;
          }
        });
      },
    },
    asSql: `JSON_BUILD_OBJECT(${keysAndValues})`,
    inMem: (scope: any) => {
      const obj = {} as Obj;
      for (let key of keys) {
        obj[key] = o[key].inMem(scope);
      }
      return obj;
    },
  };
}

export function ARRAY_AGG<T>(ex: Expr<T>): Expr<T[]> {
  return {
    encoder: arrayEncoder(ex.encoder),
    asSql: `ARRAY_AGG(${ex.asSql})`,
    inMem: () => {
      throw new Error("Not implemented yet");
    },
  };
}

export function val<T>(
  a: T
): T extends boolean
  ? Expr<boolean>
  : T extends number
  ? Expr<number>
  : T extends string
  ? Expr<string>
  : T extends joda.LocalDate
  ? Expr<joda.LocalDate>
  : T extends joda.LocalTime
  ? Expr<joda.LocalTime>
  : never {
  // TODO need serialization and maybe also escaping
  if (isBoolean(a)) {
    const encoder = encoders.boolean;
    return {
      encoder,
      asSql: encoder.serialize(a),
      inMem: () => a,
    } as ReturnType<typeof val>;
  } else if (isNumber(a)) {
    const encoder = encoders.number;
    return {
      encoder,
      asSql: encoder.serialize(a),
      inMem: () => a,
    } as ReturnType<typeof val>;
  } else if (isString(a)) {
    const encoder = encoders.string;
    return {
      encoder,
      asSql: encoder.serialize(a),
      inMem: () => a,
    } as ReturnType<typeof val>;
  } else if (a instanceof joda.LocalDate) {
    const encoder = encoders.date;
    return {
      encoder,
      asSql: encoder.serialize(a),
      inMem: () => a,
    } as ReturnType<typeof val>;
  } else if (a instanceof joda.LocalTime) {
    const encoder = encoders.time;
    return {
      encoder,
      asSql: encoder.serialize(a),
      inMem: () => a,
    } as ReturnType<typeof val>;
  } else {
    throw new Error("Not allowed");
  }
}
