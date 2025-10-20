import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/*=======================*/
/*       queries       */
/*=======================*/

export const getMsgByThreadId = query({
  args: {
    threadId: v.id("threads"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const thread = await ctx.db.get(args.threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    if (thread.userId !== identity.subject) {
      throw new Error("Not authorized to view this thread");
    }

    return await ctx.db
      .query("messages")
      .withIndex("by_threadId", (q) => q.eq("threadId", args.threadId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

/*=======================*/
/*       mutations       */
/*=======================*/

export const create = mutation({
  args: {
    threadId: v.id("threads"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const thread = await ctx.db.get(args.threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    if (thread.userId !== identity.subject) {
      throw new Error("Not authorized to post in this thread");
    }

    await ctx.db.patch(args.threadId, {
      sequenceNumber: thread.sequenceNumber + 1,
    });

    const messageId = await ctx.db.insert("messages", {
      threadId: args.threadId,
      content: args.content,
      sequenceNumber: thread.sequenceNumber + 1,
      updateAt: BigInt(Date.now()),
    });

    return messageId;
  },
});

export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const message = await ctx.db.get(args.messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    const thread = await ctx.db.get(message.threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    if (thread.userId !== identity._id) {
      throw new Error("Not authorized to delete this message");
    }

    await ctx.db.delete(args.messageId);
  },
});
