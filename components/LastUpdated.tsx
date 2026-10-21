import { lastUpdatedDisplay } from "@/lib/site";

export default function LastUpdated() {
  return (
    <p className="container-site pt-4 text-sm text-slate-500">
      Last updated: {lastUpdatedDisplay}
    </p>
  );
}
