import { DB } from "./query2";

type firealarm_event_type = "firealarm" | "disruption";

export const db = new DB<MyDb>({
  tables: {
    users: {
      __meta: {
        name: "users",
        schema: "public",
      },
      fields: {
        id: { name: "id", type: { kind: "scalar", name: { name: "bigint" } } },
      },
    },
    emails: {
      __meta: {
        name: "emails",
        schema: "public",
      },
      fields: {
        id: { name: "id", type: { kind: "scalar", name: { name: "bigint" } } },
        user_id: {
          name: "user_id",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        verified: {
          name: "verified",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        firealarm_event_type: {
          name: "firealarm_event_type",
          type: { kind: "scalar", name: { name: "firealarm_event_type" } },
        },
      },
    },
    addresses: {
      __meta: {
        name: "addresses",
        schema: "public",
      },
      fields: {
        id: { name: "id", type: { kind: "scalar", name: { name: "bigint" } } },
        user_id: {
          name: "user_id",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
  },
} as const);

export type MyDb = {
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
  firealarm_event_type: firealarm_event_type;
};

type addressesTable = {
  id: number;
  user_id: number;
};
