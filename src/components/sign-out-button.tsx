"use client";

import { useSupabase } from "@/context/supabase-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { signOut } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black dark:text-white bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-70 cursor-pointer"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
