"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { useLogin } from "@/context/login-context";
import { useSupabase } from "@/context/supabase-context";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { openLogin } = useLogin();
  const { user, signOut } = useSupabase();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Updated navigation items for important app sections
  const navItems = useMemo(
    () => [
      { name: "Home", href: "#", id: "home" },
      { name: "Team", href: "#team", id: "team" },
      { name: "Testimonials", href: "#testimonials", id: "testimonials" },
      { name: "FAQs", href: "#faqs", id: "faqs" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Determine which section is currently in view
      const sections = navItems
        .map((item) => item.id)
        .filter((id) => id !== "home");

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            return;
          }
        }
      }

      // If we're at the top, set active to home
      if (scrollPosition < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string, itemId: string) => {
    // Visual feedback - set active immediately for better UX
    setActiveSection(itemId);

    if (sectionId === "#") {
      // Scroll to top with animation
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        // Add offset to account for sticky header
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    if (isOpen) toggleMenu();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex justify-center w-full py-6 px-4 sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4 bg-white/90 dark:bg-gray-900/95 rounded-full shadow-lg w-full max-w-4xl relative z-10 backdrop-blur-sm">
        <div className="flex items-center cursor-pointer">
          <motion.div
            className="mr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span
              onClick={() => scrollToSection("#", "home")}
              className="text-xl font-bold bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] bg-clip-text text-transparent cursor-pointer"
            >
              Chest Piece AI
            </span>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 cursor-pointer">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => scrollToSection(item.href, item.id)}
                className="text-sm relative font-medium group overflow-hidden cursor-pointer"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span
                  className={`${
                    activeSection === item.id
                      ? "text-primary font-semibold"
                      : "text-gray-900 dark:text-white"
                  } transition-colors duration-300`}
                >
                  {item.name}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] transition-all duration-300 group-hover:w-full ${
                    activeSection === item.id ? "w-full" : ""
                  }`}
                ></span>

                {/* Click ripple effect */}
                <motion.span
                  className="absolute inset-0 bg-primary/10 rounded-full pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.5, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </div>
                <motion.button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black dark:text-white bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md transition-all relative overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="relative z-10">Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={openLogin}
                className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] rounded-full hover:shadow-lg transition-all relative overflow-hidden cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get Started</span>

                {/* Click ripple effect */}
                <motion.span
                  className="absolute inset-0 bg-white/20 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex items-center relative overflow-hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-gray-900 dark:text-white relative z-10" />

          {/* Click ripple effect */}
          <motion.span
            className="absolute inset-0 bg-primary/10 rounded-full pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 2, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-24 px-6 md:hidden backdrop-blur-sm"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900 dark:text-white" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.href, item.id)}
                    className={`text-base font-medium relative overflow-hidden cursor-pointer ${
                      activeSection === item.id
                        ? "text-primary font-semibold"
                        : "text-gray-900 dark:text-white"
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {activeSection === item.id && (
                      <motion.span
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                        layoutId="activeMobileIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Click ripple effect */}
                    <motion.span
                      className="absolute inset-0 bg-primary/10 rounded-full pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 1.5, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-4"
                whileTap={{ scale: 0.95 }}
              >
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-4 py-3 text-base text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl">
                      <User className="h-5 w-5" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        toggleMenu();
                        handleSignOut();
                      }}
                      className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-black dark:text-white bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      toggleMenu();
                      openLogin();
                    }}
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] rounded-full hover:shadow-lg transition-all relative overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">Get Started</span>

                    {/* Click ripple effect */}
                    <motion.span
                      className="absolute inset-0 bg-white/20 pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 2, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
