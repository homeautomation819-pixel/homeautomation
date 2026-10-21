import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="container-site pt-6 text-sm text-slate-400">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-slate-600">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-slate-200">{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:text-white">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
