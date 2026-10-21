import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Furniture Assembly Quote Toronto",
  description:
    "Get a free furniture assembly quote in Toronto & the GTA. House visits from $199+HST. Call +1 (437) 870-1113 or email info@chriskohomeautomation.com today.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    title: "Contact Chrisko Home Automation — Free Quotes Across the GTA",
    description: "Call, email or send the form. Upfront pricing, insured assemblers, 12-month workmanship warranty.",
    url: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />
      <LastUpdated />
      <section className="section pt-8">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get a Free Furniture Assembly Quote in Toronto
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Ready to get your furniture built? Call us for immediate answers, email your item
              list, or send the form and we'll reply within one business day with a firm quote.
              House visits from $199+HST, downtown condos from $249+HST — no obligation.
            </p>

            <address className="card mt-8 not-italic">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Contact details</p>
              <p className="mt-4 text-lg font-bold text-white">{site.name}</p>
              <p className="mt-2 text-slate-300">{site.locality}, {site.country}</p>
              <p className="mt-4">
                <a href={site.phoneHref} className="text-xl font-semibold text-accent-cyan hover:underline">
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="mt-2">
                <a href={`mailto:${site.email}`} className="text-accent-cyan hover:underline">{site.email}</a>
              </p>
              <p className="mt-4 text-sm text-slate-400">Hours: {site.hours}</p>
            </address>

            <div className="card mt-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Service area</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                We serve Toronto and the entire Greater Toronto Area with free consultations and no
                travel charges:
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3">
                {locations.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}/`} className="text-accent-cyan hover:underline">{l.city}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
