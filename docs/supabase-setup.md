# Supabase Setup Guide

This guide explains how to set up and use Supabase in the Chest Piece AI Agents project.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase project dashboard under Project Settings > API.

## Project Setup

The following components have been set up in the project:

1. **Supabase Client**: Located at `src/lib/supabase.ts`
2. **Supabase Context**: Located at `src/context/supabase-context.tsx`
3. **Root Layout Integration**: The SupabaseProvider has been added to the app's root layout

## Using Supabase in Components

To use Supabase in your components, import the `useSupabase` hook:

```tsx
"use client";

import { useSupabase } from "@/context/supabase-context";

export default function MyComponent() {
  const { supabase, session, user, loading } = useSupabase();

  // Example: Fetch data from Supabase
  async function fetchData() {
    const { data, error } = await supabase.from("your_table").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    console.log("Data:", data);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <p>Logged in as: {user.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}
```

## Authentication

You can implement authentication using Supabase Auth:

```tsx
"use client";

import { useState } from "react";
import { useSupabase } from "@/context/supabase-context";

export default function AuthComponent() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error);
      return;
    }

    console.log("Signed up:", data);
  }

  async function handleSignIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
      return;
    }

    console.log("Signed in:", data);
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return;
    }

    console.log("Signed out");
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
```

## Database Operations

Example of database operations with Supabase:

```tsx
// Insert data
const { data, error } = await supabase
  .from("your_table")
  .insert([{ column1: "value1", column2: "value2" }]);

// Update data
const { data, error } = await supabase
  .from("your_table")
  .update({ column1: "new_value" })
  .eq("id", 1);

// Delete data
const { data, error } = await supabase.from("your_table").delete().eq("id", 1);
```

## Storage

Example of using Supabase Storage:

```tsx
// Upload a file
const { data, error } = await supabase.storage
  .from("bucket_name")
  .upload("file_path", file);

// Download a file
const { data, error } = await supabase.storage
  .from("bucket_name")
  .download("file_path");
```

## Next Steps

1. Create database tables in your Supabase project
2. Set up Row Level Security (RLS) policies
3. Implement authentication flows
4. Create API endpoints for your application
