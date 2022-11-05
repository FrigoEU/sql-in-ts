import postgres from "postgres";
import { demoDb } from "./demo";
import { AND, NOT, SELECT, val } from "./query";

const db = postgres({
  database: "sqlints",
});

go();

async function go() {
  const q1 = SELECT(demoDb)
    .FROM("users")
    .JOIN("emails", (s) => s.users.id.EQ(s.emails.user_id))
    .JOIN_LEFT("addresses", (s) => s.users.id.EQ(s.addresses.user_id))
    .WHERE((s) =>
      s.users.id
        .EQ(val(1))
        .AND(s.emails.id.EQ(val(5)))
        .AND(NOT(s.emails.id.EQ(val(6))))
    )
    .WHERE((s) =>
      AND(
        s.users.id.EQ(val(1)),
        s.emails.id.EQ(val(5)),
        NOT(s.emails.id.EQ(val(6)))
      )
    )
    .PROJECT((s) => ({
      user_id: s.emails.user_id,
      address: s.addresses.id,
      email_id: s.emails.id,
      verified: s.emails.verified,
    }));

  const res = await q1.run(db);
  console.log();
  console.log("Query res:");
  console.log(res);

  process.exit(0);
}
