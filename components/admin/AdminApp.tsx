"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { site } from "@/lib/site";
import { availableImages, portfolioServices } from "@/lib/portfolio";

/* ---------------------------------- types --------------------------------- */

type QuoteRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string;
  service: string | null;
  location: string | null;
  message: string | null;
  is_read: boolean;
};

type PortfolioRow = {
  id: string;
  title: string;
  service: string;
  location: string;
  description: string;
  image_url: string;
  sort_order: number;
  published: boolean;
};

type ContentRow = { key: string; value: string; updated_at: string };

const CONTENT_KEYS: { key: string; label: string }[] = [
  { key: "announcement_bar", label: "Announcement bar (top of every page)" },
  { key: "home_hero_headline", label: "Home hero headline (H1)" },
  { key: "home_hero_subheadline", label: "Home hero subheadline" },
  { key: "home_pricing_blurb", label: "Home pricing section intro text" },
  { key: "testimonial_1_text", label: "Testimonial 1 — review text" },
  { key: "testimonial_1_author", label: "Testimonial 1 — author, e.g. 'Daniel M. · North York'" },
  { key: "testimonial_2_text", label: "Testimonial 2 — review text" },
  { key: "testimonial_2_author", label: "Testimonial 2 — author" },
  { key: "testimonial_3_text", label: "Testimonial 3 — review text" },
  { key: "testimonial_3_author", label: "Testimonial 3 — author" },
];

const TABS = ["Submissions", "Appointments", "Portfolio", "Content", "Settings & Help"] as const;
type Tab = (typeof TABS)[number];

const inputCls =
  "w-full rounded-lg border border-ink-700 bg-ink-850 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent-blue focus:outline-none";

/* --------------------------------- main app -------------------------------- */

export default function AdminApp() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("Submissions");

  useEffect(() => {
    let sub: { subscription: { unsubscribe: () => void } } | null = null;
    (async () => {
      const sb = await getSupabase();
      setSupabase(sb);
      if (!sb) {
        setAuthChecked(true);
        return;
      }
      const { data } = await sb.auth.getSession();
      setUser(data.session?.user ?? null);
      setAuthChecked(true);
      const { data: s } = sb.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
      });
      sub = s;
    })();
    return () => sub?.subscription.unsubscribe();
  }, []);

  if (!authChecked && isSupabaseConfigured) {
    return (
      <section className="section">
        <div className="container-site max-w-2xl text-center text-slate-400">Loading…</div>
      </section>
    );
  }

  if (!user || !supabase) {
    return <LoginForm supabase={supabase} />;
  }

  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Site admin</h1>
            <p className="mt-1 text-sm text-slate-400">Signed in as {user.email}</p>
          </div>
          <SignOutButton supabase={supabase} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-ink-800 pb-4">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                tab === t ? "bg-accent-blue text-on-accent" : "bg-ink-850 text-slate-300 hover:bg-ink-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Submissions" && <SubmissionsTab supabase={supabase} />}
          {tab === "Appointments" && <AppointmentsTab supabase={supabase} />}
          {tab === "Portfolio" && <PortfolioTab supabase={supabase} />}
          {tab === "Content" && <ContentTab supabase={supabase} />}
          {tab === "Settings & Help" && <SettingsTab supabase={supabase} user={user} />}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- login --------------------------------- */

function LoginForm({ supabase }: { supabase: SupabaseClient | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured && supabase;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      setError("Supabase is not connected yet — complete the three setup steps above first.");
      return;
    }
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <section className="section">
      <div className="container-site max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-blue text-2xl font-bold text-on-accent shadow-glow">
            C
          </span>
          <p className="mt-3 text-lg font-bold text-white">
            Chrisko <span className="text-accent-cyan">Home Automation</span>
          </p>
          <p className="text-sm text-slate-400">Site administration</p>
        </div>

        {!configured && (
          <div className="mb-5 rounded-2xl border border-accent-amber/50 bg-accent-amber/10 p-5">
            <p className="font-semibold text-white">Supabase not connected yet</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              The admin panel activates after setup:
            </p>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300">
              <li>Run <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">supabase/schema.sql</code> in your Supabase SQL Editor.</li>
              <li>Create user <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">admin@chriskohomeautomation.com</code> in Authentication → Users with Auto Confirm.</li>
              <li>Add <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">.env.local</code> and rebuild.</li>
            </ol>
            <p className="mt-2 text-sm text-slate-400">See README.md for full instructions.</p>
          </div>
        )}

        <form onSubmit={submit} className="card">
          <h1 className="text-2xl font-bold text-white">Admin sign in</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in with the admin email and password created in your Supabase project.
          </p>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-slate-300">Email</label>
              <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="admin@chriskohomeautomation.com" />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-slate-300">Password</label>
              <input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
            </div>
          </div>
          {error && <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={busy || !configured} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50">
            {busy ? "Signing in…" : configured ? "Sign in" : "Sign in (setup required)"}
          </button>
        </form>
      </div>
    </section>
  );
}

