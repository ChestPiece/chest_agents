import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "./supabase-server";

/**
 * Check if a user is authenticated, redirect to login if not
 * Use in server components or server actions that require authentication
 */
export async function requireAuth() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * Get the current user if authenticated, return null if not
 * Safe to use in any server component
 */
export async function getUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Redirect to dashboard if already authenticated
 * Use in login/signup pages
 */
export async function redirectIfAuthenticated(redirectTo = "/dashboard") {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(redirectTo);
  }
}
