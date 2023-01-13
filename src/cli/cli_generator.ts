import * as fs from "fs/promises";
import { min, repeat } from "lodash";
import * as path from "path";
import {
  CreateFunctionStatement,
  NodeLocation,
  parse,
  QName,
  Statement,
} from "trader-pgsql-ast-parser";
import { checkAllCasesHandled } from "../query";
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
    const statements: Statement[] = parse(fileContents, {
      locationTracking: true,
    });
    allStatements.push({ fileName: sqlFile, statements });
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
      ["text", "name", "char", "character", "varchar", "nvarchar"].includes(
        t.name.name
      )
    ) {
      return "string";
    } else if (["bytea"].includes(t.name.name)) {
      return "Buffer";
    } else if (t.name.name === "date") {
      return "LocalDate";
    } else if (t.name.name === "time") {
      return "LocalTime";
    } else if (
      t.name.name === "timestamp without time zone" ||
      t.name.name === "timestamp"
    ) {
      return "LocalDateTime";
    } else {
      return t.name.name;
    }
  } else if (t.kind === "jsonknown") {
    return (
      "{\n" +
      t.record.fields
        .map((f) => `  ${f.name?.name}: ${showTypeAsTypescriptType(f.type)}`)
        .join(",\n") +
      "\n}"
    );
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
