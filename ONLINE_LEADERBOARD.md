# MIMO Online Leaderboard Setup

MIMO uses Supabase the same way as `typing-runner`: the browser can read the public leaderboard with the anon key, but score writes go through a Supabase Edge Function.

## 1. Create tables

Create a Supabase project, open SQL Editor, and run `supabase-schema.sql`.

The schema creates:

- `public.mimo_scores` for leaderboard records
- `public.mimo_sessions` for one-time signed game sessions
- `public.mimo_leaderboard_top_100` for ranked display

Only anonymous `SELECT` is enabled on scores. There is no anonymous insert policy.
The Edge Function keeps only the top 1000 stored scores. The browser displays the top 100.

## 2. Configure the static site

Edit `onlineConfig.js`:

```js
window.MIMO_ONLINE = {
  provider: "supabase",
  supabaseUrl: "https://YOUR_PROJECT_ID.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  edgeFunctionBaseUrl: "https://YOUR_PROJECT_ID.functions.supabase.co",
  edgeFunctionName: "mimo-score",
  table: "mimo_scores"
};
```

## 3. Deploy the Edge Function

Set secrets:

```bash
supabase secrets set MIMO_SESSION_SECRET="use-a-long-random-string"
supabase secrets set MIMO_SERVICE_ROLE_KEY="your-service-role-key"
supabase secrets set MIMO_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
```

Deploy:

```bash
supabase functions deploy mimo-score
```

The function endpoint supports:

- `?action=start` to create a signed run session
- `?action=submit` to verify the session and insert one score

If config is missing or Supabase is unavailable, the game keeps using local fallback scores.
