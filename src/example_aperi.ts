import { db } from "./aperi";
import { EQ, InMem } from "./query2";
import postgres from "postgres";

const pg = postgres({
  database: "sqlints",
});

go().then(() => process.exit(0));
async function go() {
  const ib = db
    .SELECT()
    .FROM((s) => s.location)
    .JOIN((s) => s.care)
    .ON((s) => EQ(s.location.identifier, s.location.identifier))
    .PROJECT((s) => ({
      location_identifier: s.location.identifier,
      care_identifier: s.care.identifier,
    }));
  console.log(ib.toSql());
}
