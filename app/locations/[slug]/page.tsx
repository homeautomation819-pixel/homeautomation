import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCard from "@/components/BookingCard";
import LastUpdated from "@/components/LastUpdated";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { locations, locationFaqs, type Location } from "@/lib/locations";
import { services } from "@/lib/services";
import { site, trustBadges, whyChooseUs, processSteps } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

function getLoc(slug: string): Location {
  const l = locations.find((loc) => loc.slug === slug);
  if (!l) notFound();
  return l;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLoc(slug);
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    alternates: { canonical: `/locations/${l.slug}/` },
    openGraph: {
      title: l.h1,
      description: l.metaDescription,
      url: `/locations/${l.slug}/`,
      images: [{ url: l.heroImage.src, width: 1600, height: 900 }],
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLoc(slug);
  const popularServices = services.filter((s) => l.popular.includes(s.shortName));
  const otherLocations = locations.filter((loc) => loc.slug !== l.slug).slice(0, 5);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Furniture Assembly Services in ${l.city}`,
        description: l.metaDescription,
        url: `${site.url}/locations/${l.slug}/`,
        provider: { "@id": `${site.url}/#localbusiness` },
        areaServed: { "@type": "City", name: l.city },
      }} />
      <Breadcrumbs items={[{ name: "Service Areas", href: "/locations/" }, { name: l.city, href: `/locations/${l.slug}/` }]} />
      <LastUpdated />

      {/* Hero */}
      <section className="hero-glow border-b border-ink-800">
        <div className="container-site grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{l.h1}</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{l.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary">Call {site.phoneDisplay}</a>
              <Link href="/contact/" className="btn-amber">Get a Free Quote</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {trustBadges.map((b) => (
                <li key={b} className="badge">
                  <svg className="h-4 w-4 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Image
              src={l.heroImage.src}
              alt={l.heroImage.alt}
              width={1600}
              height={900}
              priority
              fetchPriority="high"
              className="rounded-2xl border border-ink-700 shadow-glow"
            />
            <BookingCard service="Furniture Assembly" location={l.city} />
          </div>
        </div>
      </section>

      {/* Local housing section */}
      <section className="section">
        <div className="container-site max-w-4xl prose-site">
          <h2 className="h2 !text-3xl">{l.housingTitle}</h2>
          {l.housing.map((p, i) => <p key={i} className="mt-4">{p}</p>)}
          <h3>Popular furniture assembly services in {l.city}</h3>
          <ul>
            {popularServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="text-accent-cyan hover:underline">{s.shortName}</Link>
                {" "}— {s.metaDescription.split(".")[0].split(":")[0].replace(/^[^:]*: /, "")}.
              </li>
            ))}
          </ul>
          <h3>Pricing for {l.city} projects</h3>
          <p>
            House visits in {l.city} start at $199+HST and downtown condo visits at $249+HST,
            covering most single large items like a bed, dresser or desk. Multi-item visits — a full
            bedroom set, a home office or a whole-house move-in — are quoted firmly upfront based on
            your item list, access and parking, typically $350–$600 for a full room. The price we
            quote is the price you pay, approved in writing before we schedule anything.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="process-heading">
        <div className="container-site">
          <h2 id="process-heading" className="h2">How assembly works in {l.city}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title} className="card">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue font-bold text-on-accent shadow-glow">{i + 1}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section border-t border-ink-800" aria-labelledby="why-heading">
        <div className="container-site">
          <h2 id="why-heading" className="h2">Why {l.city} homeowners choose Chrisko</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w) => (
              <div key={w.title} className="card">
                <h3 className="text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery items={l.galleryCaptions} heading={`Recent projects in ${l.city}`} />

      <FAQ faqs={locationFaqs(l.city)} heading={`Furniture assembly FAQs — ${l.city}`} />

      {/* Nearby areas */}
      <section className="section border-t border-ink-800" aria-labelledby="nearby-heading">
        <div className="container-site">
          <h2 id="nearby-heading" className="h2 !text-2xl">We also serve</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {otherLocations.map((o) => (
              <li key={o.slug}>
                <Link href={`/locations/${o.slug}/`} className="badge transition hover:border-accent-blue/60 hover:text-white">
                  Furniture Assembly {o.city}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations/" className="badge transition hover:border-accent-blue/60 hover:text-white">
                All service areas
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand heading={`Book furniture assembly in ${l.city}`} body={`Talk to a local assembler about your ${l.city} home — honest quotes, upfront pricing and a 12-month workmanship warranty.`} />
    </>
  );
}
