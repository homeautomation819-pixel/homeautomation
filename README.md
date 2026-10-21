# Chrisko Home Automation — Website

Professional furniture assembly & installation serving Toronto & the GTA.

100% statically exported Next.js 15 site (App Router + TypeScript + Tailwind CSS). No server
rendering at runtime — every page is pre-rendered HTML at build time, ready for cPanel or any
static host. Light theme by default with a dark-mode toggle.

## Develop & build

```bash
npm install
npm run build   # produces the static site in out/
```

Serve `out/` with any static file server. The production domain is
https://www.chriskohomeautomation.com.

## Images

```bash
npm run images        # generates branded fallback/OG graphics (og-image.jpg)
npm run fetch-images  # downloads real Unsplash photos into public/images/
```

Photos are real, license-free Unsplash images stored locally (see `docs/photo-credits.md`) —
the live site never depends on external image URLs.

## Supabase setup (quote form + admin panel)

The quote form, the portfolio hydration and the `/admin/` panel all talk to Supabase directly
from the browser. If the env vars are missing or still placeholders, the site gracefully falls
back to static content (phone/email CTA instead of the form) — nothing crashes.

### 1. Create the project and schema

1. Create a free project at https://supabase.com.
2. Open **SQL Editor** and run the full contents of `supabase/schema.sql`. It is idempotent
   (safe to re-run) and creates:
   - `quote_requests` (form submissions; anon can INSERT, only authenticated users can read)
   - `appointments` (booking-card requests; anon INSERT, authenticated manage)
   - `portfolio_items` (admin-managed portfolio entries; public read of published items)
   - `site_content` (admin-editable text overrides; public read)
   - the `portfolio` Storage bucket (public read, authenticated upload)

### 2. Create the admin user

1. In the Supabase dashboard go to **Authentication → Users → Add User**.
2. Email: `admin@chriskohomeautomation.com` — Password: `Chrisko2026!Secure`
3. Tick **Auto Confirm User**, then create.
4. Sign in at `/admin/` with those credentials and **change the password after first login**
   (Authentication → Users in the dashboard).

### 3. Connect the site

1. **Project Settings → API** → copy the **Project URL** and **anon public key**.
2. Create `.env.local` (never commit it) from `.env.example`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

3. Rebuild (`npm run build`). `NEXT_PUBLIC_*` variables are inlined at build time, so a rebuild
   is required after changing them.

## Admin panel — /admin/

Client-side admin (noindex, excluded from the sitemap):

- **Submissions** — every quote-form request, newest first; mark read/unread, delete, refresh.
- **Appointments** — every booking-card request (name, phone, service, location, preferred
  date and time window); NEW badges, mark read/unread, delete, refresh. Requires re-running
  `supabase/schema.sql` (adds the `appointments` table).
- **Portfolio** — add/edit/delete items on `/projects/`; upload photos to the `portfolio`
  Storage bucket or pick an existing site image; sort order and published flag.
- **Content** — edit the home hero headline/subheadline, pricing intro, announcement bar and
  the first three testimonials. Public pages render build-time defaults instantly and apply
  overrides after hydration.
- **Settings & Help** — logged-in account, sign-out, and plain-English setup instructions.

## Project structure

- `app/` — all pages (App Router, static export)
- `components/` — shared UI (Header, Footer, QuoteForm, FAQ, PortfolioGrid, admin/, …)
- `lib/` — site constants (NAP), service/location/blog/portfolio content data, JSON-LD builders
- `public/images/` — local WebP photos + generated og-image.jpg
- `public/llm.txt` — LLM-readable business summary
- `docs/seo-strategy.md` — keyword matrix, competitor gaps, content briefs
- `docs/photo-credits.md` — Unsplash source URLs for every photo
- `supabase/schema.sql` — database schema (tables, RLS policies, storage bucket)
