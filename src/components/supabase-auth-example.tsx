"use client";

import { useState } from "react";
import { useSupabase } from "@/context/supabase-context";

export default function SupabaseAuthExample() {
  const { supabase, user, loading } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp() {
    setMessage("Signing up...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error signing up: ${error.message}`);
      return;
    }

    setMessage("Sign up successful! Check your email for confirmation.");
  }

  async function handleSignIn() {
    setMessage("Signing in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error signing in: ${error.message}`);
      return;
    }

    setMessage("Signed in successfully!");
  }

  async function handleSignOut() {
    setMessage("Signing out...");
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(`Error signing out: ${error.message}`);
      return;
    }

    setMessage("Signed out successfully!");
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Supabase Authentication</h2>

      {user ? (
        <div className="mb-4">
          <p className="text-green-600">Logged in as: {user.email}</p>
          <button
            onClick={handleSignOut}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSignUp}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="mt-4 p-2 border rounded bg-gray-50">{message}</div>
      )}
    </div>
  );
}
