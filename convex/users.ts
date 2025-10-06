import { Doc, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Helper to ensure a user document exists for the current identity
export async function ensureUser(ctx: any): Promise<Doc<"users">> {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) throw new Error("Not authenticated");

	const existing = await ctx.db
		.query("users")
		.withIndex("by_customerId", (q: any) => q.eq("customerId", identity.subject))
		.first();
	if (existing) return existing as Doc<"users">;

	const now = Date.now();
	const newId: Id<"users"> = await ctx.db.insert("users", {
		subscriptionTier: "free",
		createdAt: now,
		updatedAt: now,
		customerId: identity.subject,
	});
	const created = await ctx.db.get(newId);
	if (!created) throw new Error("Failed to create user");
	return created as Doc<"users">;
}


export const createUser = mutation({
	args: {
		user: v.object({
			firstName: v.string(),
			lastName: v.string(),
			email: v.string(),
			workosId: v.string(),
			createdAt: v.number(),
			updatedAt: v.number(),
			lastLoginAt: v.optional(v.number()),
		}),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const now = Date.now();
		const newId: Id<"users"> = await ctx.db.insert("users", {
			firstName: args.user.firstName,
			lastName: args.user.lastName,
			email: args.user.email,
			workosId: args.user.workosId,
			lastLoginAt: args.user.lastLoginAt,
			createdAt: args.user.createdAt,
			updatedAt: args.user.updatedAt,
		});
		return null;
	},
});

// export const updateUser = mutation({
// 	args: {
// 		id: v.id("users"),
// 		user: v.object({
// 			subscriptionTier: v.optional(v.string()),
// 			createdAt: v.optional(v.number()),
// 			updatedAt: v.optional(v.number()),
// 		}),
// 	},
// 	returns: v.id("users"),
// 	handler: async (ctx, args) => {
// 		const existing = await ctx.db.get(args.id);
// 		if (!existing) throw new Error("User not found");
// 		await ctx.db.patch(args.id, args.user);
// 		return args.id;
// 	},
// });

export const deleteUser = mutation({
	args: {
		id: v.string(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const userId = await ctx.db.query("users")
			.withIndex("by_workosId", (q) => q.eq("workosId", args.id))
			.filter((q) => q.eq(q.field("workosId"), args.id))
			.first();
		if (!userId) throw new Error("User not found");
		await ctx.db.delete(userId._id);
		return null;
	},
});
