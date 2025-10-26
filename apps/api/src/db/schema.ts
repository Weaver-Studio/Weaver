/** biome-ignore-all lint/performance/noBarrelFile: i need all of it */
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// User state table
export const userState = sqliteTable(
  "user_state",
  {
    userId: text("user_id").primaryKey(),
    theme: text("theme"), // Foreign key reference will be handled at application level
    warmedThreadId: text("warmed_thread_id"), // Foreign key reference will be handled at application level
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("idx_user_state_user_id").on(table.userId)]
);

// Threads table
export const threads = sqliteTable(
  "threads",
  {
    id: text("id").primaryKey(), // Using text ID for compatibility with Convex
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    forkedFromThread: text("forked_from_thread"), // Foreign key reference will be handled at application level
    forkedFromMsg: text("forked_from_msg"), // Foreign key reference will be handled at application level
    sequenceNumber: integer("sequence_number").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    index("idx_threads_user_id").on(table.userId),
    index("idx_threads_user_id_updated_at").on(table.userId, table.updatedAt),
  ]
);

// Messages table
export const messages = sqliteTable(
  "messages",
  {
    id: text("id").primaryKey(), // Using text ID for compatibility with Convex
    threadId: text("thread_id").notNull(),
    content: text("content").notNull(),
    sequenceNumber: integer("sequence_number").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("idx_messages_thread_id").on(table.threadId)]
);

// Posts table (forum related)
export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(), // Using text ID for compatibility with Convex
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("idx_posts_user_id").on(table.userId)]
);

// Comments table (forum related)
export const comments = sqliteTable(
  "comments",
  {
    id: text("id").primaryKey(), // Using text ID for compatibility with Convex
    postId: text("post_id").notNull(),
    parentId: text("parent_id"), // Self-referencing foreign key
    content: text("content").notNull(),
    userId: text("user_id").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    index("idx_comments_user_id").on(table.userId),
    index("idx_comments_post_id").on(table.postId),
  ]
);

// Theme data table
export const themeData = sqliteTable("theme_data", {
  id: text("id").primaryKey(), // Using text ID for compatibility with Convex
  userId: text("user_id").notNull(),
  theme: text("theme").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export * from "./auth-schema";

// Export types for TypeScript usage
export type UserState = typeof userState.$inferSelect;
export type NewUserState = typeof userState.$inferInsert;
export type Thread = typeof threads.$inferSelect;
export type NewThread = typeof threads.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type ThemeData = typeof themeData.$inferSelect;
export type NewThemeData = typeof themeData.$inferInsert;
