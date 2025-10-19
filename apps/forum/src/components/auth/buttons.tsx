import { Button } from "@weaver/ui/components/ui/button";
import { signIn, signOut } from "@forum/lib/auth-client";

export function SignInButton() {
  return <Button onClick={() => signIn("github")}>Sign In</Button>;
}

export function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
