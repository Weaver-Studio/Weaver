import { httpAction } from "./_generated/server"
import { api, internal } from "./_generated/api";

interface WorkOSData {
	id: string,
	email: string,
	object: 'user',
	metadata: {},
	last_name: string,
	created_at: string,
	first_name: string,
	updated_at: string,
	external_id: string,
	email_verified: boolean,
	last_sign_in_at: string,
	profile_picture_url: string
}


export const workosWebhook = httpAction(async (ctx, req) => {
	const bodyText = await req.text();
	const sigHeader = String(req.headers.get("workos-signature"));

	try {
		await ctx.runAction(internal.node.workos.verifyWebhook, {
			payload: bodyText,
			signature: sigHeader,
		})
		const { data }: { data: WorkOSData } = JSON.parse(bodyText);
		console.log(data);

		await ctx.runMutation(api.users.createUser, {
			user: {
				firstName: data.first_name,
				lastName: data.last_name,
				email: data.email,
				workosId: data.id,
				createdAt: Date.parse(data.created_at),
				updatedAt: Date.parse(data.updated_at),
				lastLoginAt: Date.parse(data.last_sign_in_at),
			}
		})

		return new Response(JSON.stringify({ status: "success", }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		})
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ status: "error", error: error }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
})