import { getUser } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";
import { User } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will not redirect, but will return null if not authenticated
  const user = await getUser();

  return (
    <div>
      <nav className="bg-white/90 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-md backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link
            href="/dashboard"
            className="text-xl font-bold bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] bg-clip-text text-transparent"
          >
            Dashboard
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-[150px] truncate">
                    {user.email}
                  </span>
                </div>
                <SignOutButton />
              </>
            ) : (
              <Link
                href="/login"
                className="bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
