import {
  AlterTableStatement,
  ColumnConstraint,
  CreateEnumType,
  CreateMaterializedViewStatement,
  CreateTableStatement,
  CreateViewStatement,
  DataTypeDef,
  Name,
  NodeLocation,
  PGNode,
  QName,
  Statement,
} from "trader-pgsql-ast-parser";

export type DbDefinition = {
  tables: {
    name: QName;
    fields: Field[];
  }[];
  enums: {
    name: QName;
    values: string[];
  }[];
};

export function parseSetupScripts(ast: Statement[]): DbDefinition {
  return ast.reduce(
    (acc: DbDefinition, a): DbDefinition => {
      if (a.type === "create table" && !a.temporary) {
        return doCreateTable(acc, a);
      } else if (
        a.type === "create view" ||
        a.type === "create materialized view"
      ) {
        return doCreateView(acc, a);
      } else if (a.type === "create enum") {
        return doCreateTypeAsEnum(acc, a);
      } else if (a.type === "alter table") {
        return doAlterTable(acc, a);
      } else {
        return acc;
      }
    },
    { tables: [], enums: [] }
  );
}

function doCreateTable(g: DbDefinition, s: CreateTableStatement): DbDefinition {
  if ((s.inherits || []).length !== 0) {
    // Reusing the columns is not hard (see LIKE TABLE)
    // but subsequent alters to the parent table(s) also alter the children
    // so that's a bit more work. Not a huge amount though, just didnt do it yet
    return notImplementedYet(s);
  }
  const fields: Field[] = s.columns.reduce(function (acc: Field[], c) {
    if (c.kind === "like table") {
      const targetTable = c.like;
      const found = g.tables.find((t) => eqQNames(t.name, targetTable));
      if (!found) {
        throw new UnknownIdentifier(c.like, targetTable);
      }
      return acc.concat(found.fields);
    } else {
      return acc.concat({
        name: c.name,
        type: mkType(c.dataType, c.constraints || []),
      });
    }
  }, []);

  const primaryKey = (function () {
    const primaryKeyConstraint = mapPartial(s.constraints || [], (c) =>
      c.type === "primary key" ? c : null
    );
    if (primaryKeyConstraint.length > 0) {
      return primaryKeyConstraint[0].columns;
    }
    const columnWithPrimaryKey = mapPartial(s.columns, (c) =>
      c.kind === "column" &&
      (c.constraints || []).some(
        (constr: ColumnConstraint) => constr.type === "primary key"
      )
        ? c
        : null
    );
    if (columnWithPrimaryKey.length > 0) {
      return columnWithPrimaryKey.map((c) => c.name);
    } else {
      return [];
    }
  })();

  const defaults = mapPartial(s.columns, (col) => {
    if (col.kind !== "column") {
      return null;
    }
    const t = mkType(col.dataType, col.constraints || []);
    if (t.kind === "scalar" && t.name.name.toLowerCase() === "serial") {
      return col;
    }
    if ((col.constraints || []).some((constr) => constr.type === "default")) {
      return col;
    } else {
      return null;
    }
  });

  return {
    ...g,
    tables: g.tables.concat({
      name: s.name,
      // primaryKey,
      // defaults: defaults.map((c) => c.name),
      fields,
    }),
  };
}
function doCreateView(
  _g: DbDefinition,
  s: CreateViewStatement | CreateMaterializedViewStatement
): DbDefinition {
  return notImplementedYet(s);
}

function doAlterTable(_g: DbDefinition, s: AlterTableStatement): DbDefinition {
  return notImplementedYet(s);
}

function doCreateTypeAsEnum(g: DbDefinition, s: CreateEnumType): DbDefinition {
  return {
    ...g,
    enums: g.enums.concat({
      name: s.name,
      values: s.values.map((v) => v.value),
    }),
  };
}

