import * as fs from "fs/promises";
import * as path from "path";
import { parse, Statement } from "trader-pgsql-ast-parser";
import { parseSetupScripts, SimpleT } from "./sql_parser";

go();
async function go() {
  const outArgs = findInArgs({ argv: process.argv, flags: ["-o", "--out"] });
  const outArg = outArgs[0];
  if (!outArg) {
    throw new Error(
      "Please provide -o/--out parameter for the database description"
    );
  }

  const dirs = findInArgs({ argv: process.argv, flags: ["-d", "--dir"] });
  const files = findInArgs({ argv: process.argv, flags: ["-f", "--file"] });

  const allSqlFiles = (
    await Promise.all(
      dirs.map((dir) => findSqlFilesInDir(path.resolve(process.cwd(), dir)))
    )
  )
    .flat()
    .concat(files);

  if (allSqlFiles.length === 0) {
    throw new Error(
      "Please provide at least one SQL file with flags -f/--file or -d/--dir"
    );
  }

  const allStatements: { fileName: string; statements: Statement[] }[] = [];
  for (let sqlFile of allSqlFiles) {
    console.log(`Processing file ${sqlFile}`);
    const fileContents = await fs.readFile(sqlFile, "utf-8");
    const filteredFileContents = fileContents
      .replace(/CREATE\ AGGREGATE\ [^;]*;/g, "")
      .replace(/CREATE\ POLICY\ [^;]*;/g, "")
      .replace(/CREATE\ FUNCTION([^$]*)\$\$([^]*)\$\$;/g, "")
      .replace(/ALTER\ FUNCTION\ [^;]*;/g, "")
      .replace(/CREATE\ SEQUENCE\ [^;]*;/g, "")
      .replace(/ALTER\ SEQUENCE\ [^;]*;/g, "")
      .replace(/CREATE\ INDEX\ [^;]*;/g, "")
      .replace(/GRANT\ [^;]*;/g, "")
      .replace(/--.*\n/g, "")
      .split("\n")
      .filter(
        (s) =>
          !s.startsWith("ALTER TYPE") &&
          !s.startsWith("CREATE EXTENSION") &&
          !s.startsWith("COMMENT ON EXTENSION") &&
          !s.startsWith("ALTER FUNCTION") &&
          !s.startsWith("CREATE TRIGGER") &&
          !s.startsWith("ALTER AGGREGATE")
      )
      .map((s) =>
        s
          .replace("PARALLEL SAFE", "")
          .replace("$_$", "$$$$")
          .replace("NOT VALID", "")
          .replace(/ALTER\ TABLE\ \S*\ ENABLE\ ROW\ LEVEL\ SECURITY;/, "")
      );
    try {
      const statements: Statement[] = parse(filteredFileContents.join("\n"), {
        locationTracking: true,
      });
      allStatements.push({ fileName: sqlFile, statements });
    } catch (err) {
      if ((err as any).token && (err as any).token._location) {
        console.log(
          `On location:\n` +
            filteredFileContents
              .join("\n")
              .substring(
                (err as any).token._location.start - 80,
                (err as any).token._location.end + 80
              )
        );
        process.exit(1);
      } else {
        throw err;
      }
    }
  }

  console.log(`Processing ${allStatements.length} statements`);

  const parsedDbDef = parseSetupScripts(
    allStatements.flatMap((f) => f.statements)
  );

  const customTypeDefinitions: string = parsedDbDef.enums
    .map(
      (en) =>
        `type ${en.name.name} = ${en.values.map((v) => `"${v}"`).join(" | ")};`
    )
    .join("\n");

  const fieldDescrs: string[] = [];
  const typeDescrs: string[] = [];

  for (let table of parsedDbDef.tables) {
    const fields = table.fields
      .map((field) => {
        return `        ${field.name.name}: { name: "${
          field.name.name
        }", type: ${JSON.stringify(field.type)}},`;
      })
      .join("\n");
    const fieldDescr = `
    ${table.name.name}: {
      __meta: {
        name: "${table.name.name}",
        schema: "${table.name.schema || "public"}"
      },
      fields: {
${fields}
      },
    },`;
    fieldDescrs.push(fieldDescr);

    const fieldsForType = table.fields.map(
      (field) =>
        `  ${field.name.name}: ${showTypeAsTypescriptType(field.type)};`
    );
    typeDescrs.push(`
type ${table.name.name}Table = {
${fieldsForType.join("\n")}
}
`);
  }

  const fullDef = `
import * as joda from "@js-joda/core";
import {DB} from "sql-in-ts";

${customTypeDefinitions}

export const db = new DB<MyDb>({
  tables: {
${fieldDescrs.join("")}
  }
} as const);

export type MyDb = {
${parsedDbDef.tables
  .map((t) => "  " + t.name.name + ": " + t.name.name + "Table")
  .join(",\n")}
}

${typeDescrs.join("")}
`;
  await fs.writeFile(outArg, fullDef, "utf8");
  console.log(`Wrote ${outArg}`);

  process.exit(0);
}

function showTypeAsTypescriptType(t: SimpleT): string {
  if (t.kind === "array") {
    return "(" + showTypeAsTypescriptType(t.typevar) + ")" + "[]";
  } else if (t.kind === "nullable") {
    return showTypeAsTypescriptType(t.typevar) + " | null";
  } else if (t.kind === "scalar") {
    if (
      [
        "numeric",
        "bigint",
        "smallint",
        "integer",
        "real",
        "double",
        "float8",
        "float4",
        "float2",
      ].includes(t.name.name)
    ) {
      return "number";
    } else if (
      [
        "text",
        "name",
        "char",
        "character",
        "varchar",
        "nvarchar",
        "uuid",
      ].includes(t.name.name)
    ) {
      return "string";
    } else if (["tstzrange"].includes(t.name.name)) {
      return "unknown";
    } else if (["bytea"].includes(t.name.name)) {
      return "Buffer";
    } else if (t.name.name === "character varying") {
      return "string";
    } else if (t.name.name === "date") {
      return "joda.LocalDate";
    } else if (
      t.name.name === "time" ||
      t.name.name === "time without time zone"
    ) {
      return "joda.LocalTime";
    } else if (
      t.name.name === "timestamp without time zone" ||
      t.name.name === "timestamp"
    ) {
      return "joda.LocalDateTime";
    } else if (t.name.name === "json" || t.name.name === "jsonb") {
      return "any";
    } else if (t.name.name === "timestamp with time zone") {
      return "joda.Instant";
    } else {
      return t.name.name;
    }
  } else {
    return checkAllCasesHandled(t);
  }
}

function findInArgs(opts: { argv: string[]; flags: string[] }): string[] {
  let i = 0;
  let res = [];
  for (let arg of opts.argv) {
    if (opts.flags.includes(arg) && opts.argv[i + 1]) {
      res.push(opts.argv[i + 1]);
    }
    i = i + 1;
  }
  return res;
}

async function findSqlFilesInDir(dir: string): Promise<string[]> {
  const inThisDir = await fs.readdir(dir);
  const res: string[] = [];
  for (let p of inThisDir) {
    const fullP = path.join(dir, p);
    if (fullP.endsWith(".sql")) {
      res.push(fullP);
    } else {
      const stat = await fs.stat(fullP);
      if (stat.isDirectory()) {
        const inSubFolder = await findSqlFilesInDir(fullP);
        res.push(...inSubFolder);
      } else {
        // not a sql file, not a directory
      }
    }
  }
  return res;
}

export function checkAllCasesHandled(a: never): never {
  throw new Error(
    `checkAllCasesHandled assertion failed: ${JSON.stringify(a)}`
  );
}
