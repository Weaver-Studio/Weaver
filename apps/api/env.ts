import { type ZodError, z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_WEAVER_DATABASE_ID: z.string(),
  CLOUDFLARE_WEAVER_D1_TOKEN: z.string(),
});

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error("Invaild envs");
  console.error(z.treeifyError(error));
  process.exit(1);
}

export default env;
