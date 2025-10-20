import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@weaver/ui/components/ui/button";
import { Authenticated, Unauthenticated } from "convex/react";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <Authenticated>
        <div>Authenticated</div>
        <Button>Button</Button>
      </Authenticated>
      <Unauthenticated>
        <div>Unauthenticated</div>
      </Unauthenticated>
    </>
  ),
});