function mapPartial<T, U>(
  a: Array<T> | ReadonlyArray<T>,
  f: (t: T, i: number) => U | null
): U[] {
  const newA: U[] = [];
  a.forEach(function (a, i) {
    const res = f(a, i);
    if (res === null) {
    } else {
      newA.push(res);
    }
  });
  return newA.reverse();
}

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
export type RecordT = {
  kind: "record";
  fields: Field[];
};
type Field = {
  name: Name;
  type: SimpleT;
};
export type ScalarT = {
  kind: "scalar";
  name: QName;
};
export type VoidT = {
  // represents nothing, so zero rows, like when doing an INSERT without RETURNING
  kind: "void";
};
export type SimpleT = JsonKnownT | ScalarT | NullableT<any> | ArrayT<any>;

export const BuiltinTypeConstructors = {
  Nullable: <T extends SimpleT>(t: T): NullableT<T> => ({
    kind: "nullable",
    typevar: t,
  }),
  Array: <T extends SimpleT>(t: T): ArrayT<T> => ({
    kind: "array",
    subtype: "array",
    typevar: t,
  }),
  List: <T extends SimpleT>(t: T): ArrayT<T> => ({
    kind: "array",
    subtype: "list",
    typevar: t,
  }),
} as const;

function mkType(t: DataTypeDef, cs: ColumnConstraint[]): SimpleT {
  if (t.kind === "array") {
    if (t.arrayOf.kind === "array") {
      throw new Error("Array or array not supported");
    } else {
      return BuiltinTypeConstructors.Array({
        kind: "scalar",
        name: { name: normalizeTypeName(t.arrayOf.name) },
      });
    }
  } else {
    const t_: ScalarT = {
      kind: "scalar",
      name: { name: normalizeTypeName(t.name) },
    };

    const notnullable = cs.some(
      (c) => c.type === "not null" || c.type === "primary key"
    );
    return notnullable ? t_ : nullify(t_);
  }
}

function nullify(s: SimpleT): SimpleT {
  if (s.kind === "nullable") {
    return s;
  } else {
    return BuiltinTypeConstructors.Nullable(s);
  }
}

export function normalizeTypeName(s: string): string {
  if (s === "int8" || s === "bigserial") {
    return "bigint";
  }
  if (s === "int" || s === "int4" || s === "serial") {
    return "integer";
  }
  if (s === "int2" || s === "smallserial") {
    return "smallint";
  }
  if (s === "decimal") {
    return "numeric";
  }
  if (s === "bool") {
    return "boolean";
  }
  if (s === "float") {
    return "double";
  }
  if (s === "double precision") {
    return "double";
  }
  return s;
}

function eqQNames<U extends QName, V extends QName>(u: U, v: V): boolean {
  return (
    u.name.toLowerCase() === v.name.toLowerCase() &&
    ((!u.schema && (v.schema === "dbo" || v.schema === "pg_catalog")) ||
      ((u.schema === "dbo" || u.schema === "pg_catalog") && !v.schema) ||
      (!u.schema && !v.schema) ||
      u.schema?.toLowerCase() === v.schema?.toLowerCase())
  );
}

export function notImplementedYet(node: PGNode | null): any {
  throw new NotImplementedYet(node);
}

class ErrorWithLocation extends Error {
  public l: NodeLocation | undefined;
  constructor(l: NodeLocation | undefined, m: string) {
    super(m);
    this.l = l;
  }
}
class UnknownIdentifier extends ErrorWithLocation {
  constructor(e: PGNode, m: QName) {
    super(e._location, `UnknownIdentifier ${showQName(m)}`);
  }
}
function showQName(n: QName): string {
  return n.schema ? n.schema + "." + n.name : n.name;
}

class NotImplementedYet extends ErrorWithLocation {
  constructor(node: PGNode | null) {
    const m = node
      ? `: \n
${JSON.stringify(node)} @ ${node._location}`
      : "";
    super(node?._location, `NotImplementedYet: ${m}`);
  }
}
