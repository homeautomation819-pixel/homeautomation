import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import EditableText from "@/components/EditableText";
import BookingCard from "@/components/BookingCard";
import { site, brands, trustBadges, whyChooseUs, processSteps } from "@/lib/site";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Furniture Assembly Toronto | Chrisko Home Automation",
  description:
    "Furniture assembly in Toronto & the GTA: IKEA, Wayfair, beds, wardrobes, gazebos & TV mounting. $2M insured, upfront pricing from $199+HST. +1 (437) 870-1113.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Furniture Assembly Services in Toronto & the GTA",
    description: site.tagline,
    url: "/",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const reviews = [
  {
    name: "Daniel M.",
    location: "North York",
    text: "They built our three-frame PAX with sliding doors in one afternoon — perfectly square, doors glide silently, everything anchored. Worth every dollar of the quote, which didn't change by a cent.",
  },
  {
    name: "Priya S.",
    location: "Mississauga",
    text: "Full condo move-in: bed, sofa, dining set and desk done in a single day. They booked the elevator, protected everything, and took every box. Our place felt like home by dinner.",
  },
  {
    name: "Mark & Elaine T.",
    location: "Vaughan",
    text: "Our hardtop gazebo had been in boxes since May. Their crew built and anchored it in a day — the frame is dead square and the roof panels seated perfectly. Should have called in April.",
  },
  {
    name: "Jordan K.",
    location: "Scarborough",
    text: "Two bunk beds and three dressers for the kids, all anchored, in one visit. They checked every guardrail and bolt twice. As a parent, that attention to safety is everything.",
  },
  {
    name: "Sofia R.",
    location: "Oakville",
    text: "I started the MALM dresser myself and gave up at step 20. They finished it, fixed my mistakes, anchored it to the wall and didn't laugh at me once. True professionals.",
  },
  {
    name: "Andrew L.",
    location: "Toronto",
    text: "Booked next-day for a treadmill delivery. They assembled, levelled and calibrated it, and it runs quieter than the showroom model did. On time to the minute, too.",
  },
];

