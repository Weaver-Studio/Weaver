import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getComments = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .collect();
    return Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("subject"), comment.userId))
          .first();
        return {
          ...comment,
          author: user,
        };
      })
    );
  },
});

export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const comment = await ctx.db.insert("comments", {
      postId: args.postId,
      userId,
      content: args.content,
      updateAt: Date.now(),
    });
    return comment;
  },
});
