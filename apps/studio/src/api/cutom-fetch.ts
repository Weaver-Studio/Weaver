import { streamChat } from "./llm-client";

export interface CustomFetchOptions<T> {
  token: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: T;
}

export const customFetch = async <T>(options: CustomFetchOptions<T>) => {
  if (options.path === "chat" && options.method === "POST") {
    const bodyObj = options.body as any;
    return streamChat({
      token: options.token,
      message: bodyObj.message,
      model: bodyObj.model,
      thinkingLevel: bodyObj.thinkingLevel,
    });
  }

  const baseURL = import.meta.env.VITE_CONVEX_SITE_URL;

  return fetch(`${baseURL}/${options.path}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token ? `Bearer ${options.token}` : "",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
};
