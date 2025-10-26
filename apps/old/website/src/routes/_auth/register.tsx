import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "@website/pages/register-page";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
  // ssr: false,
});
