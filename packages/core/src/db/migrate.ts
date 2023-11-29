import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationDb } from "./migration-db";

export const migrateDB = async () => {
  console.log("migrating db");

  await migrate(migrationDb, { migrationsFolder: "src/db/migrations" });
  console.log("db migrated");
};

migrateDB();
