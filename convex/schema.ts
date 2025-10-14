// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	userProfile: defineTable({
		userId: v.id("users"),
		theme: v.id("themeData"),

	}),

	//chat related
	threads: defineTable({
		userId: v.id("users"),
		content: v.string(),
		forkedFromThread: v.optional(v.id("threads")),
		forkedFromMsg: v.optional(v.id("messages")),
	}),

	messages: defineTable({
		threadId: v.id("threads"),
		title: v.string(),
		content: v.string(),
		tokenCount: v.optional(v.number()),
	}),

	//forum related
	posts: defineTable({
		userId: v.id("users"),
		title: v.string(),
		content: v.string(),

	}),
	comments: defineTable({
		postId: v.id("posts"),
		parentId: v.id("comments"),
		content: v.string(),
		userId: v.id("users"),
	}),


	//theme related
	themeData: defineTable({
		userId: v.id("users"),
		theme: v.string(),
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
