export interface StreamChatOptions {
  token: string;
  message: string;
  model: string;
  thinkingLevel: string;
  signal?: AbortSignal;
}

export async function streamChat({
  token,
  message,
  model,
  thinkingLevel,
  signal,
}: StreamChatOptions) {
  const response = await fetch(`${import.meta.env.VITE_CONVEX_SITE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, model, thinkingLevel }),
    signal,
  });

  return response;
}