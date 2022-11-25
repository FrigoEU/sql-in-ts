import { Pool } from "pg";
import {
  Kysely,
  PostgresDialect,
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";

interface UsersTable {
  id: number;
}

interface EmailsTable {
  id: number;
  user_id: number;
  verified: boolean;
}

interface AddressesTable {
  id: number;
  user_id: number;
}

interface Database {
  users: UsersTable;
  emails: EmailsTable;
  addresses: AddressesTable;
}

// You'd create one of these when you start your app.
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "sqlints",
    }),
  }),
});

async function demo() {
  // const { id } = await db
  //   .insertInto("users")
  //   .values({ id: 2 })
  //   .returning("id")
  //   .executeTakeFirstOrThrow();

  // await db
  //   .insertInto("pet")
  //   .values({ name: "Catto", species: "cat", owner_id: id })
  //   .execute();

  const q = db
    .selectFrom("users")
    .leftJoin("emails", "users.id", "emails.user_id")
    // Weird API between on/onRef, where/whereRef, etc
    // Our "val()" API is much simpler
    .whereRef("users.id", "=", "emails.verified") // Doesn't catch this!
    // No JSON_BUILD_OBJECT and no rigorous serialization, so no nested join
    .select([
      "users.id",
      "emails.id as email_id",
      "emails.verified as email_verified",
    ]);

  console.log("Running: \n", q.compile().sql);

  const res = await q.execute();

  if (res) {
    res[0].id;
  }
}
demo();
