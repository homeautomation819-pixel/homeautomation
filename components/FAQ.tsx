import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export type FaqItem = { q: string; a: string };

export default function FAQ({ faqs, heading = "Frequently asked questions" }: { faqs: FaqItem[]; heading?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="section" aria-labelledby="faq-heading">
      <JsonLd data={schema} />
      <div className="container-site max-w-4xl">
        <h2 id="faq-heading" className="h2">{heading}</h2>
        <p className="mt-3 text-slate-400">
          Still have a question? Call us at{" "}
          <a href={site.phoneHref} className="text-accent-cyan hover:underline">{site.phoneDisplay}</a>.
        </p>
        <div className="mt-8 divide-y divide-ink-800 rounded-2xl border border-ink-700/70 bg-ink-900">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex items-center justify-between gap-4 text-base font-semibold text-white">
                {f.q}
                <svg className="faq-chevron h-5 w-5 shrink-0 text-accent-cyan transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
