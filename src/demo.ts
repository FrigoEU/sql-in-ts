import type { DB, Field } from "./query";

export const demoDb: DB<DemoDb> = {
  tables: {
    users: {
      name: "users",
      schema: "public",
      fields: { id: { name: "id", type: "int", nullable: false } },
      primaryKey: ["id"],
      defaults: [],
    },
    emails: {
      name: "emails",
      schema: "public",
      fields: {
        id: { name: "id", type: "int", nullable: false },
        user_id: { name: "user_id", type: "int", nullable: false },
        verified: { name: "verified", type: "boolean", nullable: false },
      },
      primaryKey: ["id"],
      defaults: [],
    },
    addresses: {
      name: "addresses",
      schema: "public",
      fields: {
        id: { name: "id", type: "int", nullable: false },
        user_id: { name: "user_id", type: "int", nullable: false },
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
  id: number;
};

type emailsTable = {
  id: number;
  user_id: number;
  verified: boolean;
};

type addressesTable = {
  id: number;
  user_id: number;
};
