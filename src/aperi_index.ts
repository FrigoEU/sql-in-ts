import { ARRAY_AGG, DB, EQ, InMem, JSON_BUILD_OBJECT, val } from ".";
import { db, MyDb } from "./aperi";
import postgres from "postgres";
import { isNull } from "lodash";

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

  // const locs = await getLocations.run(pg);
  // console.log(JSON.stringify(locs, null, 2));

  const getCareSessions = db
    .SELECT()
    .FROM((db) => db.location)
    .JOIN((d) =>
      d
        .SELECT()
        .FROM((d) => d.care_session)
        .AS("cs")
        .JOIN((d) => d.employee)
        .AS("e")
        .ON((d) => EQ(d.e.identifier, d.cs.employee_identifier))
        .WHERE((d) => EQ(d.cs.timestamp_leave, val(null)))
        .GROUP_BY((d) => d.cs.care_identifier)
        .PROJECT((d) => ({
          care_identifier: d.cs.care_identifier,
          sessions: ARRAY_AGG(
            JSON_BUILD_OBJECT({
              identifier: d.e.identifier,
              name: d.e.name,
            })
          ),
        }))
    )
    .AS("sessions")
    .ON((d) => EQ(d.sessions.care_identifier, d.location.care_identifier))
    .PROJECT((d) => ({
      location_identifier: d.location.identifier,
      location_name: d.location.name,
      sessions: d.sessions.sessions,
    }));

  console.log(getCareSessions.toSql());

  // ARRAY (SELECT json_build_object('identifier', e.identifier, 'name', e.name)
  //        FROM care_session cs
  //        JOIN employee e ON e.identifier = cs.employee_identifier
  //        WHERE cs.timestamp_leave IS NULL
  //        AND cs.care_identifier = c.identifier) AS employees,
}
