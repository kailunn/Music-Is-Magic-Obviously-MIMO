create table if not exists public.mimo_scores (
  id bigserial primary key,
  run_id text,
  name text not null,
  score integer not null,
  best_level integer not null,
  accuracy integer not null,
  monsters_captured integer not null,
  seconds integer not null,
  created_at timestamptz not null default now(),

  constraint mimo_score_valid check (score >= 0 and score <= 800),
  constraint mimo_best_level_valid check (best_level >= 1 and best_level <= 5),
  constraint mimo_accuracy_valid check (accuracy >= 0 and accuracy <= 100),
  constraint mimo_monsters_valid check (monsters_captured >= 0 and monsters_captured <= 20),
  constraint mimo_seconds_valid check (seconds >= 1 and seconds <= 3600)
);

create table if not exists public.mimo_sessions (
  run_id text primary key,
  player_name text not null,
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.mimo_scores
  add column if not exists run_id text;

create unique index if not exists mimo_scores_run_id_key
  on public.mimo_scores (run_id);

alter table public.mimo_scores enable row level security;
alter table public.mimo_sessions enable row level security;

drop policy if exists "public can read mimo scores" on public.mimo_scores;
create policy "public can read mimo scores"
on public.mimo_scores
for select
to anon
using (true);

drop view if exists public.mimo_leaderboard_top_10;
create view public.mimo_leaderboard_top_10 as
  select
    rank() over (
      order by score desc, best_level desc, accuracy desc, seconds asc, created_at asc
    ) as rank,
    name,
    score,
    best_level,
    accuracy,
    monsters_captured,
    seconds,
    created_at
  from public.mimo_scores
  order by score desc, best_level desc, accuracy desc, seconds asc, created_at asc
  limit 10;
