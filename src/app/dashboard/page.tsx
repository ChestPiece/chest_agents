import { requireAuth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Chest Piece AI Agents",
  description: "Your Chest Piece AI Agents dashboard",
};

export default async function DashboardPage() {
  // This will redirect to /login if the user is not authenticated
  const user = await requireAuth();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This is a protected page that requires authentication.
        </p>

        <div className="mt-8">
          <h3 className="font-medium mb-2">Your Account Information:</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Last Sign In:</strong>{" "}
              {new Date(user.last_sign_in_at || "").toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
