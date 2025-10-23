import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";

// Returns minimal metadata shape for sidebar display when limited: { id, title, updatedAt }
export const getThreads = query({
  args: {
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // If no paginationOpts provided, return default limited result
    if (!args.paginationOpts) {
      const limit = 20; // Default limit
      const threads = await ctx.db
        .query("threads")
        .withIndex("by_userId_updateAt", (q) =>
          q.eq("userId", identity.subject)
        )
        .order("desc")
        .take(limit);

      // Return in paginated format for consistency
      return {
        page: 1,
        totalPages: 1,
        total: threads.length,
        items: threads,
      };
    }

    return await ctx.db
      .query("threads")
      .withIndex("by_userId_updateAt", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getWarmedThread = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userState = await ctx.db
      .query("userState")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first();

    const warmedThreadId = userState?.warmedThreadId;
    if (!warmedThreadId) {
      throw new ConvexError("Warmed thread not found");
    }

    // Verify the thread exists
    const thread = await ctx.db.get(warmedThreadId);
    if (!thread) {
      // If thread doesn't exist, return undefined
      // Client should handle clearing stale warmedThreadId via clearStaleWarmedThread mutation
      throw new ConvexError("Warmed thread doesnt exist in table");
    }

    return warmedThreadId;
  },
});

// Returns minimal metadata shape for sidebar display: { id, title, updatedAt }
export const getRecentThreads = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const limit = args.limit ?? 10;
    const threads = await ctx.db
      .query("threads")
      .withIndex("by_userId_updateAt", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(limit);

    return threads.map((thread) => ({
      id: thread._id,
      title: thread.title,
      updatedAt: thread.updateAt,
    }));
  },
});
