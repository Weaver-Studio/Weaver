import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { ensureUser } from "./users";

export const listMessages = query({
	args: { threadId: v.id("chatThreads") },
	returns: v.array(
		v.object({
			_id: v.id("chatMessages"),
			_creationTime: v.number(),
			threadId: v.id("chatThreads"),
			role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
			content: v.string(),
			model: v.optional(v.string()),
			status: v.optional(v.union(v.literal("streaming"), v.literal("final"))),
			createdAt: v.number(),
		})
	),
	handler: async (ctx, args) => {
		const user = await ensureUser(ctx);
		const thread = await ctx.db.get(args.threadId);
		if (!thread) throw new Error("Thread not found");
		if (thread.userId !== user._id) throw new Error("Forbidden");

		const rows = await ctx.db
			.query("chatMessages")
			.withIndex("by_threadId_and_createdAt", (q: any) => q.eq("threadId", args.threadId))
			.order("asc")
			.collect();
		return rows;
	},
});

export const appendUserMessage = mutation({
	args: {
		threadId: v.id("chatThreads"),
		content: v.string(),
		model: v.optional(v.string()),
	},
	returns: v.object({ messageId: v.id("chatMessages") }),
	handler: async (ctx, args) => {
		const user = await ensureUser(ctx);
		const thread = await ctx.db.get(args.threadId);
		if (!thread) throw new Error("Thread not found");
		if (thread.userId !== user._id) throw new Error("Forbidden");

		const now = Date.now();
		const messageId: Id<"chatMessages"> = await ctx.db.insert("chatMessages", {
			threadId: args.threadId,
			role: "user",
			content: args.content,
			model: args.model,
			status: "final",
			createdAt: now,
			updatedAt: now,
		});

		await ctx.db.patch(thread._id, { updatedAt: now });

		return { messageId };
	},
});
