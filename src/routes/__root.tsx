import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/dashboard/header'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

const RootLayout = () => (
	<SidebarProvider>
		<div className="flex h-screen w-full">
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className="flex-1 overflow-y-auto p-4 lg:p-6">
					<Outlet />
				</main>
			</SidebarInset>
		</div>
		<TanStackRouterDevtools />
	</SidebarProvider>
)

export const Route = createRootRoute({ component: RootLayout })