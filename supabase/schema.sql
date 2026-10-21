-- Chrisko Home Automation — full database schema (idempotent: safe to re-run)
-- Run this in the Supabase SQL editor for your project.

-- ---------------------------------------------------------------------------
-- 1. quote_requests — public quote form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text not null,
  service text,
  location text,
  message text,
  is_read boolean not null default false
);

-- For projects created before is_read existed:
alter table public.quote_requests add column if not exists is_read boolean not null default false;

alter table public.quote_requests enable row level security;

-- Anonymous visitors may submit (INSERT only).
drop policy if exists "anon can insert quote requests" on public.quote_requests;
create policy "anon can insert quote requests"
  on public.quote_requests for insert to anon
  with check (true);

-- Only the signed-in admin can read / update / delete submissions.
drop policy if exists "authenticated can manage quote requests" on public.quote_requests;
create policy "authenticated can manage quote requests"
  on public.quote_requests for select to authenticated
  using (true);

drop policy if exists "authenticated can update quote requests" on public.quote_requests;
create policy "authenticated can update quote requests"
  on public.quote_requests for update to authenticated
  using (true) with check (true);

drop policy if exists "authenticated can delete quote requests" on public.quote_requests;
create policy "authenticated can delete quote requests"
  on public.quote_requests for delete to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 1b. appointments — booking card submissions
-- ---------------------------------------------------------------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  service text not null default 'Furniture Assembly',
  location text,
  preferred_date date,
  preferred_time text,
  is_read boolean not null default false
);

-- For projects created before the wizard fields existed:
alter table public.appointments add column if not exists email text;
alter table public.appointments add column if not exists details text;

alter table public.appointments enable row level security;

drop policy if exists "anon can insert appointments" on public.appointments;
create policy "anon can insert appointments"
  on public.appointments for insert to anon
  with check (true);

drop policy if exists "authenticated can read appointments" on public.appointments;
create policy "authenticated can read appointments"
  on public.appointments for select to authenticated
  using (true);

drop policy if exists "authenticated can update appointments" on public.appointments;
create policy "authenticated can update appointments"
  on public.appointments for update to authenticated
  using (true) with check (true);

drop policy if exists "authenticated can delete appointments" on public.appointments;
create policy "authenticated can delete appointments"
  on public.appointments for delete to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 2. portfolio_items — admin-managed portfolio entries on /projects/
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  service text not null,
  location text not null,
  description text,
  image_url text not null,
  sort_order integer not null default 100,
  published boolean not null default true
);

alter table public.portfolio_items enable row level security;

drop policy if exists "public can read published portfolio items" on public.portfolio_items;
create policy "public can read published portfolio items"
  on public.portfolio_items for select to anon
  using (published = true);

drop policy if exists "authenticated can read all portfolio items" on public.portfolio_items;
create policy "authenticated can read all portfolio items"
  on public.portfolio_items for select to authenticated
  using (true);

drop policy if exists "authenticated can insert portfolio items" on public.portfolio_items;
create policy "authenticated can insert portfolio items"
  on public.portfolio_items for insert to authenticated
  with check (true);

drop policy if exists "authenticated can update portfolio items" on public.portfolio_items;
create policy "authenticated can update portfolio items"
  on public.portfolio_items for update to authenticated
  using (true) with check (true);

drop policy if exists "authenticated can delete portfolio items" on public.portfolio_items;
create policy "authenticated can delete portfolio items"
  on public.portfolio_items for delete to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 3. site_content — admin-editable text overrides for public pages
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "public can read site content" on public.site_content;
create policy "public can read site content"
  on public.site_content for select to anon
  using (true);

drop policy if exists "authenticated can read site content" on public.site_content;
create policy "authenticated can read site content"
  on public.site_content for select to authenticated
  using (true);

drop policy if exists "authenticated can upsert site content" on public.site_content;
create policy "authenticated can upsert site content"
  on public.site_content for insert to authenticated
  with check (true);

drop policy if exists "authenticated can update site content" on public.site_content;
create policy "authenticated can update site content"
  on public.site_content for update to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- 4. Storage bucket "portfolio" — public read, authenticated write
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "public read portfolio images" on storage.objects;
create policy "public read portfolio images"
  on storage.objects for select to anon
  using (bucket_id = 'portfolio');

drop policy if exists "authenticated upload portfolio images" on storage.objects;
create policy "authenticated upload portfolio images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio');

drop policy if exists "authenticated update portfolio images" on storage.objects;
create policy "authenticated update portfolio images"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');

drop policy if exists "authenticated delete portfolio images" on storage.objects;
create policy "authenticated delete portfolio images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio');
