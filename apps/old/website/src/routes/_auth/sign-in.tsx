import { createFileRoute } from "@tanstack/react-router";
import SignInPage from "@website/pages/sign-in-page";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignInPage,
  // ssr: false,
});
