"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import type { PortfolioItem } from "@/lib/portfolio";

type RemoteRow = {
  id: string;
  title: string;
  service: string;
  location: string;
  description: string;
  image_url: string;
  sort_order: number;
  published: boolean;
};

export default function PortfolioGrid({
  seedItems,
  categories,
}: {
  seedItems: PortfolioItem[];
  categories: string[];
}) {
  const [items, setItems] = useState<PortfolioItem[]>(seedItems);
  const [active, setActive] = useState<string>("All");

  // After hydration, merge any items managed in Supabase (adds/edits from /admin/).
  useEffect(() => {
    let alive = true;
    (async () => {
      const supabase = await getSupabase();
      if (!supabase || !alive) return;
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (!alive || error || !data || data.length === 0) return;
        const remote: PortfolioItem[] = (data as RemoteRow[]).map((r) => ({
          id: r.id,
          title: r.title,
          service: r.service,
          location: r.location,
          description: r.description,
          image: r.image_url,
          alt: `${r.title} — ${r.service} project in ${r.location}`,
          sortOrder: r.sort_order + 1000,
          published: r.published,
        }));
        setItems((prev) => {
          const remoteIds = new Set(remote.map((r) => r.id));
          return [...prev.filter((p) => !remoteIds.has(p.id)), ...remote].sort(
            (a, b) => a.sortOrder - b.sortOrder
          );
        });
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filters = useMemo(() => ["All", ...categories], [categories]);
  const visible = useMemo(
    () => items.filter((i) => active === "All" || i.service === active),
    [items, active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by service">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === f
                ? "border-accent-blue bg-accent-blue text-on-accent"
                : "border-ink-700 bg-ink-850 text-slate-300 hover:border-accent-blue/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <figure key={item.id} className="card !p-0 overflow-hidden hover:border-accent-blue/50 hover:shadow-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
            <figcaption className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
                {item.service} · {item.location}
              </p>
              <p className="mt-1 text-base font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