function SignOutButton({ supabase }: { supabase: SupabaseClient }) {
  return (
    <button type="button" onClick={() => supabase.auth.signOut()} className="btn-outline !px-4 !py-2 text-sm">
      Sign out
    </button>
  );
}

/* -------------------------------- submissions ------------------------------ */

function SubmissionsTab({ supabase }: { supabase: SupabaseClient }) {
  const [rows, setRows] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows((data as QuoteRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(row: QuoteRow) {
    const { error } = await supabase.from("quote_requests").update({ is_read: !row.is_read }).eq("id", row.id);
    if (!error) setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, is_read: !row.is_read } : r)));
  }

  async function remove(row: QuoteRow) {
    if (!window.confirm(`Delete the request from ${row.name}?`)) return;
    const { error } = await supabase.from("quote_requests").delete().eq("id", row.id);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== row.id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Quote requests ({rows.length})</h2>
        <button type="button" onClick={load} className="btn-outline !px-4 !py-2 text-sm">Refresh</button>
      </div>
      {error && <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}
      {loading ? (
        <p className="mt-6 text-slate-400">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-slate-400">No submissions yet. New quote-form requests will appear here.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((r) => (
            <div key={r.id} className={`card ${r.is_read ? "opacity-60" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {r.name} {!r.is_read && <span className="ml-2 rounded-full bg-accent-amber px-2 py-0.5 text-xs font-bold text-on-accent">NEW</span>}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {new Date(r.created_at).toLocaleString("en-CA")} · {r.service || "General"} · {r.location || "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => toggleRead(r)} className="btn-outline !px-3 !py-1.5 text-xs">
                    {r.is_read ? "Mark unread" : "Mark read"}
                  </button>
                  <button type="button" onClick={() => remove(r)} className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10">
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                <a href={`mailto:${r.email}`} className="text-accent-cyan hover:underline">{r.email}</a>
                {r.phone && <> · <a href={`tel:${r.phone}`} className="text-accent-cyan hover:underline">{r.phone}</a></>}
              </p>
              {r.message && <p className="mt-2 rounded-lg bg-ink-850 p-3 text-sm text-slate-300">{r.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- appointments ----------------------------- */

type AppointmentRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  service: string;
  location: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  email: string | null;
  details: string | null;
  is_read: boolean;
};

function AppointmentsTab({ supabase }: { supabase: SupabaseClient }) {
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows((data as AppointmentRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(row: AppointmentRow) {
    const { error } = await supabase.from("appointments").update({ is_read: !row.is_read }).eq("id", row.id);
    if (!error) setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, is_read: !row.is_read } : r)));
  }

  async function remove(row: AppointmentRow) {
    if (!window.confirm(`Delete the appointment request from ${row.name}?`)) return;
    const { error } = await supabase.from("appointments").delete().eq("id", row.id);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== row.id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Appointments ({rows.length})</h2>
        <button type="button" onClick={load} className="btn-outline !px-4 !py-2 text-sm">Refresh</button>
      </div>
      {error && <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}
      {loading ? (
        <p className="mt-6 text-slate-400">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-slate-400">No appointment requests yet. New bookings from the site&apos;s appointment cards will appear here.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((r) => (
            <div key={r.id} className={`card ${r.is_read ? "opacity-60" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {r.name} {!r.is_read && <span className="ml-2 rounded-full bg-accent-amber px-2 py-0.5 text-xs font-bold text-on-accent">NEW</span>}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    <a href={`tel:${r.phone}`} className="text-accent-cyan hover:underline">{r.phone}</a>
                    {" · "}{r.service}{r.location ? ` · ${r.location}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => toggleRead(r)} className="btn-outline !px-3 !py-1.5 text-xs">
                    {r.is_read ? "Mark unread" : "Mark read"}
                  </button>
                  <button type="button" onClick={() => remove(r)} className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10">
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                <span className="font-semibold text-accent-amber">{r.preferred_date || "—"}</span>
                {" · "}{r.preferred_time || "—"}
              </p>
              {r.email && (
                <p className="mt-1 text-sm text-slate-300">
                  <a href={`mailto:${r.email}`} className="text-accent-cyan hover:underline">{r.email}</a>
                </p>
              )}
              {r.details && (
                <p className="mt-2 rounded-lg bg-ink-850 p-3 text-sm text-slate-300">{r.details}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Submitted {new Date(r.created_at).toLocaleString("en-CA")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- portfolio ------------------------------- */

const emptyPortfolio: Omit<PortfolioRow, "id"> = {
  title: "",
  service: portfolioServices[0],
  location: "",
  description: "",
  image_url: availableImages[0],
  sort_order: 100,
  published: true,
};

function PortfolioTab({ supabase }: { supabase: SupabaseClient }) {
  const [rows, setRows] = useState<PortfolioRow[]>([]);
  const [editing, setEditing] = useState<Partial<PortfolioRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("portfolio_items").select("*").order("sort_order", { ascending: true });
    setRows((data as PortfolioRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setMessage("");
    const payload = {
      title: editing.title ?? "",
      service: editing.service ?? portfolioServices[0],
      location: editing.location ?? "",
      description: editing.description ?? "",
      image_url: editing.image_url ?? availableImages[0],
      sort_order: Number(editing.sort_order ?? 100),
      published: editing.published ?? true,
    };
    const { error } = editing.id
      ? await supabase.from("portfolio_items").update(payload).eq("id", editing.id)
      : await supabase.from("portfolio_items").insert(payload);
    setMessage(error ? `Error: ${error.message}` : "Saved! It will appear on the Projects page after the next page load.");
    if (!error) {
      setEditing(null);
      load();
    }
  }

  async function remove(row: PortfolioRow) {
    if (!window.confirm(`Delete "${row.title}"?`)) return;
    await supabase.from("portfolio_items").delete().eq("id", row.id);
    load();
  }

  async function uploadImage(file: File) {
    setMessage("Uploading image…");
    const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "-").toLowerCase()}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
    if (error) {
      setMessage(`Upload failed: ${error.message}`);
      return;
    }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    setEditing((prev) => (prev ? { ...prev, image_url: data.publicUrl } : prev));
    setMessage("Image uploaded and attached to this item.");
  }

  if (editing) {
    return (
      <form onSubmit={save} className="card max-w-2xl">
        <h2 className="text-xl font-bold text-white">{editing.id ? "Edit" : "Add"} portfolio item</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-300">Title</label>
            <input required value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Service type</label>
            <select value={editing.service} onChange={(e) => setEditing({ ...editing, service: e.target.value })} className={inputCls}>
              {portfolioServices.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Location</label>
            <input required value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className={inputCls} placeholder="e.g. Vaughan" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-300">Description</label>
            <textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Image</label>
            <select value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className={inputCls}>
              {availableImages.map((img) => <option key={img} value={img}>{img.replace("/images/", "")}</option>)}
              {editing.image_url && !availableImages.includes(editing.image_url) && (
                <option value={editing.image_url}>Uploaded image (current)</option>
              )}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">…or upload a photo</label>
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} className="text-sm text-slate-400" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Sort order (lower = first)</label>
            <input type="number" value={editing.sort_order ?? 100} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className={inputCls} />
          </div>
          <div className="flex items-end gap-2 pb-1">
            <input id="pf-published" type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4" />
            <label htmlFor="pf-published" className="text-sm font-medium text-slate-300">Published (visible on site)</label>
          </div>
        </div>
        {editing.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={editing.image_url} alt="Preview" className="mt-4 aspect-video w-full max-w-sm rounded-lg border border-ink-700 object-cover" />
        )}
        {message && <p className="mt-4 text-sm text-accent-cyan">{message}</p>}
        <div className="mt-5 flex gap-3">
          <button type="submit" className="btn-primary !px-5 !py-2.5 text-sm">Save</button>
          <button type="button" onClick={() => { setEditing(null); setMessage(""); }} className="btn-outline !px-5 !py-2.5 text-sm">Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Portfolio items ({rows.length} custom)</h2>
        <button type="button" onClick={() => setEditing({ ...emptyPortfolio })} className="btn-primary !px-4 !py-2 text-sm">Add item</button>
      </div>
      <p className="mt-2 text-sm text-slate-400">
        The Projects page always shows the built-in items instantly; items you add here appear on top of them.
      </p>
      {message && <p className="mt-4 text-sm text-accent-cyan">{message}</p>}
      {loading ? (
        <p className="mt-6 text-slate-400">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-slate-400">No custom items yet. Click &quot;Add item&quot; to create one.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="card flex flex-wrap items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image_url} alt="" className="h-16 w-24 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{r.title} {!r.published && <span className="text-xs text-accent-amber">(hidden)</span>}</p>
                <p className="text-sm text-slate-400">{r.service} · {r.location} · order {r.sort_order}</p>
              </div>
              <button type="button" onClick={() => setEditing(r)} className="btn-outline !px-3 !py-1.5 text-xs">Edit</button>
              <button type="button" onClick={() => remove(r)} className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- content --------------------------------- */

function ContentTab({ supabase }: { supabase: SupabaseClient }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savedKey, setSavedKey] = useState("");

  useEffect(() => {
    supabase.from("site_content").select("*").then(({ data }) => {
      const map: Record<string, string> = {};
      (data as ContentRow[] | null)?.forEach((r) => (map[r.key] = r.value));
      setValues(map);
      setLoading(false);
    });
  }, [supabase]);

  async function save(key: string) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value: values[key] ?? "", updated_at: new Date().toISOString() });
    if (!error) {
      setSavedKey(key);
      setTimeout(() => setSavedKey(""), 2000);
    }
  }

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-white">Editable site text</h2>
      <p className="mt-2 text-sm text-slate-400">
        Changes appear on the public site immediately after the visitor&apos;s page finishes loading
        (no rebuild needed). Leave a field empty and save to restore the built-in default.
      </p>
      <div className="mt-6 space-y-5">
        {CONTENT_KEYS.map(({ key, label }) => (
          <div key={key} className="card">
            <label className="mb-1 block text-sm font-semibold text-white">{label}</label>
            <textarea
              rows={key.includes("headline") || key.includes("blurb") || key.includes("text") ? 3 : 1}
              value={values[key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              className={inputCls}
              placeholder="(built-in default)"
            />
            <div className="mt-2 flex items-center gap-3">
              <button type="button" onClick={() => save(key)} className="btn-primary !px-4 !py-1.5 text-xs">Save</button>
              {savedKey === key && <span className="text-xs font-semibold text-green-500">Saved!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- settings -------------------------------- */

function SettingsTab({ supabase, user }: { supabase: SupabaseClient; user: User }) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-white">Account</h2>
        <p className="mt-2 text-sm text-slate-300">Signed in as <span className="font-semibold text-white">{user.email}</span></p>
        <div className="mt-4"><SignOutButton supabase={supabase} /></div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-white">How this admin works</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-relaxed text-slate-300">
          <li><strong>Submissions</strong> shows every quote-form request, newest first. Use &quot;Mark read&quot; to keep track of who you&apos;ve called back.</li>
          <li><strong>Appointments</strong> shows every booking-card request with the customer&apos;s preferred date and time window — call or text to confirm, then mark read.</li>
          <li><strong>Portfolio</strong> adds or edits items on the public Projects page. Upload a photo or pick an existing site image. Uncheck &quot;Published&quot; to hide an item without deleting it.</li>
          <li><strong>Content</strong> edits key texts on the home page (hero, pricing intro, announcement bar, testimonials). Changes go live within seconds — no rebuild needed.</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-white">First-time setup (already done? skip this)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-slate-300">
          <li>In your Supabase dashboard, open the <strong>SQL Editor</strong> and run the full contents of <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">supabase/schema.sql</code>. It is safe to run more than once.</li>
          <li>Go to <strong>Authentication → Users → Add User</strong> and create the user <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">admin@chriskohomeautomation.com</code> with password <code className="rounded bg-ink-850 px-1.5 py-0.5 text-accent-cyan">Chrisko2026!Secure</code> — tick &quot;Auto Confirm User&quot;.</li>
          <li>Sign in here with those credentials, then change the password in Supabase (<strong>Authentication → Users</strong>) after your first login.</li>
        </ol>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-white">Need help?</h2>
        <p className="mt-2 text-sm text-slate-300">
          Call <a href={site.phoneHref} className="text-accent-cyan hover:underline">{site.phoneDisplay}</a> or email{" "}
          <a href={`mailto:${site.email}`} className="text-accent-cyan hover:underline">{site.email}</a>.
        </p>
      </div>
    </div>
  );
}
