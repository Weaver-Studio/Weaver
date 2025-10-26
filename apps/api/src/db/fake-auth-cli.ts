import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export type Database = DrizzleD1Database<typeof schema>;
// biome-ignore lint/suspicious/noExplicitAny: false positive
export const fakeAuthDb = drizzle({} as any, { schema });
