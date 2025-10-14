import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { tables } from "./betterAuth/schema";

export default defineSchema({
	userState: defineTable({
		userId: v.id("user"),
		theme: v.optional(v.id("themeData")),
		updateAt: v.int64(),
	}).index("by_userId", ["userId"]),

	//chat related
	threads: defineTable({
		userId: v.id("user"),
		title: v.string(),
		forkedFromThread: v.optional(v.id("threads")),
		forkedFromMsg: v.optional(v.id("messages")),
		updateAt: v.int64(),
	}).index("by_userId", ["userId"]),

	messages: defineTable({
		threadId: v.id("threads"),
		content: v.string(),
		sequenceNumber: v.number(),
		updateAt: v.int64(),
	}).index("by_threadId", ["threadId"]),

	//forum related
	posts: defineTable({
		userId: v.id("user"),
		title: v.string(),
		content: v.string(),
		updateAt: v.int64(),
	}),
	comments: defineTable({
		postId: v.id("posts"),
		parentIds: v.array(v.id("comments")),
		content: v.string(),
		userId: v.id("user"),
		updateAt: v.int64(),
	}),


	//theme related
	themeData: defineTable({
		userId: v.id("user"),
		theme: v.string(),
		updateAt: v.int64(),
	}),
},
	{ schemaValidation: true }
);
