"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Footerdemo } from "@/components/ui/footer-section";
import { FullStudyChatAgent } from "@/components/ui/full-study-chat-agent";
import { useLogin } from "@/context/login-context";
import { Loader2 } from "lucide-react";

export default function StudyAgentPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { openLogin } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          // Redirect to login
          openLogin();
          // Give time for login modal to open, then navigate back to home
          setTimeout(() => {
            router.push("/?login=true");
          }, 100);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase, openLogin]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar1 />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading your study agent...</span>
        </div>
        <Footerdemo />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        {isAuthenticated ? (
          <FullStudyChatAgent />
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
            <p className="mb-6">Please sign in to access the Study Agent</p>
            <button
              onClick={openLogin}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Sign In
            </button>
          </div>
        )}
      </main>
      <Footerdemo />
    </div>
  );
}
