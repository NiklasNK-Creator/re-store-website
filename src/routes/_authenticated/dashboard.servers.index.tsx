import { createFileRoute } from "@tanstack/react-router";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/_authenticated/dashboard/servers/")({
  component: () => (
    <div className="p-10 max-w-4xl">
      <h1 className="font-display text-4xl">Servers</h1>
      <p className="mt-3 text-muted-foreground">Use the overview page to browse and pick a server.</p>
    </div>
  ),
});
