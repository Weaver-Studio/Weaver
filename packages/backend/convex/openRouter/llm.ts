import { v } from "convex/values";
import OpenAI from "openai";
import { httpAction, internalAction } from "../_generated/server";
import { buildCorsHeaders } from "../utils";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://app.test.com",
    "X-Title": "Weaver",
  },
});

export const getTitle = internalAction({
  args: { prompt: v.string() },
  handler: async (_ctx, args) => {
    const title = await openai.chat.completions.create({
      model: "z-ai/glm-4.5-air:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful genius that gives a good, to the point minimal title for a chat.",
        },
        {
          role: "user",
          content: args.prompt,
        },
      ],
    });
    return title.choices[0].message.content || "Looking for a good title";
  },
});

export const chat = httpAction(async (_ctx, request) => {
  const headers = buildCorsHeaders(request);

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const textEncoder = new TextEncoder();

  const streamfunc = async () => {
    // biome-ignore lint/correctness/noUnusedVariables: bug with biome
    let content = "";
    try {
      const stream = await openai.chat.completions.create({
        stream: true,
        model: "z-ai/glm-4.5-air:free",
        messages: [
          {
            role: "user",

            content: "give me a 20 word sentence",
          },
        ],
      });

      for await (const part of stream) {
        const text = part.choices[0]?.delta?.content || "";
        content += text;
        await writer.write(textEncoder.encode(text));
      }
      await writer.close();
    } catch (e) {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
      } else {
        throw e;
      }
    }
  };
  // biome-ignore lint/complexity/noVoid: I NEED THIS
  void streamfunc();
  return new Response(readable, {
    headers: new Headers(headers),
  });
});
