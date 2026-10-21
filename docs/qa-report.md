# Pre-Publish QA & Ranking-Readiness Report — Chrisko Home Automation

Date: 2026-01-15 · Site: furniture assembly, Toronto & GTA · Build: Next.js 15 static export (`out/`, 38 routes incl. icon/404)

## A. PageSpeed / Core Web Vitals

**PSI API note:** the keyless PageSpeed Insights API quota (shared daily quota for unauthenticated calls) returned HTTP 429 all day — no PSI runs were possible. As sanctioned by the task fallback, Chrome was available on this machine, so all numbers below are **local Lighthouse runs against the production static export** (same engine PSI uses). Re-run PSI after launch on the live domain for field-confirmation.

### Scores (mobile unless noted) — before → after fixes

| Page | Perf | SEO | A11y | Best-Pract. | LCP | CLS | TBT | FCP | Speed Index |
|---|---|---|---|---|---|---|---|---|---|
| `/` (home) | 97 → **100** | 100 → 100 | 92 → 96 | 96 → **100** | 2.6s → **1.2s** | 0 → 0 | 50 → 40ms | 1.2s → 0.9s | 1.2s → 0.9s |
| `/` desktop | 100 → **100** | 100 | 92 → 96 | 96 → **100** | 0.6s → 0.6s | 0.022 → 0.022 | 0ms | 0.3s | 0.4s |
| `/services/ikea-furniture-assembly/` | 96 → **98** | 100 | 96 → **100** | 96 → **100** | 2.7s → **2.4s** | 0 | 30ms | 1.2s | 1.2s |
| `/locations/markham/` | **84 → 100** | 100 | 96 → **100** | 96 → **100** | **4.5s → 1.7s** | 0 | 50ms | 1.2s | 1.2s |
| `/blog/furniture-assembly-cost-toronto/` | 98 → **99** | 100 | 96 → **100** | 96 → **100** | 2.3s → 2.2s | 0 | 80 → 30ms | 1.2s | 1.2s |
| `/contact/` | 99 → **99** | 100 | 94 → 98 | 96 → **100** | 2.2s → 2.0s | 0 | 40ms | 1.2s | 1.2s |
| `/projects/` | 98 → **99** | 100 | 96 → **100** | 96 → **100** | 2.3s → 2.0s | 0 | 60 → 20ms | 0.8s | 0.9s |

**All targets met:** mobile Performance ≥90 everywhere (96–100), LCP <2.5s everywhere (max 2.4s), CLS 0 (<0.1), SEO 100 on every page.

### Issues found and fixed
1. **Location-page LCP 4.5s** — city hero photos were 250–420KB. Three recompression passes (q68 → 1366w/q62 → 1280w/q58 for >130KB files) cut `public/images/` from 9.0MB to ~5MB; heaviest hero now 128KB. Location LCP → 1.7s.
2. **Unused JS (47KB Supabase chunk on every page)** — `@supabase/supabase-js` was imported at module scope. Refactored `lib/supabase.ts` to a lazy dynamic `import()`; QuoteForm, AdminApp, PortfolioGrid and EditableText now load the library only when needed.
3. **Colour contrast (light theme)** — `accent-cyan` text was #0891b2 (3.5:1) and amber buttons white-on-#d97706 (3.2:1). Light-theme tokens now cyan-700 (#0e7490) and amber-700 (#b45309), both ≥4.5:1. Dark theme unchanged. A11y 92–96 → 96–100.
4. **favicon.ico 404 console error** — added `app/icon.svg` (linked icon) plus a real `public/favicon.ico` fallback; both serve 200, console error gone (Best-Practices 96 → 100 everywhere).

## B. Content benchmark audit (scripted over `out/`)

| Page group | Target | Actual (visible words) | Status |
|---|---|---|---|
| 8 service pages | 800–1,500+ | 1,164–1,317 | ✅ all pass |
| 12 location pages | 600–900+ | 890–935 | ✅ all pass |
| 4 blog posts | 1,400–2,000 | 1,402 / 1,406 / 1,451 / 1,520 | ✅ all pass (expanded from 785–877 with 4 new unique sections each) |

