"use client";

import { useLogin } from "@/context/login-context";
import { motion, AnimatePresence } from "framer-motion";
import SupabaseAuthExample from "@/components/supabase-auth-example";

export default function ModalContainer() {
  const { isLoginOpen, closeLogin } = useLogin();

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLogin}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div
              className="relative max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <SupabaseAuthExample />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
