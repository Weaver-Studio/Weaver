import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const testQuery = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return identity;
  },
});

/*=======================*/
/*       queries       */
/*=======================*/

export const getThreads = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const threads = await ctx.db
      .query("threads")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .paginate(args.paginationOpts);

    return threads;
  },
});

/*=======================*/
/*       mutations       */
/*=======================*/

export const createThread = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const threadId = await ctx.db.insert("threads", {
      userId: identity.subject,
      title: "New Thread",
      updateAt: BigInt(Date.now()),
      sequenceNumber: 0,
    });
    return threadId;
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
      throw new Error("Not authorized to delete thread");
    }
    await ctx.db.delete(args.threadId);
  },
});
