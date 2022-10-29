import type { DB, Field } from "./query";

export const demoDb: DB<DemoDb> = {
  tables: {
    users: {
      name: "users",
      schema: "public",
      fields: { id: { name: "id" } },
      primaryKey: ["id"],
      defaults: [],
    },
    emails: {
      name: "emails",
      schema: "public",
      fields: {
        id: { name: "id" },
        user_id: { name: "user_id" },
      },
      primaryKey: ["id"],
      defaults: [],
    },
  },
  views: [],
};

type DemoDb = { users: usersTable; emails: emailsTable };

type usersTable = {
  name: "users";
  schema: "public";
  fields: { id: Field<number> };
  primaryKey: ["id"];
  defaults: [];
};

type emailsTable = {
  name: "emails";
  schema: "public";
  fields: {
    id: Field<number>;
    user_id: Field<number>;
  };
  primaryKey: ["id"];
  defaults: [];
};
