import type { DB, Field } from "./query";

export const demoDb: DB<DemoDb> = {
  tables: {
    users: {
      name: "users",
      schema: "public",
      fields: { id: { name: "id", type: "int" } },
      primaryKey: ["id"],
      defaults: [],
    },
    emails: {
      name: "emails",
      schema: "public",
      fields: {
        id: { name: "id", type: "int" },
        user_id: { name: "user_id", type: "int" },
        verified: { name: "verified", type: "boolean" },
      },
      primaryKey: ["id"],
      defaults: [],
    },
    addresses: {
      name: "addresses",
      schema: "public",
      fields: {
        id: { name: "id", type: "int" },
        user_id: { name: "user_id", type: "int" },
      },
      primaryKey: ["id"],
      defaults: [],
    },
  },
  views: [],
};

type DemoDb = {
  users: usersTable;
  emails: emailsTable;
  addresses: addressesTable;
};

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
    verified: Field<boolean>;
  };
  primaryKey: ["id"];
  defaults: [];
};

type addressesTable = {
  name: "addresses";
  schema: "public";
  fields: {
    id: Field<number>;
    user_id: Field<number>;
  };
  primaryKey: ["id"];
  defaults: [];
};
