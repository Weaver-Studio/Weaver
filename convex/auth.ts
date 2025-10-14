import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";

const siteUrl = process.env.SITE_URL!;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
	ctx: GenericCtx<DataModel>,
	{ optionsOnly } = { optionsOnly: false },
) => {
	return betterAuth({
		baseURL: process.env.SITE_URL,
		secret: process.env.BETTER_AUTH_SECRET,
		database: authComponent.adapter(ctx),
		verbose: true,

		advanced: {
			crossSubDomainCookies: {
				enabled: true,
				domain: ".test.com"
			}
		},
		trustedOrigins: [
			process.env.CONVEX_SITE_URL!,
			siteUrl || 'http://test.com:5170',
			"http://forum.test.com:5180",
			"http://app.test.com:5190",
		],
		// disable logging when createAuth is called just to generate options.
		// this is not required, but there's a lot of noise in logs without it.
		logger: {
			disabled: optionsOnly,
		},
		// `trustedOrigins: [siteUrl],
		// Configure simple, non-verified email/password to get started
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
		socialProviders: {
			// discord: {
			// 	clientId: process.env.DISCORD_CLIENT_ID as string,
			// 	clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			// },
			// google: {
			// 	clientId: process.env.GOOGLE_CLIENT_ID as string,
			// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// },
			github: {
				clientId: process.env.GITHUB_CLIENT_ID as string,
				clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			},
		},
		plugins: [
			// The Convex plugin is required for Convex compatibility
			convex(),
		],
	});
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		return authComponent.getAuthUser(ctx);
	},
});