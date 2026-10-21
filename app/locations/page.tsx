import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCard from "@/components/BookingCard";
import LastUpdated from "@/components/LastUpdated";
import CtaBand from "@/components/CtaBand";
import { locations } from "@/lib/locations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Furniture Assembly Service Areas",
  description:
    "Furniture assembly by Chrisko Home Automation across the GTA: Toronto, North York, Scarborough, Mississauga, Vaughan & 7 more cities. Call +1 (437) 870-1113.",
  alternates: { canonical: "/locations/" },
  openGraph: {
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    title: "Furniture Assembly Service Areas Across the GTA",
    description: "Professional furniture assembly across 12 GTA communities — same/next-day availability, no travel charges.",
    url: "/locations/",
  },
};

export default function LocationsIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Service Areas", href: "/locations/" }]} />
      <LastUpdated />
      <section className="section pt-8">
        <div className="container-site">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Furniture Assembly Service Areas Across the GTA
          </h1>
          <div className="mt-5 grid items-start gap-10 lg:grid-cols-2">
          <p className="text-lg leading-relaxed text-slate-300">
            {site.name} assembles furniture across Toronto and the Greater Toronto Area.
            Every community below is part of our core service area — quotes are free, there are
            no travel charges, and every build includes our 12-month workmanship warranty.
            Choose your city for local details, project examples and pricing guidance.
          </p>
            <BookingCard service="Furniture Assembly" />
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}/`} className="card group block transition hover:border-accent-blue/50 hover:shadow-glow">
                  <h2 className="text-xl font-semibold text-white group-hover:text-accent-cyan">
                    Furniture Assembly {l.city}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Furniture assembly in {l.city}: {l.popular.slice(0, 3).join(", ").toLowerCase()} and more.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan">
                    View {l.city} page
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand heading="Don't see your neighbourhood?" body="If you're in the GTA, we almost certainly serve you. Call and ask — quotes are free across the region." />
    </>
  );
}
