import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCard from "@/components/BookingCard";
import LastUpdated from "@/components/LastUpdated";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Furniture Assembly Service Toronto",
  description:
    "Furniture assembly services in Toronto: home & IKEA furniture, offices, fitness equipment, gazebos, TV mounting & beds. Free quotes: +1 (437) 870-1113 today.",
  alternates: { canonical: "/services/" },
  openGraph: {
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    title: "Furniture Assembly Services in Toronto & the GTA",
    description: "Home and IKEA furniture, office fit-outs, fitness equipment, gazebos, TV mounting, wardrobes and beds — built by one insured local crew.",
    url: "/services/",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }]} />
      <LastUpdated />
      <section className="section pt-8">
        <div className="container-site">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Furniture Assembly Services in Toronto &amp; the GTA
          </h1>
          <div className="mt-5 grid items-start gap-10 lg:grid-cols-2">
          <p className="text-lg leading-relaxed text-slate-300">
            From a single bed frame to a whole-house move-in, {site.name} assembles furniture
            across Toronto and the Greater Toronto Area. Every service below is delivered by our own
            insured crew with upfront written pricing and a 12-month workmanship warranty.
          </p>
            <BookingCard service="Furniture Assembly" />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="card group transition hover:border-accent-blue/50 hover:shadow-glow">
                <h2 className="text-xl font-semibold text-white group-hover:text-accent-cyan">{s.shortName}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.metaDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan">
                  Explore this service
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand heading="Not sure which service fits your items?" body="Tell us what needs building — we'll recommend the right crew and give you a firm upfront price. Same/next-day availability across the GTA." />
    </>
  );
}
