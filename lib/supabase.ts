import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project-ref") &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes("your-anon");

let clientPromise: Promise<SupabaseClient> | null = null;

// Lazy dynamic import: the Supabase library stays out of the initial page bundle
// and only loads when a component actually needs to talk to Supabase.
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then((m) =>
      m.createClient(supabaseUrl, supabaseAnonKey)
    );
  }
  return clientPromise;
}
