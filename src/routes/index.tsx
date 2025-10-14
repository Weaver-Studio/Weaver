import { createFileRoute, useRouter } from '@tanstack/react-router'

import { Authenticated, Unauthenticated, useMutation, useQuery } from 'convex/react'
import { useSession, signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	const { data } = useSession()

	return (

		<div>
			<Authenticated>
				logged in as {data?.user.email}
				<Button onClick={() => {
					signOut()
				}}>Sign out</Button>
			</Authenticated>
			<Unauthenticated>
				logged out
			</Unauthenticated>
		</div>
	)

}