"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getSupabase } from "@/lib/supabase";

// Shared one-shot fetch of site_content overrides; cached at module scope.
let overridesPromise: Promise<Record<string, string>> | null = null;

function loadOverrides(): Promise<Record<string, string>> {
  if (!overridesPromise) {
    overridesPromise = (async () => {
      const supabase = await getSupabase();
      if (!supabase) return {};
      try {
        const { data, error } = await supabase.from("site_content").select("key, value");
        if (error || !data) return {};
        return Object.fromEntries(data.map((row) => [row.key as string, row.value as string]));
      } catch {
        return {};
      }
    })();
  }
  return overridesPromise;
}

export function useContentOverrides(): Record<string, string> {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  useEffect(() => {
    let alive = true;
    loadOverrides().then((o) => {
      if (alive) setOverrides(o);
    });
    return () => {
      alive = false;
    };
  }, []);
  return overrides;
}

/**
 * Renders the build-time default text immediately (static HTML), then swaps in
 * the Supabase site_content override after hydration if one exists.
 */
export default function EditableText({
  contentKey,
  defaultValue,
  as: Tag = "span",
  className,
}: {
  contentKey: string;
  defaultValue: string;
  as?: "span" | "h1" | "h2" | "p" | "div";
  className?: string;
}) {
  const overrides = useContentOverrides();
  const value = overrides[contentKey] ?? defaultValue;
  return <Tag className={className}>{value as ReactNode}</Tag>;
}
