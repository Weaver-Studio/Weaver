import { pinoLogger } from "@api/middleware/pino-logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("🔥"));
  app.use(requestId());
  app.use(pinoLogger());

  app.get("/", (c) => c.text("Skibidi Hono!"));

  app.onError(onError);
  app.notFound(notFound);

  return app;
}
