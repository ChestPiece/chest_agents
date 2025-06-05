"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// URLs and keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server client (for server components)
export async function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        try {
          cookieStore.set(name, value, options);
        } catch (error) {
          // This can be ignored if you have middleware refreshing user sessions
          console.error("Error setting cookie:", error);
        }
      },
      remove(name, options) {
        try {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        } catch (error) {
          // This can be ignored if you have middleware refreshing user sessions
          console.error("Error removing cookie:", error);
        }
      },
    },
  });
}
