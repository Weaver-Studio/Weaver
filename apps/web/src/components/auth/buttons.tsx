import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";


function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}

function SignInButton() {
  const router = useRouter()
  return <Button onClick={() => router.navigate({ to: "/sign-in" })}>Sign in</Button>
}

export { SignOutButton, SignInButton }