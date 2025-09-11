import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthKitProvider, useAuth } from "@workos-inc/authkit-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuthKit } from "@convex-dev/workos";
import "./styles/globals.css";
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'


// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}


const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const workosClientId = import.meta.env.VITE_WORKOS_CLIENT_ID as string | undefined;
const workosRedirectUri = import.meta.env.VITE_WORKOS_REDIRECT_URI as string | undefined;

const hasConvex = Boolean(convexUrl);
const hasAuth = Boolean(workosClientId && workosRedirectUri);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{hasConvex && hasAuth ? (
			<AuthKitProvider clientId={workosClientId as string} redirectUri={workosRedirectUri as string}>
				<ConvexProviderWithAuthKit client={new ConvexReactClient(convexUrl as string)} useAuth={useAuth}>
					<RouterProvider router={router} />
					<TanStackRouterDevtools router={router} position="top-left" />
				</ConvexProviderWithAuthKit>
			</AuthKitProvider>
		) : (
			<>
				<RouterProvider router={router} />
				<TanStackRouterDevtools router={router} />
			</>
		)}
	</StrictMode>,
);