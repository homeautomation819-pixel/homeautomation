import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export default function CtaBand({
  heading = "Ready to get it built?",
  body = "Get a firm, upfront quote from a fully insured local crew. Call now or send the form — we reply within one business day.",
  defaultService,
}: {
  heading?: string;
  body?: string;
  defaultService?: string;
}) {
  return (
    <section className="section border-t border-ink-800 bg-ink-900/60">
      <div className="container-site grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h2 className="h2">{heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn-primary">
              Call {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="btn-outline">
              {site.email}
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Hours: {site.hours} · Serving {site.areaServed.slice(0, 6).join(", ")} and the rest of the GTA.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Looking for our full list of services?{" "}
            <Link href="/services/" className="text-accent-cyan hover:underline">
              Browse all assembly services
            </Link>
            .
          </p>
        </div>
        <QuoteForm defaultService={defaultService} />
      </div>
    </section>
  );
}
