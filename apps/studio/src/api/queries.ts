import type { useSession } from "@weaver/shared/lib/auth-client";
import { customFetch } from "./cutom-fetch";

type data = ReturnType<typeof useSession>["data"];

export async function newChat({
  tokenData,
  inputValue,
}: {
  tokenData: data;
  inputValue: string;
}) {
  return await customFetch({
    token: tokenData?.session?.token as string,
    method: "POST",
    path: "chat",
    body: JSON.stringify({ message: inputValue }),
  });
}
