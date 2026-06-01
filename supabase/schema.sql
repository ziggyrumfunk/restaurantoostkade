-- Restaurant Oostkade — Supabase schema
-- Run this in the Supabase SQL editor of your existing Supabase project.
-- Tables are prefixed with `oostkade_` so they don't collide with any
-- existing tables in this project (e.g. from another site you host here).
--
-- Note: reservations are handled by Zenchef now, so we only need the
-- event_inquiries table. The reservations table is kept here for reference
-- but you can drop it if you don't intend to use it.

create table if not exists public.oostkade_event_inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  date        date,
  guests      int,
  event_type  text,
  message     text,
  status      text default 'new'
);

-- RLS: nobody can read these from the client. Inserts happen via the
-- service-role key from the Next.js API routes.
alter table public.oostkade_event_inquiries enable row level security;

-- (Intentionally no policies. Service role bypasses RLS.)

-- Storage bucket suggestion (optional — site currently serves images from public/)
-- In the Supabase dashboard, create a public bucket called `oostkade-assets`
-- with folders: hero/, interior/, food/, drinks/, events/, terrace/, video/
