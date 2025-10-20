/// <reference types="vite/client" />

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import {
  fetchSession,
  getCookieName,
} from "@convex-dev/better-auth/react-start";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import AppSidebar from "@studio/components/sidebar/sidebar";
import { authClient } from "@studio/lib/auth-client";
import appCss from "@studio/styles/app.css?url";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequest } from "@tanstack/react-start/server";
import { SidebarProvider } from "@weaver/ui/components/ui/sidebar";
import type { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { createAuth } = await import("@weaver/backend");
  const { session } = await fetchSession(getRequest());
  const sessionCookieName = getCookieName(createAuth);
  const token = getCookie(sessionCookieName);
  return {
    userId: session?.user.id,
    token,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    // all queries, mutations and action made with TanStack Query will be
    // authenticated by an identity token.
    const { userId, token } = await fetchAuth();

    // During SSR only (the only time serverHttpClient exists),
    // set the auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return { userId, token };
  },
  component: RootComponent,
});

function RootComponent() {
  const context = useRouteContext({ from: Route.id });
  return (
    <ConvexBetterAuthProvider
      authClient={authClient}
      client={context.convexClient}
    >
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ConvexBetterAuthProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="dark" lang="en">
      {/** biome-ignore lint/style/noHeadElement: need it for tabstack start */}
      <head>
        <HeadContent />
      </head>
      <body className="bg-neutral-950 text-neutral-50">
        <main className="flex flex-col">
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </main>

        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
