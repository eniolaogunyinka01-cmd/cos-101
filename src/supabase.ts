import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

/**
 * Lazily initializes and returns the Supabase client.
 * This prevents module-load-time crashes if environment variables are not set.
 */
export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
    const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Supabase configuration is missing. Please declare VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment/settings."
      );
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return supabaseClient;
}

/**
 * Checks if Supabase credentials have been configured and are valid.
 */
export function isSupabaseConfigured(): boolean {
  try {
    const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
    const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return false;
    }

    const urlStr = String(supabaseUrl).trim();
    const keyStr = String(supabaseAnonKey).trim();

    if (
      urlStr === "" ||
      keyStr === "" ||
      urlStr.includes("YOUR_") ||
      keyStr.includes("YOUR_") ||
      urlStr.includes("PLACEHOLDER") ||
      keyStr.includes("PLACEHOLDER") ||
      urlStr.includes("insert-") ||
      !urlStr.startsWith("http")
    ) {
      return false;
    }

    return true;
  } catch (e) {
    console.error("Error checking Supabase configuration status:", e);
    return false;
  }
}
