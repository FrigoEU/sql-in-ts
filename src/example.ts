import { demoDb } from "./demo2";
import { EQ, InMem } from "./query2";

const qx = demoDb.SELECT().FROM((db) => db.users);

// const qz = demoDb
//   .SELECT()
//   .FROM((db) => db.SELECT().FROM((db) => db.users))
//   .AS("myusers");

const qy = demoDb
  .SELECT()
  .FROM((db) => db.users)
  .AS("bla")
  .PROJECT((s) => ({
    something: s.bla.id,
  }));

console.log(qy.toSql());

const myRel: {
  users: { id: number }[];
  emails: { id: number; user_id: null | number; verified: boolean }[];
  addresses: { id: number; user_id: number }[];
} = {
  users: [
    {
      id: 1,
    },
  ],
  emails: [
    {
      id: 1,
      user_id: 1,
      verified: true,
    },
    {
      id: 2,
      user_id: null,
      verified: false,
    },
  ],
  addresses: [{ id: 1, user_id: 1 }],
};

const inMemDb = new InMem(myRel);

const inMemRes = qy.runInMemory(myRel);

console.log(JSON.stringify(inMemRes, null, 2));

// const q1 = demoDb
//   .SELECT()
//   .FROM((db) => db.users)
//   .JOIN_LEFT(
//     (_) => _.emails,
//     (_) => EQ(_.users.id, _.emails.user_id)
//   )
//   .WHERE((_) => EQ(_.users.id, _.emails.user_id))
//   .PROJECT((_) => ({
//     id: _.users.id,
//     email_id: _.emails.id,
//     email_verified: _.emails.verified,
//   }));
