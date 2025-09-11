import { httpRouter } from "convex/server";
import { workosWebhook } from "./workosWebHook";
import { prompt } from "./openRouter";


const http = httpRouter();


http.route({
	path: "/workos/web-hook",
	method: "POST",
	handler: workosWebhook,
});

http.route({
	path: "/prompt",
	method: "POST",
	handler: prompt,
});




export default http;
