import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const post = await ctx.db.insert("posts", {
      userId,
      title: args.title,
      content: args.content,
      updateAt: Date.now(),
    });
    return post;
  },
});

export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("subject"), post.userId))
          .first();
        return {
          ...post,
          author: user,
        };
      })
    );
  },
});
