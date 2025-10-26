import { env } from "cloudflare:workers";
import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import type * as schema from "./schema";

export type Database = DrizzleD1Database<typeof schema>;
export const db = drizzle(env.DB);
