import { ARRAY_AGG, EQ, InMem, JSON_BUILD_OBJECT, val } from ".";
import { db } from "./aperi";
import postgres from "postgres";

const pg = postgres({
  database: "aperi",
});

go().then(() => process.exit(0));
async function go() {
  const getLocations = db
    .SELECT()
    .FROM((db) => db.location)
    .JOIN((q) => q.care)
    .ON((q) => EQ(q.care.identifier, q.location.care_identifier))
    .JOIN((q) => q.room)
    .ON((q) => EQ(q.room.location_identifier, q.location.identifier))
    .JOIN((q) =>
      q
        .SELECT()
        .FROM((q) => q.patient)
        .GROUP_BY((q) => q.patient.room_identifier)
        .PROJECT((q) => ({
          room_identifier: q.patient.room_identifier,
          patient: ARRAY_AGG(JSON_BUILD_OBJECT(q.patient)),
        }))
    )
    .AS("patients")
    .ON((q) => EQ(q.patients.room_identifier, q.room.identifier))
    .PROJECT((q) => ({
      care_id: q.care.identifier,
      location_id: q.location.identifier,
      location_name: q.location.name,
      patients: q.patients.patient,
    }));

  const locs = await getLocations.run(pg);
  console.log(JSON.stringify(locs, null, 2));
}
