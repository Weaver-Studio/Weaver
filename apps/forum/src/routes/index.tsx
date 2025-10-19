import { createFileRoute, Link } from '@tanstack/react-router'
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@weaver/ui/components/ui/button";
import { SignInButton, SignOutButton } from '@forum/components/auth/buttons';
import { useQuery } from 'convex/react';
import { api } from '@weaver/backend/convex/_generated/api';
import { PostCard } from '@/components/PostCard';

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	const posts = useQuery(api.posts.getPosts);

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
				<div className="grid gap-4">
					{posts?.map((post) => (
						<PostCard key={post._id} post={post} />
					))}
				</div>
			</main>
		</div>
	);
}