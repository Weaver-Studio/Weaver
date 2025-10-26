import { env } from "cloudflare:workers";
import { db } from "@api/db";
import * as schema from "@api/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  appName: "Weaver",
  secret: env.BETTER_AUTH_SECRET,

  secondaryStorage: {
    get: async (key: string) => await env.SESSION_KV.get(key),
    set: async (key: string, value: string, ttl?: number) => {
      if (ttl) {
        await env.SESSION_KV.put(key, value, {
          expirationTtl: ttl < 60 ? 60 : ttl,
        });
      } else {
        await env.SESSION_KV.put(key, value);
      }
    },
    delete: async (key: string) => {
      await env.SESSION_KV.delete(key);
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: ".test.com",
    },
  },
  trustedOrigins: [
    "http://test.com",
    "http://api.test.com",
    "http://app.test.com",
    "http://forum.test.com",
  ],
});
