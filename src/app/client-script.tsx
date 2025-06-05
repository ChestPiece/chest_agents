"use client";

import { useEffect } from "react";
import { setupSmoothScrolling } from "@/lib/smooth-scroll";

export function ClientScript() {
  useEffect(() => {
    // Set up smooth scrolling for all anchor links
    setupSmoothScrolling(80);

    // Scroll to hash on initial load if present
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    // Add any other client-side initialization here
  }, []);

  // This component doesn't render anything
  return null;
}
