import { createFileRoute, Link } from '@tanstack/react-router'
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@weaver/ui/components/ui/button";
import { useSession } from '@forum/lib/auth-client';
import { SignInButton, SignOutButton } from '@forum/components/ui/buttons';

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {

	const { data } = useSession()
	return (
		<div className="container mx-auto p-4">
			<header className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Roblox Dev Forum</h1>
				<div className="flex items-center gap-4">
					<Link to="/new-post">
						<Button>New Post</Button>
					</Link>
					<Authenticated>
						<SignOutButton />
					</Authenticated>
					<Unauthenticated>
						<SignInButton />
					</Unauthenticated>
				</div>
			</header>
			<main>
				{/* Posts will be listed here */}
			</main>
		</div>
	);
}