import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

// Import schema from schema.ts to be used in drizzle. Allowing to use the schema in the database.
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema, // Allowing to use the schema in the database.
});
