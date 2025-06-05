"use client";

import { useState } from "react";
import { useSupabase } from "@/context/supabase-context";
import { createClient } from "@/lib/supabase-client";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "@/context/login-context";

export default function SupabaseAuthExample() {
  const { user, loading, signIn, signOut } = useSupabase();
  const { closeLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  async function handleMagicLink() {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setIsProcessing(true);
    setMessage("Sending magic link...");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      setShowSuccessPopup(true);
      setMessage("Magic link sent! Check your email.");
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleSignIn() {
    if (!email || !password) {
      setMessage("Please enter both email and password");
      return;
    }

    setIsProcessing(true);
    setMessage("Signing in...");

    try {
      await signIn(email, password);
      setMessage("Signed in successfully!");
      closeLogin();
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      setMessage("Please enter both email and password");
      return;
    }

    setIsProcessing(true);
    setMessage("Signing up...");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      // Show success popup and switch to login form
      setShowSuccessPopup(true);
      setIsSignUp(false);
      setMessage("Sign up successful! Check your email for confirmation.");
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleAnonymousLogin() {
    setIsProcessing(true);
    setMessage("Signing in anonymously...");

    try {
      const supabase = createClient();
      // Generate a unique identifier for anonymous users
      const anonymousId = `anon_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 10)}`;
      const anonymousEmail = `${anonymousId}@anonymous.chest.piece`;
      // Create a strong random password
      const anonymousPassword = `${Math.random()
        .toString(36)
        .slice(2)}${Math.random().toString(36).slice(2)}!A1`;

      const { data, error } = await supabase.auth.signUp({
        email: anonymousEmail,
        password: anonymousPassword,
        options: {
          data: {
            is_anonymous: true,
            created_at: new Date().toISOString(),
          },
        },
      });

      if (error) throw error;
      setMessage("Signed in anonymously!");
      closeLogin();
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleSignOut() {
    setIsProcessing(true);
    setMessage("Signing out...");

    try {
      await signOut();
      setMessage("Signed out successfully!");
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
          className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-black p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
          >
            Welcome back!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-orange-600"
          >
            Logged in as: {user.email || "Anonymous User"}
          </motion.p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          disabled={isProcessing}
          className="w-full p-3 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Processing...
            </span>
          ) : (
            "Sign Out"
          )}
        </motion.button>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded text-center text-sm text-gray-900 dark:text-white"
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="relative bg-white dark:bg-black rounded-lg shadow-lg p-8 max-w-md w-full mx-auto"
    >
      {/* No close button needed - removed to prevent duplicate X buttons */}

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 rounded-lg"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 0,
                }}
                className="mx-auto mb-4 text-green-500 flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Check Your Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We've sent you a confirmation link. Please check your email to
                complete the process.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSuccessPopup(false)}
                className="w-full p-2 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium"
              >
                Got it
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading spinner logo */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
          className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
        />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <motion.h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
          {isSignUp ? "Create an account" : "Welcome back!"}
        </motion.h1>
        <motion.p className="text-gray-600 dark:text-gray-300">
          {isSignUp ? "Already have an account? " : "First time here? "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSignUp(!isSignUp);
              setShowPassword(true);
            }}
            className="text-orange-500 hover:underline"
          >
            {isSignUp ? "Sign in" : "Sign up for free"}
          </motion.button>
        </motion.p>
      </motion.div>

      {/* Form */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
        </motion.div>

        <AnimatePresence>
          {showPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={
            isSignUp
              ? handleSignUp
              : !showPassword
              ? handleMagicLink
              : handleSignIn
          }
          disabled={isProcessing}
          className="w-full p-3 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Processing...
            </span>
          ) : isSignUp ? (
            "Create account"
          ) : !showPassword ? (
            "Send me the magic link"
          ) : (
            "Sign in"
          )}
        </motion.button>
      </div>

      {/* Password toggle - only show when not in signup mode */}
      {!isSignUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
          >
            {showPassword ? "Use magic link instead" : "Sign in using password"}
          </motion.button>
        </motion.div>
      )}

      {/* Only show divider and SSO when not in signup mode */}
      {!isSignUp && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
              <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">
                OR
              </span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
            </div>

            {/* SSO Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  setIsProcessing(true);
                  setMessage("Initiating SSO login...");
                  const supabase = createClient();

                  // You can replace this with your actual SSO provider
                  // For example, Google, GitHub, or a custom SAML provider
                  const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${window.location.origin}/auth/callback`,
                    },
                  });

                  if (error) throw error;

                  // The user will be redirected to the OAuth provider
                } catch (error) {
                  setMessage(
                    `Error: ${
                      error instanceof Error ? error.message : String(error)
                    }`
                  );
                  setIsProcessing(false);
                }
              }}
              disabled={isProcessing}
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-70"
            >
              {isProcessing ? "Connecting..." : "Single sign-on (SSO)"}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Anonymous login option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnonymousLogin}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
        >
          Continue as guest
        </motion.button>
      </motion.div>

      {/* Terms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center text-gray-500 dark:text-gray-400 text-xs"
      >
        You acknowledge that you read, and agree, to our{" "}
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          Terms of Service
        </a>{" "}
        and our{" "}
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          Privacy Policy
        </a>
      </motion.div>

      {/* Message display with animation */}
      <AnimatePresence>
        {message && !showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 rounded text-center text-sm text-gray-900 dark:text-white"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
