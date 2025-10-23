import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";

export const createThread = mutation({
  handler: async (ctx, _args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const userState = await ctx.db
      .query("userState")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first();

    if (!userState)
      throw new ConvexError("How do you even exist! userState not found");

    if (userState.warmedThreadId) {
      const warmedThread = await ctx.db.get(userState.warmedThreadId);
      if ((warmedThread?.sequenceNumber as number) > 0)
        throw new ConvexError("Warmed thread already exists");
    }

    const threadId = await ctx.db.insert("threads", {
      userId: identity.subject,
      title: "",
      updateAt: BigInt(Date.now()),
      sequenceNumber: 0,
    });

    await ctx.db.patch(userState._id, {
      warmedThreadId: threadId,
      updateAt: BigInt(Date.now()),
    });
  },
});

export const deleteThread = mutation({
  args: {
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const userId = identity.subject;
    const thread = await ctx.db.get(args.threadId);

    if (!thread) throw new ConvexError("Thread not found");
    if (thread.userId !== userId)
      throw new ConvexError("Not authorized to delete thread");

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_threadId", (q) => q.eq("threadId", args.threadId))
      .order("desc")
      .collect();

    for await (const message of messages) await ctx.db.delete(message._id);

    const userState = await ctx.db
      .query("userState")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!userState)
      throw new ConvexError("How do you even exist! userState not found");

    if (userState.warmedThreadId === args.threadId) {
      await ctx.db.patch(userState._id, {
        warmedThreadId: undefined,
        updateAt: BigInt(Date.now()),
      });
    }

    await ctx.db.delete(args.threadId);
  },
});
