"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { site, whatsappUrl } from "@/lib/site";
import { services } from "@/lib/services";

const TIME_CHIPS = ["Any time", "Morning (8am–12pm)", "Afternoon (12–4pm)", "Evening (4–8pm)"];
const OTHER = "Other / Not sure yet";

type Status = "idle" | "sending" | "success" | "error" | "whatsapp";

function ChipRadio({
  name,
  value,
  checked,
  onChange,
  label,
  id,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  label: string;
  id: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer rounded-xl border px-3.5 py-2.5 text-center text-sm font-medium transition ${
        checked
          ? "border-accent-blue bg-accent-blue/10 text-white shadow-glow"
          : "border-ink-700 bg-ink-850 text-slate-300 hover:border-accent-blue/50"
      }`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {label}
    </label>
  );
}

export default function BookingCard({
  service,
  location,
  allowServiceSelect = false,
  lockService = false,
}: {
  service: string;
  location?: string;
  allowServiceSelect?: boolean;
  lockService?: boolean;
}) {
  const showServiceStep = !lockService;
  const steps = showServiceStep ? ["Service", "Details", "Contact"] : ["Details", "Contact"];

  const [step, setStep] = useState(showServiceStep ? 1 : 2);
  const [pickedService, setPickedService] = useState("");
  const [serviceHint, setServiceHint] = useState(false);
  const [details, setDetails] = useState("");
  const [dateChoice, setDateChoice] = useState("");
  const [pickedDate, setPickedDate] = useState("");
  const [timeChoice, setTimeChoice] = useState("Any time");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [today, setToday] = useState("");
  const lastSummary = useRef<string>("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const effectiveService = lockService ? service : pickedService;

  function resolvedDate(): string {
    if (dateChoice === "Today") return today;
    if (dateChoice === "Tomorrow") {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split("T")[0];
    }
    return pickedDate;
  }

  function collectSummary(): string {
    const loc = location ?? "";
    return [
      "New appointment request — Chrisko Home Automation",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : "",
      `Service: ${effectiveService}`,
      loc ? `Location: ${loc}` : "",
      `Preferred date: ${resolvedDate() || "flexible"}`,
      `Time window: ${timeChoice}`,
      details ? `Details: ${details}` : "",
    ].filter(Boolean).join("\n");
  }

  function forwardToWhatsApp(summary: string) {
    window.open(whatsappUrl(summary), "_blank", "noopener,noreferrer");
    setStatus("whatsapp");
  }

  function goNext() {
    if (step === 1 && showServiceStep && !pickedService) {
      setServiceHint(true);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("company") ?? "")) {
      // honeypot filled — silently accept and drop
      setStatus("success");
      return;
    }
    const summary = collectSummary();
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
    const { error } = await supabase.from("appointments").insert({
      name,
      phone,
      email,
      service: effectiveService,
      location: location ?? "",
      preferred_date: resolvedDate() || null,
      preferred_time: timeChoice,
      details,
    });
    setStatus(error ? "error" : "success");
  }

  const inputCls =
    "w-full rounded-lg border border-ink-700 bg-ink-850 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent-blue focus:outline-none";

  const cardProps = {
    "data-booking-card": true,
    "data-service": lockService ? service : effectiveService || service,
    "data-location": location ?? "",
  } as const;

  if (status === "success" || status === "whatsapp") {
    return (
      <div {...cardProps} className="card text-center shadow-xl">
        <svg className="mx-auto h-10 w-10 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {status === "success" ? (
          <>
            <h2 className="mt-3 text-xl font-bold text-white">Request received!</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              We&apos;ll confirm your appointment by phone or text shortly. Need us right away?{" "}
              <a href={site.phoneHref} className="font-semibold text-accent-cyan hover:underline">
                Tap to call {site.phoneDisplay}
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-3 text-xl font-bold text-white">Opening WhatsApp to send your request…</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              If it didn&apos;t open, call{" "}
              <a href={site.phoneHref} className="font-semibold text-accent-cyan hover:underline">
                {site.phoneDisplay}
              </a>{" "}
              or{" "}
              <button type="button" onClick={() => forwardToWhatsApp(lastSummary.current)} className="font-semibold text-accent-cyan hover:underline">
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
    <form onSubmit={handleSubmit} {...cardProps} className="card border-ink-700 shadow-xl backdrop-blur">
      <h2 className="text-xl font-bold text-white">Free Estimate</h2>
      <p className="mt-1 text-xs text-slate-400">Booked in 30 seconds · response within business hours</p>

      {/* Progress indicator */}
      <ol className="mt-4 flex items-center gap-1.5" aria-label="Booking progress">
        {steps.map((label, i) => {
          const stepNum = showServiceStep ? i + 1 : i + 2;
          const done = step > stepNum;
          const active = step === stepNum;
          return (
            <li key={label} className="flex flex-1 items-center gap-1.5">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                  done
                    ? "bg-accent-cyan text-on-accent"
                    : active
                      ? "bg-accent-blue text-on-accent shadow-glow"
                      : "border border-ink-700 bg-ink-850 text-slate-400"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={`text-xs font-medium ${active ? "text-white" : "text-slate-400"}`}>{label}</span>
              {i < steps.length - 1 && <span className="mx-1 h-px flex-1 bg-ink-700" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      {lockService && (
        <p className="mt-4 text-sm text-slate-400">
          Service: <span className="badge ml-1 !py-1 !text-xs font-semibold text-accent-cyan">{service}</span>
        </p>
      )}
      {location && !lockService && (
        <p className="mt-4 text-sm text-slate-400">
          Location: <span className="badge ml-1 !py-1 !text-xs font-semibold text-accent-cyan">{location}</span>
        </p>
      )}

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {/* Step 1: service chips */}
      {step === 1 && showServiceStep && (
        <fieldset className="wizard-step mt-5">
          <legend className="text-sm font-semibold text-white">What do you need?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {services.map((s) => (
              <ChipRadio
                key={s.slug}
                id={`bk-svc-${s.slug}`}
                name="service_chip"
                value={s.shortName}
                label={s.shortName}
                checked={pickedService === s.shortName}
                onChange={(v) => { setPickedService(v); setServiceHint(false); }}
              />
            ))}
            <ChipRadio
              id="bk-svc-other"
              name="service_chip"
              value={OTHER}
              label={OTHER}
              checked={pickedService === OTHER}
              onChange={(v) => { setPickedService(v); setServiceHint(false); }}
            />
          </div>
          {serviceHint && (
            <p className="mt-2 text-xs font-medium text-accent-amber">Pick a service to continue (or choose &quot;Not sure yet&quot;).</p>
          )}
        </fieldset>
      )}

      {/* Step 2: project details */}
      {step === 2 && (
        <fieldset className="wizard-step mt-5">
          <legend className="text-sm font-semibold text-white">Tell us about the project</legend>
          <textarea
            name="details"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className={`${inputCls} mt-3`}
            placeholder="e.g. IKEA PAX wardrobe, 2 frames with sliding doors, bedroom 2…"
          />
          <p className="mt-4 text-xs font-medium text-slate-400">Preferred date</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Today", "Tomorrow"].map((d) => (
              <ChipRadio key={d} id={`bk-date-${d}`} name="date_chip" value={d} label={d} checked={dateChoice === d} onChange={setDateChoice} />
            ))}
            <ChipRadio id="bk-date-pick" name="date_chip" value="pick" label="Pick a date" checked={dateChoice === "pick"} onChange={setDateChoice} />
          </div>
          {dateChoice === "pick" && (
            <input type="date" name="picked_date" min={today} value={pickedDate} onChange={(e) => setPickedDate(e.target.value)} className={`${inputCls} mt-2`} />
          )}
          <p className="mt-4 text-xs font-medium text-slate-400">Preferred time</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {TIME_CHIPS.map((t) => (
              <ChipRadio key={t} id={`bk-time-${t}`} name="time_chip" value={t} label={t} checked={timeChoice === t} onChange={setTimeChoice} />
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 3: contact */}
      {step === 3 && (
        <fieldset className="wizard-step mt-5">
          <legend className="text-sm font-semibold text-white">Where do we reach you?</legend>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="bk-name" className="mb-1 block text-xs font-medium text-slate-400">Name *</label>
              <input id="bk-name" name="name" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="bk-phone" className="mb-1 block text-xs font-medium text-slate-400">Phone *</label>
              <input id="bk-phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="(437) 555-0100" />
            </div>
            <div>
              <label htmlFor="bk-email" className="mb-1 block text-xs font-medium text-slate-400">Email (optional)</label>
              <input id="bk-email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
            </div>
          </div>
        </fieldset>
      )}

      {status === "error" && (
        <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <p>
            Something went wrong sending your request. Please call{" "}
            <a href={site.phoneHref} className="font-semibold underline">{site.phoneDisplay}</a>
          </p>
          <button type="button" onClick={() => forwardToWhatsApp(lastSummary.current)} className="mt-2 font-semibold underline">
            Send via WhatsApp instead
          </button>
        </div>
      )}

      {/* Nav buttons */}
      <div className="mt-5 flex gap-3">
        {step > (showServiceStep ? 1 : 2) && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-outline flex-1 !py-2.5 text-sm">
            Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={goNext} className="btn-primary flex-1 !py-2.5 text-sm">
            Continue
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="btn-amber flex-1 !py-2.5 text-sm disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Get My Free Quote"}
          </button>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Fully insured · $2M liability · 12-month warranty · No spam, ever. Need it today? Call{" "}
        <a href={site.phoneHref} className="font-semibold text-accent-cyan hover:underline">{site.phoneDisplay}</a>.
      </p>
      {!isSupabaseConfigured && (
        <p className="mt-1.5 text-center text-xs text-slate-500">
          Sends via WhatsApp until online booking is connected.
        </p>
      )}
    </form>
  );
}
