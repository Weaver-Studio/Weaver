import configureBetterAuth from "./lib/configure-better-auth";
import configureOpenAPI from "./lib/configure-openapi";
import createApp from "./lib/create-app";
import index from "./routes/index.route";

const routes = [index];

const app = createApp();
configureOpenAPI(app);

configureBetterAuth(app);

for (const route of routes) {
  app.route("/", route);
}

export default app;
