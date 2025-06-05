"use client";

import { useLogin } from "@/context/login-context";
import { motion, AnimatePresence } from "framer-motion";
import SupabaseAuthExample from "@/components/supabase-auth-example";
import { overlayVariants, modalVariants } from "@/lib/animation-variants";
import { X } from "lucide-react";

export default function ModalContainer() {
  const { isLoginOpen, closeLogin } = useLogin();

  return (
    <AnimatePresence mode="wait">
      {isLoginOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeLogin}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative max-w-md w-full mx-4 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                onClick={closeLogin}
                whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
              <SupabaseAuthExample />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
