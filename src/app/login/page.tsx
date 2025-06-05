import SupabaseAuthExample from "@/components/supabase-auth-example";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Chest Piece AI Agents",
  description: "Sign in to your Chest Piece AI Agents account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SupabaseAuthExample />
      </div>
    </div>
  );
}
