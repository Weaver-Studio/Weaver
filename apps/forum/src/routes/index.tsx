import { createFileRoute } from '@tanstack/react-router'
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@weaver/ui/components/ui/button";
import { useSession } from '@forum/lib/auth-client';

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {

	const { data } = useSession()
	return (
		<div className="container flex h-dvh flex-col items-center justify-center">
			{/* <Unauthenticated>
				<div className="flex flex-row items-center gap-2">
					Please sign in to continue
					<SignInButton />
				</div>
			</Unauthenticated>
			<Authenticated>
				<p>Welcome! {data?.user.email}</p>
				<SignOutButton />
			</Authenticated> */}
			<Button variant="outline">Button</Button>
		</div>
	);
}