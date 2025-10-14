import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const getAuthUser = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}
		return await authComponent.getAuthUser(ctx);
	},
});



/*=======================*/
/*       mutations       */
/*=======================*/

// export const add = mutation({
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const userId = authComponent.getAuthUser(ctx);
//     const threadId = await ctx.db.insert("threads", {
//       userId,
//       title: args.title,
//       updateTime: Date.now(),
//     });
//     return threadId;
//   },
// });

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
