import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	userState: defineTable({
		userId: v.string(),
		theme: v.optional(v.id("themeData")),
		updateAt: v.int64(),
	})
		.index("by_userId", ["userId"]),

	//chat related
	threads: defineTable({
		userId: v.string(),
		title: v.string(),
		forkedFromThread: v.optional(v.id("threads")),
		forkedFromMsg: v.optional(v.id("messages")),
		sequenceNumber: v.number(),
		updateAt: v.int64(),
	})
		.index("by_userId", ["userId"]),

	messages: defineTable({
		threadId: v.id("threads"),
		content: v.string(),
		sequenceNumber: v.number(),
		updateAt: v.int64(),
	})
		.index("by_threadId", ["threadId"]),

	//forum related
	posts: defineTable({
		userId: v.string(),
		title: v.string(),
		content: v.string(),
		updateAt: v.int64(),
	})
		.index("by_userId", ["userId"]),

	comments: defineTable({
		postId: v.id("posts"),
		parentId: v.optional(v.id("comments")),
		content: v.string(),
		userId: v.string(),
		updateAt: v.int64(),
	})
		.index("by_userId", ["userId"])
		.index("by_postId", ["postId"]),


	//theme related
	themeData: defineTable({
		userId: v.string(),
		theme: v.string(),
		updateAt: v.int64(),
	}),
},
	{ schemaValidation: true }
);
