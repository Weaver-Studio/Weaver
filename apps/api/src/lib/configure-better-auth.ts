import type { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { auth } from "./auth";
import type { AppBindings } from "./types";

export default function configureBetterAuth(app: OpenAPIHono<AppBindings>) {
  app.use(
    "/api/auth/*", // or replace with "*" to enable cors for all routes
    cors({
      origin: "http://api.test.com:5160", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }

    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  });

  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
}
