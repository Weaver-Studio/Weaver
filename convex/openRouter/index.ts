
import { httpAction } from "../_generated/server";

import OpenAI from "openai"



const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: `${process.env.OPENROUTER_API_KEY}`,
	defaultHeaders: {
		// 'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
		'X-Title': 'Weaver', // Optional. Site title for rankings on openrouter.ai.
	},

});

export const prompt = httpAction(async (ctx, req) => {
	try {
		const completion = await openai.chat.completions.create({
			model: 'deepseek/deepseek-chat-v3.1:free',
			messages: [
				{
					role: 'user',
					content: 'hello',
				}
			],
			// stream: true,
		})

		console.log(completion);

		return new Response(JSON.stringify(completion), {
			// status: completion.ok ? 200 : response.status,
			status: 200,
			headers: { "content-type": "application/json" },
		});

	} catch (error) {

		console.error(error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch from OpenRouter", details: String(error) }),
			{
				status: 500,
				headers: { "content-type": "application/json" },
			}
		);

	}
})
