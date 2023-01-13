import { DB, FieldDef, TableDef } from "./query2";

export const demoDb = new DB<DemoDb>({
  tables: {
    users: {
      __meta: {
        name: "users",
        schema: "public",
      },
      fields: {
        id: { name: "id", type: "int", nullable: false },
      },
    },
    emails: {
      __meta: {
        name: "emails",
        schema: "public",
      },
      fields: {
        id: { name: "id", type: "int", nullable: false },
        user_id: { name: "user_id", type: "int", nullable: true },
        verified: { name: "verified", type: "boolean", nullable: false },
      },
    },
    addresses: {
      __meta: {
        name: "addresses",
        schema: "public",
      },
      fields: {
        id: { name: "id", type: "int", nullable: false },
        user_id: { name: "user_id", type: "int", nullable: false },
      },
    },
  },
} as const);

export type DemoDb = {
  users: usersTable;
  emails: emailsTable;
  addresses: addressesTable;
};

type usersTable = {
  id: number;
};

type emailsTable = {
  id: number;
  user_id: number | null;
  verified: boolean;
};

type addressesTable = {
  id: number;
  user_id: number;
};
