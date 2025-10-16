import { createClient, type GenericCtx, AuthFunctions } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";
import authSchema from "./betterAuth/schema";

const siteUrl = process.env.SITE_URL!;

const authFunctions: AuthFunctions = internal.auth;


export const authComponent = createClient<DataModel, typeof authSchema>(
	components.betterAuth,
	{
		authFunctions,
		local: {
			schema: authSchema,
		},
		triggers: {
			user: {
				onCreate: async (ctx, doc) => {
					await ctx.db.insert("userState", {
						userId: doc._id,
						updateAt: BigInt(Date.now()),
					});
				},
				onUpdate: async (ctx, newDoc, oldDoc) => {
					// Both old and new documents are available so you can compare and detect
					// changes - you can ignore oldDoc if you don't need it.
				},
				onDelete: async (ctx, doc) => {
					// The entire deleted document is available
				},
			},
		},
	}
);

export const createAuth = (
	ctx: GenericCtx<DataModel>,
	{ optionsOnly } = { optionsOnly: true },
) => {
	return betterAuth({
		appName: "Weaver",
		baseURL: process.env.SITE_URL,


		trustedOrigins: async (request: Request) => {
			// Return an array of trusted origins based on the request
			return [
				process.env.CONVEX_SITE_URL!,
				siteUrl || 'http://test.com:5170',
				'http://forum.test.com:5180',
				'http://app.test.com:5190',
			];
		},
		secret: process.env.BETTER_AUTH_SECRET,
		database: authComponent.adapter(ctx),
		verbose: true,

		advanced: {
			crossSubDomainCookies: {
				enabled: true,
				domain: ".test.com"
			}
		},
		logger: {
			disabled: optionsOnly,
		},
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
		plugins: [convex()],
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

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();