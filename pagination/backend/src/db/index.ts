import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from "dotenv";

config();

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client);
