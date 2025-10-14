import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./betterAuth/_generated/dataModel";

export const testQuery = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		return identity;
	},
});


export const getThreads = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		try {
			const identity = await ctx.auth.getUserIdentity();

			const threads = await ctx.db.query("threads")
				.withIndex("by_userId", (q) => q.eq("userId", identity?.subject as Id<"user">))
				.order("desc")
				.paginate(args.paginationOpts);

			return threads;
		} catch (error) {
			throw error;
		}
	},
});



/*=======================*/
/*       mutations       */
/*=======================*/

export const add = mutation({
	handler: async (ctx) => {
		try {
			const identity = await authComponent.getAuthUser(ctx);
			const threadId = await ctx.db.insert("threads", {
				userId: identity._id,
				title: "New Thread",
				updateAt: BigInt(Date.now()),
			});
			return threadId;
			// todo add the thread title call to give unique thread name
		} catch (error) {
			throw error;
		}
	},
});

export const deleteThread = mutation({
	args: {
		threadId: v.id("threads"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}
		const userId = identity.subject;
		const thread = await ctx.db.get(args.threadId);
		if (!thread) {
			throw new Error("Thread not found");
		}
		if (thread.userId !== userId) {
			throw new Error("Not authorized");
		}
		await ctx.db.delete(args.threadId);
	},
});
