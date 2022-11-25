import postgres from "postgres";
import { demoDb } from "./demo";
import { AND, ARRAY_AGG, EQ, JSON_BUILD_OBJECT, NOT, PLUS, val } from "./query";

const db = postgres({
  database: "sqlints",
});

go();

async function go() {
  const qa = demoDb.SELECT();
  const qd = demoDb.SELECT().FROM((db) => db.users);
  const qe = demoDb.SELECT().FROM((db) => ({ Q: db.users, AS: "jonnies" }));

  const qb_sec = demoDb.SELECT().FROM((db) => ({
    Q: db
      .SELECT()
      .FROM((_) => _.users)
      .PROJECT((s) => ({ id: s.users.id, something: val(5) })),
    AS: "users",
  }));

  const qc1 = qb_sec.JOIN(
    (_) => _.emails,
    (_) => EQ(_.emails.user_id, _.users.id)
  );
  const qc2 = qb_sec
    .JOIN(
      (_) => ({
        Q: _.SELECT()
          .FROM((_) => _.emails)
          .PROJECT((_) => _.emails),
        AS: "sub_emails",
      }),
      (_) => EQ(_.users.id, _.sub_emails.user_id)
    )
    .PROJECT((_) => ({
      identifier: _.sub_emails.id,
    }));

  const q1 = demoDb
    .SELECT()
    .FROM((db) => db.users)
    .JOIN_LEFT(
      (_) => _.emails,
      (_) => EQ(_.users.id, _.emails.user_id)
    )
    .WHERE((_) => EQ(_.users.id, _.emails.user_id))
    .PROJECT((_) => ({
      id: _.users.id,
      email_id: _.emails.id,
      email_verified: _.emails.verified,
    }));

  // const q1 = SELECT(demoDb)
  //   .FROM("users")
  //   // .JOIN("emails", (s) => EQ(s.users.id, s.emails.user_id))
  //   // .JOIN_LEFT("addresses", (s) => EQ(s.users.id, s.addresses.user_id))
  //   .JOIN_SUBSELECT(
  //     "nested_emails",
  //     SELECT(demoDb)
  //       .FROM("emails")
  //       .GROUP_BY((s) => s.emails.user_id)
  //       .PROJECT((s) => ({
  //         user_id: s.emails.user_id,
  //         emails: ARRAY_AGG(
  //           JSON_BUILD_OBJECT({
  //             id: s.emails.user_id,
  //             verified: s.emails.verified,
  //           })
  //         ),
  //       })),
  //     (s) => EQ(s.users.id, s.nested_emails.user_id)
  //   )
  //   .WHERE((s) => EQ(s.users.id, val(1)))
  //   .PROJECT((s) => ({
  //     user_id: s.users.id,
  //     emails: s.nested_emails.emails,
  //   }));

  // const q2 = SELECT(demoDb)
  //   .FROM("users")
  //   .JOIN_NESTED(
  //     "emails",
  //     (s) => s.users.id,
  //     (em) => em.emails.user_id
  //   );

  const res = await q1.run(db);
  console.log();
  console.log("Query res:");
  console.log(JSON.stringify(res));

  console.log(res[0]);

  process.exit(0);
}
