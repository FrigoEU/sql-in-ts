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
    // .JOIN("emails", (s) => EQ(s.users.id, s.emails.user_id))
    // .JOIN_LEFT("addresses", (s) => EQ(s.users.id, s.addresses.user_id))
    .JOIN_SUBSELECT(
      "nested_emails",
      SELECT(demoDb)
        .FROM("emails")
        .GROUP_BY((s) => s.emails.user_id)
        .PROJECT((s) => ({
          user_id: s.emails.user_id,
          emails: ARRAY_AGG(
            JSON_BUILD_OBJECT({
              id: s.emails.user_id,
              verified: s.emails.verified,
            })
          ),
        })),
      (s) => EQ(s.users.id, s.nested_emails.user_id)
    )
    .WHERE((s) => EQ(s.users.id, val(1)))
    .PROJECT((s) => ({
      user_id: s.users.id,
      emails: s.nested_emails.emails,
    }));

  const res = await q1.run(db);
  console.log();
  console.log("Query res:");
  console.log(JSON.stringify(res));

  console.log(res[0].emails);

  process.exit(0);
}
