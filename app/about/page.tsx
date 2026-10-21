import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import CtaBand from "@/components/CtaBand";
import BookingCard from "@/components/BookingCard";
import { site, whyChooseUs, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Toronto Assembly Team",
  description:
    "Meet Chrisko Home Automation: insured Toronto furniture assemblers with upfront pricing, a 12-month warranty & white-glove care. Call +1 (437) 870-1113 today.",
  alternates: { canonical: "/about/" },
  openGraph: {
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    title: "About Chrisko Home Automation",
    description: "An insured, accountable local furniture assembly team serving Toronto & the GTA.",
    url: "/about/",
  },
};

const guarantees = [
  { title: "Fully insured on every job", body: "We carry $2M liability insurance — and we'll issue a certificate to your condo property manager or office building on request." },
  { title: "12-month workmanship warranty", body: "Our assembly quality is covered in writing for a full year. A hinge loosens or a panel shifts because of our work — we come back and fix it." },
  { title: "Firm written quotes", body: "The price we quote is the price you pay. No hourly meters, no on-site surprises, no add-ons you didn't approve." },
  { title: "Our own trained assemblers", body: "The people in your home are background-checked members of our crew — not gig workers we've never met." },
  { title: "White-glove care", body: "Floor and wall protection, quiet professional tools, anti-tip anchoring on tall furniture, and packaging broken down before we leave." },
  { title: "Honest advice over bigger invoices", body: "If your job is smaller than you think, we tell you. Referrals across the GTA are worth more than one padded quote." },
  { title: "Support after build day", body: "A full completion check before we leave, and a local phone number that gets answered afterwards. That's the point of hiring local." },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", href: "/about/" }]} />
      <LastUpdated />
      <section className="section pt-8">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div className="prose-site">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About Chrisko Home Automation
            </h1>
            <p className="mt-6 text-lg">
              {site.name} is a Toronto-based furniture assembly company serving the Greater Toronto
              Area. Despite the name, what we do is refreshingly simple: we build furniture,
              properly. Beds, wardrobes, dining sets, offices, home gyms and gazebos — assembled by
              people who do it every day, with the right tools and zero corner-cutting.
            </p>
            <p>
              We started with a simple observation: Toronto households were losing weekends to
              flat-pack instructions, stripping cam locks on expensive furniture, and leaving tall
              dressers unanchored. Meanwhile the alternative — random gig apps — meant strangers
              with unknown skills and no insurance. We built the company we wanted to hire: trained
              local assemblers, $2M insurance, firm written quotes and a real warranty.
            </p>
            <p>
              Today we assemble furniture in downtown condos, post-war family homes and new builds
              across{" "}
              <Link href="/locations/" className="text-accent-cyan hover:underline">12 GTA communities</Link>{" "}
              — from single MALM beds to whole-house move-ins, office fit-outs with COIs, and
              hardtop gazebos built in a day. Every job follows the same standard, whether it's a
              $199 visit or a full commercial rollout.
            </p>
            <h2 className="h2 !text-3xl mt-12">Our service standards</h2>
            <p>
              Standards only matter if they're specific. These are the seven commitments behind
              every quote we issue:
            </p>
          </div>
          <div>
            <Image
              src="/images/furniture-assembly-team-toronto.webp"
              alt="Chrisko Home Automation assemblers' professional tools ready for a Toronto build"
              width={1600}
              height={900}
              priority
              className="rounded-2xl border border-ink-700 shadow-glow"
            />
            <div className="mt-6">
              <BookingCard service="Furniture Assembly" />
            </div>
            <div className="card mt-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Contact us</p>
              <address className="mt-3 not-italic leading-relaxed text-slate-300">
                {site.locality}, {site.country}<br />
                <a href={site.phoneHref} className="text-accent-cyan hover:underline">{site.phoneDisplay}</a><br />
                <a href={`mailto:${site.email}`} className="text-accent-cyan hover:underline">{site.email}</a><br />
                Hours: {site.hours}
              </address>
            </div>
          </div>
        </div>

        <div className="container-site mt-10">
          <ol className="grid gap-6 md:grid-cols-2">
            {guarantees.map((g, i) => (
              <li key={g.title} className="card flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-amber text-lg font-bold text-on-accent shadow-glow-amber">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{g.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="process-heading">
        <div className="container-site">
          <h2 id="process-heading" className="h2">How we work, start to finish</h2>
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

      <section className="section border-t border-ink-800" aria-labelledby="why-heading">
        <div className="container-site">
          <h2 id="why-heading" className="h2">Why GTA households choose us</h2>
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

      <CtaBand heading="Talk to the team directly" body="No call centre, no runaround — you'll speak with people who actually assemble furniture across the GTA every day." />
    </>
  );
}
