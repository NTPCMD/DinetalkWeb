create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  source text not null default 'retell',
  to_number text null,
  from_number text null,
  restaurant_id uuid null,
  status text null,
  error text null,
  payload jsonb null
);

create index if not exists webhook_events_received_at_idx
  on public.webhook_events (received_at desc);

alter table public.webhook_events enable row level security;

-- Allow ONLY the service_role (your Netlify function) to write/read.
drop policy if exists "service_role_all_webhook_events" on public.webhook_events;

create policy "service_role_all_webhook_events"
on public.webhook_events
for all
to service_role
using (true)
with check (true);
