import { type FunctionReference, anyApi } from "convex/server";
import { type GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
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
