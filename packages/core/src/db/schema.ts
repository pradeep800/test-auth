import {
  pgTable,
  serial,
  uuid,
  varchar,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  }
);
export const verificationToken = pgTable(
  "verification_token",
  {
    id: serial("id").primaryKey(),
    token: text("token").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return { tokenIndex: index("tokenIdx").on(table.token) };
  }
);
