import { createFileRoute } from '@tanstack/react-router'
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, SignOutButton } from "@/components/auth/buttons";
import { useSession } from '@/lib/auth-client';

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {

	const { data } = useSession()
	return (
		<div className="container flex h-dvh flex-col items-center justify-center">
			<Unauthenticated>
				<div className="flex flex-row items-center gap-2">
					Please sign in to continue
					<SignInButton />
				</div>
			</Unauthenticated>
			<Authenticated>
				<p>Welcome! {data?.user.email}</p>
				<SignOutButton />
			</Authenticated>
		</div>
	);
}