import { demoDb } from "./demo2";
import { EQ, InMem } from "./query2";
import postgres from "postgres";

const pg = postgres({
  database: "sqlints",
});

go().then(() => process.exit(0));
async function go() {
  const ib = demoDb
    .INSERT()
    .INTO((s) => s.users)
    .VALUES({ id: 10 })
    .RETURNING((s) => ({
      id: s.id,
    }));
  console.log(ib.toSql());

  const qy = demoDb
    .SELECT()
    .FROM((db) => db.users)
    .JOIN((db) => db.emails)
    .ON((s) => EQ(s.users.id, s.emails.user_id))
    .PROJECT((s) => ({
      userid: s.users.id,
      emailid: s.emails.id,
      emailverified: s.emails.verified,
    }));

  console.log(qy.toSql());

  const myRel = {
    users: [{ id: 1 }],
    emails: [
      { id: 1, user_id: 1, verified: true },
      { id: 2, user_id: null, verified: false },
      { id: 3, user_id: 1, verified: false },
    ],
    addresses: [{ id: 1, user_id: 1 }],
  };

  const inMemDb = new InMem(myRel);

  const qz = inMemDb
    .SELECT()
    .FROM((db) => db.users)
    .JOIN((db) => db.emails)
    .ON((s) => EQ(s.users.id, s.emails.user_id))
    .PROJECT((s) => ({
      userid: s.users.id,
      emailid: s.emails.id,
      emailverified: s.emails.verified,
    }));

  const inMemRes = qz.runInMemory(myRel);

  console.log(JSON.stringify(inMemRes, null, 2));

  console.log(
    await demoDb
      .SELECT()
      .FROM((s) => s.users)
      .PROJECT((s) => s.users)
      .run(pg)
  );
}
