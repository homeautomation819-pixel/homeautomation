"use client";

import { useRef, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { site, whatsappUrl } from "@/lib/site";
import { services } from "@/lib/services";

type Status = "idle" | "sending" | "success" | "error" | "whatsapp";

export default function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const lastSummary = useRef<string>("");

  function collectSummary(form: FormData): string {
    return [
      "New quote request — Chrisko Home Automation",
      `Name: ${String(form.get("name") ?? "")}`,
      `Phone: ${String(form.get("phone") ?? "")}`,
      `Email: ${String(form.get("email") ?? "")}`,
      `Service: ${String(form.get("service") ?? "")}`,
      `City/Area: ${String(form.get("location") ?? "")}`,
      `Details: ${String(form.get("message") ?? "")}`,
    ].join("\n");
  }

  function forwardToWhatsApp(summary: string) {
    window.open(whatsappUrl(summary), "_blank", "noopener,noreferrer");
    setStatus("whatsapp");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const summary = collectSummary(form);
    lastSummary.current = summary;

    if (!isSupabaseConfigured) {
      forwardToWhatsApp(summary);
      return;
    }
    const supabase = await getSupabase();
    if (!supabase) {
      forwardToWhatsApp(summary);
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("quote_requests").insert({
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      service: String(form.get("service") ?? ""),
      location: String(form.get("location") ?? ""),
      message: String(form.get("message") ?? ""),
    });
    setStatus(error ? "error" : "success");
  }

  if (status === "success" || status === "whatsapp") {
    return (
      <div className="card text-center">
        {status === "success" ? (
          <>
            <h3 className="text-xl font-semibold text-white">Thanks — request received!</h3>
            <p className="mt-3 text-slate-300">
              We&apos;ll contact you within one business day. Need us sooner? Call{" "}
              <a href={site.phoneHref} className="font-semibold text-accent-cyan">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-white">Opening WhatsApp to send your request…</h3>
            <p className="mt-3 text-slate-300">
              If it didn&apos;t open, call{" "}
              <a href={site.phoneHref} className="font-semibold text-accent-cyan">{site.phoneDisplay}</a> or{" "}
              <button
                type="button"
                onClick={() => forwardToWhatsApp(lastSummary.current)}
                className="font-semibold text-accent-cyan hover:underline"
              >
                tap here to try again
              </button>
              .
            </p>
          </>
        )}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-ink-700 bg-ink-850 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent-blue focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-xl font-semibold text-white">Request your free quote</h3>
      <p className="mt-2 text-sm text-slate-400">
        Tell us about your project — we reply within one business day with upfront pricing.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className="mb-1 block text-sm font-medium text-slate-300">Name *</label>
          <input id="qf-name" name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="qf-phone" className="mb-1 block text-sm font-medium text-slate-300">Phone</label>
          <input id="qf-phone" name="phone" type="tel" className={inputClass} placeholder="(437) 555-0100" />
        </div>
        <div>
          <label htmlFor="qf-email" className="mb-1 block text-sm font-medium text-slate-300">Email *</label>
          <input id="qf-email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="qf-location" className="mb-1 block text-sm font-medium text-slate-300">City / Area</label>
          <input id="qf-location" name="location" className={inputClass} placeholder="e.g. North York" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qf-service" className="mb-1 block text-sm font-medium text-slate-300">Service</label>
          <select id="qf-service" name="service" defaultValue={defaultService ?? ""} className={inputClass}>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.shortName}>{s.shortName}</option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qf-message" className="mb-1 block text-sm font-medium text-slate-300">Project details</label>
          <textarea id="qf-message" name="message" rows={4} className={inputClass}
            placeholder="e.g. 2-bed condo in Vaughan — IKEA PAX wardrobe, MALM bed and a desk to assemble." />
        </div>
      </div>
      {status === "error" && (
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          <p>
            Something went wrong submitting the form. Please call{" "}
            <a href={site.phoneHref} className="font-semibold underline">{site.phoneDisplay}</a> or email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>.
          </p>
          <button
            type="button"
            onClick={() => forwardToWhatsApp(lastSummary.current)}
            className="mt-2 font-semibold underline"
          >
            Send via WhatsApp instead
          </button>
        </div>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-amber mt-5 w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Get My Free Quote"}
      </button>
      {!isSupabaseConfigured && (
        <p className="mt-3 text-xs text-slate-500">
          Sends via WhatsApp until online booking is connected.
        </p>
      )}
    </form>
  );
}
