import postgres from "postgres";
import { demoDb } from "./demo";
import {
  AND,
  ARRAY_AGG,
  EQ,
  JSON_BUILD_OBJECT,
  NOT,
  PLUS,
  SELECT,
  val,
} from "./query";

const db = postgres({
  database: "sqlints",
});

go();

async function go() {
  const qa = SELECT(demoDb);
  const qb = qa.FROM("users");

  const q1 = SELECT(demoDb)
    .FROM("users")
    .JOIN("emails", (s) => EQ(s.users.id, s.emails.user_id))
    .JOIN_LEFT("addresses", (s) => EQ(s.users.id, s.addresses.user_id))
    .WHERE((s) => EQ(s.users.id, val(1)))
    .GROUP_BY((s) => s.users.id)
    .PROJECT((s) => ({
      user_id: s.users.id,
      emails: ARRAY_AGG(
        JSON_BUILD_OBJECT({
          id: s.emails.id,
          verified: s.emails.verified,
        })
      ),
    }));

  const res = await q1.run(db);
  console.log();
  console.log("Query res:");
  console.log(JSON.stringify(res));

  console.log(res[0].emails[0].verified);

  process.exit(0);
}
