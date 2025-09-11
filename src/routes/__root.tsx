import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	return (
		<div className="relative flex h-svh overflow-hidden">
			{/* Global subtle gradients behind everything */}
			<div
				className="pointer-events-none absolute inset-0 z-0"
				style={{
					opacity: 1,
					background:
						[
							// Subtle yellow accent glow from bottom-left
							"radial-gradient(1200px 800px at 0% 100%, oklch(0.78 0.14 95 / 0.10), transparent 60%)",
							// Darker middle vignette
							"radial-gradient(900px 700px at 50% 55%, oklch(0.10 0.02 260 / 0.55), transparent 70%)",
							// Same accent glow from top-right
							"radial-gradient(1200px 800px at 100% 0%, oklch(0.78 0.14 95 / 0.08), transparent 60%)",
							// Base backdrop
							"oklch(0.12 0 0)",
						].join(', '),
				}}
			/>
			<div className="relative z-10 flex-1 min-h-0">
				<Outlet />
			</div>
		</div>
	)
}
