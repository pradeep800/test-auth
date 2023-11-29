import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DATABASE_URL as string;
console.log(connectionString);
const client = postgres(connectionString);
export const migrationDb = drizzle(client, { schema });
