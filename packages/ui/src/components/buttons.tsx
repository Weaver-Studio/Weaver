import { signOut } from "@weaver/shared/lib/auth-client";
import { Button } from "@weaver/ui/components/ui/button";

function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}

function SignInButton({ navigateFunction }: { navigateFunction: () => void }) {
  return <Button onClick={navigateFunction}>Sign in</Button>;
}

export { SignOutButton, SignInButton };
