import { demoDb } from "./demo";
import { op, select, val } from "./query";
import postgres from "postgres";

const db = postgres({
  database: "sqlints",
});

go();

async function go() {
  const q1 = select(demoDb)
    .from("users")
    .innerJoin("emails", (s) => op.eq(s.users.id, s.emails.user_id))
    .leftJoin("addresses", (s) => op.eq(s.users.id, s.addresses.user_id))
    .where((s) => op.not(op.eq(s.users.id, val(5))))
    .project((s) => ({
      user_id: s.users.id,
      email_id: s.emails.id,
      verified: s.emails.verified,
    }));

  const res = await q1.run(db);
  console.log();
  console.log("Query res:");
  console.log(res);

  process.exit(0);
}
