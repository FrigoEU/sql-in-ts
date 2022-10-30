import { demoDb } from "./demo";
import { op, select, val } from "./query";

go();

function go() {
  const q1 = select(demoDb)
    .from("users")
    .innerJoin("emails", (s) => op.eq(s.users.id, s.emails.user_id))
    .leftJoin("addresses", (s) => op.eq(s.users.id, s.addresses.user_id))
    .where((s) => op.not(op.eq(s.users.id, val(5))))
    .project((s) => ({ user_id: s.users.id, email_id: s.emails.id }));
  console.log(q1.toSql());
}
