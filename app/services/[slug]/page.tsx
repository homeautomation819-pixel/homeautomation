import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { services, type Service } from "@/lib/services";
import { site, whyChooseUs, processSteps } from "@/lib/site";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

function getService(slug: string): Service {
  const s = services.find((svc) => svc.slug === slug);
  if (!s) notFound();
  return s;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: {
      title: s.h1,
      description: s.metaDescription,
      url: `/services/${s.slug}/`,
      images: [{ url: s.heroImage, width: 1600, height: 900 }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  const related = services.filter((svc) => svc.slug !== s.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={serviceSchema({ name: `${s.shortName} in Toronto & the GTA`, description: s.metaDescription, path: `/services/${s.slug}/` })} />
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }, { name: s.shortName, href: `/services/${s.slug}/` }]} />
      <LastUpdated />
      <PageHero title={s.h1} intro={s.heroIntro} image={s.heroImage} imageAlt={s.heroImageAlt} bookingService={s.shortName} lockService />

      {/* Details sections */}
      <section className="section">
        <div className="container-site max-w-4xl prose-site">
          {s.sections.map((sec) => (
            <div key={sec.h2} className="mb-10">
              <h2 className="h2 !text-3xl">{sec.h2}</h2>
              {sec.paragraphs.map((p, i) => <p key={i} className="mt-4">{p}</p>)}
              {sec.list && (
                <ul className="mt-4">
                  {sec.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {sec.subsections?.map((sub) => (
                <div key={sub.h3}>
                  <h3>{sub.h3}</h3>
                  {sub.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Feature row */}
      <section className="section border-t border-ink-800">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="kicker">Done right, start to finish</p>
            <h2 className="h2 mt-2 !text-3xl">Built clean. Built to last.</h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Every {s.shortName.toLowerCase()} job is delivered by our own insured crew — parts
              inventoried before we start, floors and walls protected, professional tools with
              torque control, and tall furniture anchored to studs as standard. Before we leave,
              we walk through every door, drawer and joint with you.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              And because our work carries a written 12-month workmanship warranty, you have one
              accountable local team to call long after build day.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary">Call {site.phoneDisplay}</a>
              <Link href="/projects/" className="btn-outline">See recent projects</Link>
            </div>
          </div>
          <Image
            src={s.featureImage.src}
            alt={s.featureImage.alt}
            width={1600}
            height={900}
            loading="lazy"
            className="order-1 rounded-2xl border border-ink-700 shadow-glow lg:order-2"
          />
        </div>
      </section>

      {/* External authority resources */}
      <section className="section border-t border-ink-800 !py-10" aria-labelledby="resources-heading">
        <div className="container-site max-w-4xl">
          <h2 id="resources-heading" className="h2 !text-2xl">Helpful resources</h2>
          <ul className="mt-4 space-y-2">
            {s.resources.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">
                  {r.label}
                </a>
                <span className="text-slate-500"> (external resource)</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="benefits-heading">
        <div className="container-site">
          <h2 id="benefits-heading" className="h2">Benefits of professional {s.shortName.toLowerCase()}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.benefits.map((b) => (
              <div key={b.title} className="card">
                <h3 className="text-base font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common problems */}
      <section className="section border-t border-ink-800" aria-labelledby="problems-heading">
        <div className="container-site">
          <h2 id="problems-heading" className="h2">Common problems we solve</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {s.problems.map((p) => (
              <div key={p.title} className="card flex gap-4">
                <svg className="mt-1 h-6 w-6 shrink-0 text-accent-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <h3 className="text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-ink-800 bg-ink-900/60" aria-labelledby="process-heading">
        <div className="container-site">
          <h2 id="process-heading" className="h2">Our assembly process</h2>
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
          <h2 id="why-heading" className="h2">Why choose {site.name}</h2>
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

      <Gallery items={s.gallery} heading={`Recent ${s.shortName.toLowerCase()} projects`} />

      <FAQ faqs={s.faqs} heading={`${s.shortName} FAQs`} />

      {/* Related services */}
      <section className="section border-t border-ink-800" aria-labelledby="related-heading">
        <div className="container-site">
          <h2 id="related-heading" className="h2 !text-2xl">Related assembly services</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}/`} className="card block !p-4 text-sm font-semibold text-white transition hover:border-accent-blue/50 hover:text-accent-cyan">
                  {r.shortName} in Toronto
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand defaultService={s.shortName} heading={`Get a free ${s.shortName.toLowerCase()} quote`} body="Call now or send the form — upfront pricing, a fully insured crew, and a 12-month workmanship warranty on every job." />
    </>
  );
}
