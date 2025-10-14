// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	user: defineTable({
		authId: v.string(),
		theme: v.optional(v.id("themeData")),
		updateAt: v.int64(),

	}).index("by_authId", ["authId"]),

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
	// If you ever get an error about schema mismatch
	// between your data and your schema, and you cannot
	// change the schema to match the current data in your database,
	// you can:
	//  1. Use the dashboard to delete tables or individual documents
	//     that are causing the error.
	//  2. Change this option to `false` and make changes to the data
	//     freely, ignoring the schema. Don't forget to change back to `true`!
	{ schemaValidation: true }
);
