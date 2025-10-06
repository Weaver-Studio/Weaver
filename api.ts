import { type FunctionReference, anyApi } from "convex/server";
import { type GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  messages: {
    listMessages: FunctionReference<
      "query",
      "public",
      { threadId: Id<"chatThreads"> },
      Array<{
        _creationTime: number;
        _id: Id<"chatMessages">;
        content: string;
        createdAt: number;
        model?: string;
        role: "user" | "assistant" | "system";
        status?: "streaming" | "final";
        threadId: Id<"chatThreads">;
      }>
    >;
    appendUserMessage: FunctionReference<
      "mutation",
      "public",
      { content: string; model?: string; threadId: Id<"chatThreads"> },
      { messageId: Id<"chatMessages"> }
    >;
  };
  threads: {
    listRecentThreads: FunctionReference<
      "query",
      "public",
      { limit?: number },
      Array<{
        _creationTime: number;
        _id: Id<"chatThreads">;
        createdAt: number;
        status: "draft" | "active" | "archived";
        title: string;
        updatedAt: number;
        userId: Id<"users">;
      }>
    >;
    getOrCreateDraftThread: FunctionReference<
      "mutation",
      "public",
      Record<string, never>,
      {
        createdAt: number;
        status: "draft" | "active" | "archived";
        threadId: Id<"chatThreads">;
        title: string;
        updatedAt: number;
      }
    >;
    activateThreadOnFirstMessage: FunctionReference<
      "mutation",
      "public",
      { threadId: Id<"chatThreads">; title: string },
      null
    >;
  };
  users: {
    createUser: FunctionReference<
      "mutation",
      "public",
      {
        user: {
          createdAt: number;
          email: string;
          firstName: string;
          lastLoginAt?: number;
          lastName: string;
          updatedAt: number;
          workosId: string;
        };
      },
      null
    >;
    deleteUser: FunctionReference<"mutation", "public", { id: string }, null>;
  };
};
export type InternalApiType = {};
