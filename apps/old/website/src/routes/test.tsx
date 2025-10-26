import { createFileRoute } from "@tanstack/react-router";
import TestPage from "@website/pages/test-page";

export const Route = createFileRoute("/test")({
  component: TestPage,
});
