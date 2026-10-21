"use client";

import { useRef, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { site, whatsappUrl } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "whatsapp";

const inputCls =
  "w-full rounded-lg border border-ink-700 bg-ink-850 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent-blue focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const lastSummary = useRef<string>("");

  function collectSummary(form: FormData): string {
    return [
      "New message — Chrisko Home Automation website",
      `Name: ${String(form.get("name") ?? "")}`,
      `Phone: ${String(form.get("phone") ?? "")}`,
      `Email: ${String(form.get("email") ?? "")}`,
      `Subject: ${String(form.get("subject") ?? "")}`,
      `Message: ${String(form.get("message") ?? "")}`,
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
      service: "General inquiry",
      location: "",
      message: `[${String(form.get("subject") ?? "General")}] ${String(form.get("message") ?? "")}`,
    });
    setStatus(error ? "error" : "success");
  }

  if (status === "success" || status === "whatsapp") {
    return (
      <div className="card text-center">
        {status === "success" ? (
          <>
            <h2 className="text-xl font-semibold text-white">Message sent!</h2>
            <p className="mt-3 text-slate-300">
              We&apos;ll reply within one business day. Need us sooner? Call{" "}
              <a href={site.phoneHref} className="font-semibold text-accent-cyan">{site.phoneDisplay}</a>.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-white">Opening WhatsApp to send your message…</h2>
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

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-semibold text-white">Send us a message</h2>
      <p className="mt-2 text-sm text-slate-400">
        Questions, quotes or scheduling — we reply within one business day.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-sm font-medium text-slate-300">Name *</label>
          <input id="cf-name" name="name" required className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1 block text-sm font-medium text-slate-300">Phone</label>
          <input id="cf-phone" name="phone" type="tel" className={inputCls} placeholder="(437) 555-0100" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-email" className="mb-1 block text-sm font-medium text-slate-300">Email *</label>
          <input id="cf-email" name="email" type="email" required className={inputCls} placeholder="you@example.com" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-subject" className="mb-1 block text-sm font-medium text-slate-300">Subject</label>
          <input id="cf-subject" name="subject" className={inputCls} placeholder="e.g. Question about my PAX wardrobe quote" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="mb-1 block text-sm font-medium text-slate-300">Message *</label>
          <textarea id="cf-message" name="message" required rows={5} className={inputCls} placeholder="How can we help?" />
        </div>
      </div>
      {status === "error" && (
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          <p>
            Something went wrong — please call{" "}
            <a href={site.phoneHref} className="font-semibold underline">{site.phoneDisplay}</a>.
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
      <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {!isSupabaseConfigured && (
        <p className="mt-3 text-xs text-slate-500">
          Sends via WhatsApp until online booking is connected.
        </p>
      )}
    </form>
  );
}
