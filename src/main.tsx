import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthKitProvider, useAuth } from '@workos-inc/authkit-react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithAuthKit } from './ConvexProviderWithAuthKit';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);


// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary>
			<AuthKitProvider
				clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
				redirectUri={import.meta.env.VITE_WORKOS_REDIRECT_URI}
			>
				<ConvexProviderWithAuthKit client={convex} useAuth={useAuth}>
					<RouterProvider router={router} />
					<TanStackRouterDevtools router={router} />
				</ConvexProviderWithAuthKit>
			</AuthKitProvider>
		</ErrorBoundary>
	</StrictMode>,
);
