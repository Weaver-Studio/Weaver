import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users — required for ownership of chat threads/messages
    users: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        workosId: v.optional(v.string()),
        lastLoginAt: v.optional(v.number()),
        createdAt: v.float64(),
        updatedAt: v.float64(),
    })
        .index("by_workosId", ["workosId"])
        .index("by_email", ["email"])
        .index("by_createdAt", ["createdAt"]),

    // Chat threads (standalone chat)
    chatThreads: defineTable({
        userId: v.id("users"),
        title: v.string(),
        status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
        createdAt: v.float64(),
        updatedAt: v.float64(),
    })
        .index("by_userId_and_updatedAt", ["userId", "updatedAt"]),

    // Messages inside chat threads
    chatMessages: defineTable({
        threadId: v.id("chatThreads"),
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
        model: v.optional(v.string()),
        status: v.optional(v.union(v.literal("streaming"), v.literal("final"))),
        createdAt: v.float64(),
        updatedAt: v.float64(),
    })
        .index("by_threadId_and_createdAt", ["threadId", "createdAt"]),

    // Per-user state (pointer to the users stlst state as yo what they had open in the app)
    userState: defineTable({
        userId: v.id("users"),
        draftThreadId: v.optional(v.id("chatThreads")),
        createdAt: v.float64(),
        updatedAt: v.float64(),
    })
        .index("by_userId", ["userId"]),
});