Benchmark context: top GTA competitors' service pages run ~1,000–1,800 words; ours sit mid-range at 1,164–1,317 with FAQ/schema structure competitors lack — competitive, with room to grow service pages toward 1,500 over time.

Per-page checks (scripted, all 31 public pages): exactly one H1 with the primary keyword ✅ · keyword + location in intro ✅ (location H1s use "Furniture Assembly Services in [City]") · titles 50–60 chars, brand exactly once ✅ · meta descriptions 150–160 chars with keyword + benefit + CTA + phone ✅ (26 descriptions were under 150 and were rewritten) · visible breadcrumbs ✅ · "Last updated" dates ✅ · 5–7 FAQs per service/location page ✅ · internal links with descriptive anchors (25+ per page) ✅ · **external authority links added to all 8 service pages** (ikea.com PAX planner & assembly-instruction library, anchorit.gov, ontarioonecall.ca, ccohs.ca, support.onepeloton.com, rtings.com, canada.ca) ✅ · FAQPage JSON-LD matches visible `<details>` text exactly (programmatic comparison) ✅.

## C. Schema validation (all JSON-LD parsed programmatically)
- Sitewide on every page: Organization + HomeAndConstructionBusiness (LocalBusiness type) + WebSite — JSON valid, name/telephone/url/email/areaServed/openingHours present ✅
- Service pages: Service + FAQPage + BreadcrumbList ✅ · Location pages: Service (areaServed=city) + FAQPage + BreadcrumbList ✅ · Blog: Article + BreadcrumbList ✅ · Home: FAQPage + WebPage ✅
- Zero parse errors, zero missing required fields, zero schema/visible-text mismatches.

## D. Technical / NAP / misc checklist
- **NAP identical** (name / +1 (437) 870-1113 / info@chriskohomeautomation.com) in footer, contact page, LocalBusiness schema and llm.txt — grep-verified ✅
- **llm.txt**: HTTP 200, `Content-Type: text/plain; charset=utf-8` via `serve` ✅ (cPanel/Apache also serves .txt as text/plain by default — no action needed at deploy)
- **Images**: all WebP, every `<img>` has alt text, all <125 chars ✅
- **Broken internal links**: full crawl of all `href="/..."` in out/ — none ✅
- **Mobile**: viewport meta on all pages ✅; responsive nav/grids reviewed; Lighthouse mobile runs cover emulation ✅
- **robots.txt** allow-all + sitemap URL ✅ · **sitemap.xml** 31 URLs, no `/admin/` ✅ · `/admin/` = `noindex, nofollow` ✅
- **OG/Twitter tags on all 31 pages** ✅ (og:title/description/url/image, twitter:card=summary_large_image; og:image added to the 5 index/about/contact pages that lacked it)

## Keyword cannibalization check
Each target keyword maps to exactly one page (site map enforced by data structure — one data entry per slug, unique titles verified programmatically): home owns "furniture assembly Toronto", 8 services own their exact service keywords, 12 cities own "furniture assembly [city]", 4 posts own their informational keywords. No duplicates found ✅

## Remaining ranking risks & prioritized next steps
1. **Google Business Profile + real reviews** — the single biggest local-ranking factor; placeholder review excerpts on the home page should be replaced with real Google reviews as they arrive.
2. **Search Console submission** — verify the domain, submit sitemap.xml, request indexing after deploy.
3. **Real job photos** — Unsplash placeholders are on-topic but generic; real GTA job photos (with consistent filenames) will help trust + image search.
4. **Backlinks/citations** — local directories (Yelp, YellowPages, HomeStars, Houzz) with identical NAP.
5. **sameAs placeholders** in Organization schema point to placeholder social URLs — create real profiles or remove the fields.
6. **Supabase go-live** — run schema.sql, create the admin user, add env vars and rebuild to activate the quote form and admin panel.
7. **HTTPS/hosting** — deploy `out/` to the .com domain with SSL; add 301s if a .ca domain exists.
8. **Content cadence** — 1–2 blog posts/month targeting long-tail (specific IKEA product names, per-neighbourhood queries) to build topical authority.

## Verification environment
All checks run against the production static export in `out/` served locally (localhost:3000); tunnel used for external-access verification was removed after testing. Raw Lighthouse JSON retained in `qa/lighthouse/` (baseline) and `qa/lighthouse-after/` (final).
