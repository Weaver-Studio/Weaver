import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addCount = mutation({
	args: {
		count: v.number()
	},
	handler: async (ctx, args) => {
		const count = await ctx.db.insert("count", { count: args.count });
	}
})

export const getCount = query({
	args: {},
	handler: async (ctx) => {
		return (await ctx.db.query("count").collect()).length;
	}
})