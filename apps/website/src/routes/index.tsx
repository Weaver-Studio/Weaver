import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSession } from "@weaver/shared/lib/auth-client";
import { SignInButton, SignOutButton } from "@weaver/ui/components/buttons";
import { Authenticated, Unauthenticated } from "convex/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useSession();
  const router = useRouter();
  return (
    <div className="container flex h-dvh flex-col items-center justify-center">
      <Unauthenticated>
        <div className="flex flex-row items-center gap-2">
          Please sign in to continue
          <SignInButton
            navigateFunction={() => {
              router.navigate({
                to: "/sign-in",
              });
            }}
          />
        </div>
      </Unauthenticated>
      <Authenticated>
        <p>Welcome! {data?.user.email}</p>
        <SignOutButton />
      </Authenticated>
    </div>
  );
}
