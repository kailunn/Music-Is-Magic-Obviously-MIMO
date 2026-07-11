import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const allowedOrigins = new Set([
  "https://kailunn.github.io",
  "https://suzyhuang.github.io",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:5173",
  "http://[::1]:3000",
  "http://[::1]:4173",
  "http://[::1]:5173",
]);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(text: string): Uint8Array {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((text.length + 3) % 4);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signPayload(payload: Record<string, unknown>, secret: string) {
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${base64UrlEncode(new Uint8Array(sig))}`;
}

async function verifyPayload(token: string, secret: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const key = await importHmacKey(secret);
  const ok = await crypto.subtle.verify("HMAC", key, base64UrlDecode(sig), encoder.encode(body));
  if (!ok) return null;
  return JSON.parse(decoder.decode(base64UrlDecode(body))) as Record<string, unknown>;
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function clampInt(value: unknown, min: number, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

function getSecret(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function getOptionalSecret(...names: string[]) {
  for (const name of names) {
    const value = Deno.env.get(name);
    if (value) return value;
  }
  throw new Error(`Missing env var: ${names.join(" or ")}`);
}

export default {
  fetch: async (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return json(405, { error: "Method not allowed" });
    }

    try {
      const url = new URL(req.url);
      const action = url.searchParams.get("action");
      const origin = req.headers.get("origin") || "";
      if (!allowedOrigins.has(origin)) {
        return json(403, { error: `Disallowed origin: ${origin || "missing"}` });
      }

      const sessionSecret = getSecret("MIMO_SESSION_SECRET");
      const supabaseUrl = getOptionalSecret("MIMO_SUPABASE_URL", "SUPABASE_URL");
      const supabaseServiceKey = getSecret("MIMO_SERVICE_ROLE_KEY");
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      if (action === "start") {
        const { playerName } = await req.json();
        const safeName = String(playerName || "").trim().slice(0, 18);
        if (!safeName) return json(400, { error: "Player name required" });

        const runId = crypto.randomUUID();
        const payload = {
          runId,
          playerName: safeName,
          issuedAt: nowSeconds(),
          expiresAt: nowSeconds() + 60 * 20,
        };

        const { error } = await supabase.from("mimo_sessions").insert({
          run_id: runId,
          player_name: safeName,
          issued_at: new Date(payload.issuedAt * 1000).toISOString(),
          expires_at: new Date(payload.expiresAt * 1000).toISOString(),
        });
        if (error) return json(400, { error: error.message });

        return json(200, { token: await signPayload(payload, sessionSecret), runId });
      }

      if (action === "submit") {
        const body = await req.json();
        const session = await verifyPayload(String(body?.token || ""), sessionSecret);
        if (!session) return json(401, { error: "Invalid session" });
        if (Number(session.expiresAt) < nowSeconds()) return json(401, { error: "Session expired" });

        const runId = String(session.runId || "");
        const { data: sessionRow, error: sessionFetchError } = await supabase
          .from("mimo_sessions")
          .select("run_id,player_name,issued_at,expires_at,used_at")
          .eq("run_id", runId)
          .maybeSingle();
        if (sessionFetchError) return json(400, { error: sessionFetchError.message });
        if (!sessionRow) return json(401, { error: "Session not found" });
        if (sessionRow.used_at) return json(409, { error: "Session already used" });
        if (new Date(sessionRow.expires_at).getTime() < Date.now()) return json(401, { error: "Session expired" });

        const name = String(sessionRow.player_name || session.playerName || "").trim().slice(0, 18);
        const score = clampInt(body?.score, 0, 800);
        const bestLevel = clampInt(body?.bestLevel, 1, 5);
        const accuracy = clampInt(body?.accuracy, 0, 100);
        const monstersCaptured = clampInt(body?.monstersCaptured, 0, 20);
        const serverSeconds = Math.max(1, Math.floor((Date.now() - new Date(sessionRow.issued_at).getTime()) / 1000));

        if (!runId || !name || score === null || bestLevel === null || accuracy === null || monstersCaptured === null) {
          return json(400, { error: "Invalid score payload" });
        }

        if (serverSeconds < 10) return json(400, { error: "Run too short" });

        const { data: claimedSession, error: claimError } = await supabase
          .from("mimo_sessions")
          .update({ used_at: new Date().toISOString() })
          .eq("run_id", runId)
          .is("used_at", null)
          .select("run_id")
          .maybeSingle();
        if (claimError) return json(400, { error: claimError.message });
        if (!claimedSession) return json(409, { error: "Session already used" });

        const { error } = await supabase.from("mimo_scores").insert({
          run_id: runId,
          name,
          score,
          best_level: bestLevel,
          accuracy,
          monsters_captured: monstersCaptured,
          seconds: serverSeconds,
        });

        if (error) return json(400, { error: error.message });
        return json(200, { ok: true });
      }

      return json(404, { error: "Not found" });
    } catch (error) {
      return json(500, { error: error instanceof Error ? error.message : "Unknown error" });
    }
  },
};
