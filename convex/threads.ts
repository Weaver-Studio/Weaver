import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { ensureUser } from "./users";

export const listRecentThreads = query({
	args: { limit: v.optional(v.number()) },
	returns: v.array(
		v.object({
			_id: v.id("chatThreads"),
			_creationTime: v.number(),
			userId: v.id("users"),
			title: v.string(),
			status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
			createdAt: v.number(),
			updatedAt: v.number(),
		})
	),
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];
		const user = await ensureUser(ctx);

		// NOTE: index is named by_ownerId_and_updatedAt but keys are (userId, updatedAt)
		const rows = await ctx.db
			.query("chatThreads")
			.withIndex("by_userId_and_updatedAt", (q: any) => q.eq("userId", user._id))
			.order("desc")
			.take(args.limit ?? 20);
		return rows;
	},
});

export const getOrCreateDraftThread = mutation({
	args: {},
	returns: v.object({
		threadId: v.id("chatThreads"),
		title: v.string(),
		status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
		createdAt: v.number(),
		updatedAt: v.number(),
	}),
	handler: async (ctx) => {
		const user = await ensureUser(ctx);
		const now = Date.now();

		// userState replaced userChatState
		const state = await ctx.db
			.query("userState")
			.withIndex("by_userId", (q: any) => q.eq("userId", user._id))
			.first();

		if (state?.draftThreadId) {
			const thread = await ctx.db.get(state.draftThreadId);
			if (thread && thread.status === "draft") {
				return {
					threadId: thread._id,
					title: thread.title,
					status: thread.status,
					createdAt: thread.createdAt,
					updatedAt: thread.updatedAt,
				};
			}
		}

		// Create new draft thread
		const newThreadId: Id<"chatThreads"> = await ctx.db.insert("chatThreads", {
			userId: user._id,
			title: "New chat",
			status: "draft",
			createdAt: now,
			updatedAt: now,
		});

		if (state) {
			await ctx.db.patch(state._id, { draftThreadId: newThreadId, updatedAt: now });
		} else {
			await ctx.db.insert("userState", {
				userId: user._id,
				draftThreadId: newThreadId,
				createdAt: now,
				updatedAt: now,
			});
		}

		const thread = await ctx.db.get(newThreadId);
		if (!thread) throw new Error("Failed to create thread");

		return {
			threadId: thread._id,
			title: thread.title,
			status: thread.status,
			createdAt: thread.createdAt,
			updatedAt: thread.updatedAt,
		};
	},
});

export const activateThreadOnFirstMessage = mutation({
	args: {
		threadId: v.id("chatThreads"),
		title: v.string(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const user = await ensureUser(ctx);
		const thread = await ctx.db.get(args.threadId);
		if (!thread) throw new Error("Thread not found");
		if (thread.userId !== user._id) throw new Error("Forbidden");

		if (thread.status === "draft") {
			const now = Date.now();
			await ctx.db.patch(thread._id, {
				status: "active",
				title: args.title || thread.title,
				updatedAt: now,
			});
		}
		return null;
	},
});