const homeFaqs = [
  {
    q: "How much does furniture assembly cost in Toronto?",
    a: "House visits start at $199+HST and downtown condo visits at $249+HST, covering most single large items like a bed, dresser or desk. Multi-item visits are quoted firmly upfront — typically $350–$600 for a full room. The price we quote is the price you pay.",
  },
  {
    q: "Which areas do you serve?",
    a: "We serve Toronto and the entire Greater Toronto Area: North York, Scarborough, Etobicoke, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Ajax and Whitby. No travel charges anywhere in our service area.",
  },
  {
    q: "What furniture brands do you assemble?",
    a: "All of them — IKEA (PAX, MALM, BILLY, BESTÅ, HEMNES, SEKTION), Wayfair, Structube, Cozey, West Elm, Costco, Amazon, CB2, EQ3, Article and more. If it arrives flat-packed with instructions, we build it.",
  },
  {
    q: "Are you insured, and do you warranty your work?",
    a: "Yes on both. We carry $2M liability insurance — certificates available for condo property managers — and every assembly includes a written 12-month workmanship warranty. If our work needs attention, we come back and make it right.",
  },
  {
    q: "How fast can you come out?",
    a: "Same-day and next-day appointments are available across most of the GTA. Call +1 (437) 870-1113 with your item list and we'll find the earliest window, including evenings and Saturdays.",
  },
  {
    q: "Do you take away the boxes and packaging?",
    a: "We break down all cardboard and packaging and stack it neatly for your recycling pickup at no charge. Full haul-away can be arranged for a small fee where buildings require it.",
  },
  {
    q: "Will you anchor my furniture to the wall?",
    a: "Yes — anti-tip anchoring to studs is included for dressers, wardrobes, bookcases and other tall items. It's a safety essential in homes with children, and we never skip it.",
  },
  {
    q: "What if parts are missing or damaged?",
    a: "We do a full parts inventory before assembly and flag issues immediately — with photos and exact part numbers for your reorder. We carry common spare hardware, and return visits to finish a build are discounted.",
  },
  {
    q: "Can you take over an assembly I started myself?",
    a: "Absolutely — partial DIY rescues are some of our most common calls. We assess what's done, safely correct any mistakes, and finish the build at standard rates. No judgment, ever.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden border-b border-ink-800">
        <div className="container-site grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="kicker">Toronto &amp; the Greater Toronto Area</p>
            <EditableText
              as="h1"
              contentKey="home_hero_headline"
              defaultValue="Furniture Assembly Services in Toronto & the GTA"
              className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            />
            <EditableText
              as="p"
              contentKey="home_hero_subheadline"
              defaultValue="Beds, wardrobes, dining sets, offices, home gyms and gazebos — assembled by one fully insured local crew with professional tools. Upfront pricing from $199+HST, packaging removed, and a 12-month workmanship warranty on every build."
              className="mt-6 text-lg leading-relaxed text-slate-300"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary">Call {site.phoneDisplay}</a>
              <Link href="/contact/" className="btn-amber">Get a Free Quote</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {trustBadges.map((b) => (
                <li key={b} className="badge">
                  <svg className="h-4 w-4 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <Image
              src="/images/furniture-assembly-toronto-hero.webp"
              alt="Professionally assembled living room furniture in a Toronto home"
              width={1600}
              height={900}
              priority
              fetchPriority="high"
              className="rounded-2xl border border-ink-700 shadow-glow"
            />
            <BookingCard service="Furniture Assembly" allowServiceSelect />
          </div>
        </div>
      </section>

      {/* Stat band with animated counters */}
      <section className="border-b border-ink-800 bg-ink-900/60" aria-label="Company statistics">
        <div className="container-site grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {[
            { value: 2500, suffix: "+", label: "furniture items assembled" },
            { value: 12, suffix: "", label: "GTA cities served" },
            { value: 5, suffix: "★", label: "average client rating" },
            { value: 12, suffix: "-mo", label: "workmanship warranty" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-accent-blue sm:text-5xl">
                <span data-count={s.value} data-suffix={s.suffix}>{s.value}{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm font-medium text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid — each card with a real photo */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-site">
          <p className="kicker">What we assemble</p>
          <h2 id="services-heading" className="h2 mt-2">Furniture assembly services across the GTA</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="card group !p-0 overflow-hidden transition hover:border-accent-blue/50 hover:shadow-glow hover:-translate-y-1">
                <Image
                  src={s.heroImage}
                  alt={s.heroImageAlt}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent-cyan">{s.shortName}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.metaDescription.split(":")[0]}.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan">
                    Learn more
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="reviews-heading">
        <div className="container-site">
          <p className="kicker">Client feedback</p>
          <h2 id="reviews-heading" className="h2 mt-2">What GTA homeowners say</h2>
          <p className="mt-3 text-sm text-slate-500">Review excerpts from recent assembly clients.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <blockquote key={r.name} className="card hover:border-accent-blue/40">
                <div className="flex gap-1 text-accent-amber" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                  ))}
                </div>
                {i < 3 ? (
                  <>
                    <EditableText
                      as="p"
                      contentKey={`testimonial_${i + 1}_text`}
                      defaultValue={`\u201C${r.text}\u201D`}
                      className="mt-4 text-sm leading-relaxed text-slate-300"
                    />
                    <EditableText
                      as="div"
                      contentKey={`testimonial_${i + 1}_author`}
                      defaultValue={`${r.name} · ${r.location}`}
                      className="mt-4 text-sm font-semibold text-white"
                    />
                  </>
                ) : (
                  <>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">&ldquo;{r.text}&rdquo;</p>
                    <footer className="mt-4 text-sm font-semibold text-white">
                      {r.name} <span className="font-normal text-slate-500">· {r.location}</span>
                    </footer>
                  </>
                )}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <Gallery
        heading="Recent assembly projects across the GTA"
        items={[
          { src: "/images/pax-wardrobe-assembly-north-york.webp", alt: "IKEA PAX wardrobe wall assembled in North York", caption: "PAX wardrobe wall — North York" },
          { src: "/images/gazebo-assembly-richmond-hill.webp", alt: "Hardtop gazebo assembled in Richmond Hill", caption: "Hardtop gazebo — Richmond Hill" },
          { src: "/images/treadmill-assembly-toronto-condo.webp", alt: "Treadmill assembled in a downtown Toronto condo", caption: "Treadmill setup — Downtown Toronto condo" },
          { src: "/images/office-cubicle-assembly-mississauga.webp", alt: "Office workstations assembled in Mississauga", caption: "12-station office rollout — Mississauga" },
          { src: "/images/kids-bunk-bed-scarborough.webp", alt: "Bunk bed assembled in a Scarborough kids room", caption: "Kids' bunk beds — Scarborough" },
          { src: "/images/tv-mount-above-fireplace-gta.webp", alt: "TV mounted above fireplace in Etobicoke", caption: "Above-fireplace TV mount — Etobicoke" },
        ]}
      />
      <div className="container-site pb-4">
        <Link href="/projects/" className="btn-outline">View all projects</Link>
      </div>

      {/* Why choose us */}
      <section className="section border-t border-ink-800" aria-labelledby="why-heading">
        <div className="container-site">
          <p className="kicker">Why Chrisko</p>
          <h2 id="why-heading" className="h2 mt-2">An assembly company you can hold accountable</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyChooseUs.slice(0, 3).map((w) => (
              <div key={w.title} className="card hover:border-accent-blue/40">
                <h3 className="text-lg font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="process-heading">
        <div className="container-site">
          <p className="kicker">How it works</p>
          <h2 id="process-heading" className="h2 mt-2">From boxes to built, in four steps</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.slice(0, 4).map((step, i) => (
              <li key={step.title} className="card relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue text-lg font-bold text-on-accent shadow-glow">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing guidance */}
      <section className="section border-t border-ink-800" aria-labelledby="pricing-heading">
        <div className="container-site">
          <p className="kicker">Upfront pricing</p>
          <h2 id="pricing-heading" className="h2 mt-2">Honest prices before we ever arrive</h2>
          <EditableText
            as="p"
            contentKey="home_pricing_blurb"
            defaultValue="No hourly meters, no surprises. You approve a firm written quote based on your item list before anything is booked — and the number doesn't change on site."
            className="mt-4 max-w-3xl leading-relaxed text-slate-300"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "House visits", range: "from $199+HST", note: "Covers most single large items: beds, dressers, desks, sofas and more." },
              { label: "Downtown condo visits", range: "from $249+HST", note: "Elevator bookings, building rules and longer carries — all handled." },
              { label: "Full room builds", range: "$350–$600", note: "Bedroom sets, home offices and multi-item visits, project-quoted." },
              { label: "IKEA PAX wardrobes", range: "$250–$450", note: "Squared, levelled, anchored, doors aligned — interiors included." },
              { label: "Hardtop gazebos", range: "$600–$1,200", note: "Levelled, anchored and sealed — built in a day by a two-person crew." },
              { label: "TV wall mounting", range: "$149–$299", note: "Drywall, brick or concrete, with cable concealment options." },
            ].map((p) => (
              <div key={p.label} className="card hover:border-accent-amber/50">
                <p className="text-sm font-medium text-slate-400">{p.label}</p>
                <p className="mt-1 text-2xl font-bold text-accent-amber">{p.range}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Want per-item detail? Read our{" "}
            <Link href="/blog/furniture-assembly-cost-toronto/" className="text-accent-cyan hover:underline">
              2026 furniture assembly cost guide for Toronto
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Brands marquee */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="brands-heading">
        <div className="container-site text-center">
          <p className="kicker">Brands we assemble</p>
          <h2 id="brands-heading" className="h2 mt-2">Every flat-pack brand, mastered</h2>
        </div>
        <div className="marquee mt-10" aria-hidden="false">
          <div className="marquee-track">
            {[...brands, ...brands].map((b, i) => (
              <span key={`${b}-${i}`} className="badge !px-6 !py-3 text-base whitespace-nowrap">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments band */}
      <section className="section border-t border-ink-800" aria-labelledby="commitments-heading">
        <div className="container-site">
          <p className="kicker">Our commitments</p>
          <h2 id="commitments-heading" className="h2 mt-2">What every single visit includes</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "12-month warranty", body: "Written workmanship warranty on every assembly." },
              { title: "On-time promise", body: "We arrive in the window we promised — or you hear from us first." },
              { title: "Clean space", body: "Packaging broken down, work area vacuumed, room left ready." },
              { title: "Full protection", body: "Floor, wall and corner protection in every work area." },
              { title: "Completion check", body: "We walk through every door, drawer and joint with you." },
            ].map((c) => (
              <div key={c.title} className="card text-center hover:border-accent-blue/40">
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="area-heading">
        <div className="container-site">
          <p className="kicker">Service area</p>
          <h2 id="area-heading" className="h2 mt-2">Serving Toronto &amp; the Greater Toronto Area</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">
            Our assemblers are on the road across the GTA every day. Same/next-day appointments and
            no travel charges anywhere in our service area.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}/`} className="card block !p-4 text-center text-sm font-semibold text-white transition hover:border-accent-blue/50 hover:text-accent-cyan">
                  Furniture Assembly {l.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote form */}
      <section className="section border-t border-ink-800" aria-labelledby="quote-heading">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">Free quote</p>
            <h2 id="quote-heading" className="h2 mt-2">Tell us what needs building</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Call us or send the form with your item list — product links or IKEA article names get
              you the most exact quote. We reply within one business day with a firm price.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary">Call {site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`} className="btn-outline">{site.email}</a>
            </div>
            <p className="mt-4 text-sm text-slate-400">Hours: {site.hours}</p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Furniture Assembly Services in Toronto & the GTA",
        url: site.url + "/",
        description: site.tagline,
      }} />

      <FAQ faqs={homeFaqs} heading="Furniture assembly FAQs" />
    </>
  );
}
