"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface PageTransitionOptions {
  loadingDelay?: number;
  minLoadingTime?: number;
}

/**
 * Custom hook for managing page transitions with loading states
 * @param options - Configuration options for the page transition
 * @returns Object containing loading state and navigation functions
 */
export function usePageTransition(options: PageTransitionOptions = {}) {
  const { loadingDelay = 300, minLoadingTime = 500 } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  // Function to navigate to a new page with loading state
  const navigateTo = (path: string) => {
    // Don't trigger loading for the same page
    if (path === pathname) return;

    // Set loading state after a delay to avoid flashing for fast navigations
    const timeout = setTimeout(() => {
      setIsLoading(true);
      setLoadingStartTime(Date.now());
    }, loadingDelay);

    setLoadingTimeout(timeout);

    // Navigate to the new page
    router.push(path);
  };

  // Handle route change completion
  useEffect(() => {
    if (isLoading && loadingStartTime) {
      const currentDuration = Date.now() - loadingStartTime;

      // Ensure loading state is shown for at least minLoadingTime
      if (currentDuration < minLoadingTime) {
        const remainingTime = minLoadingTime - currentDuration;

        setTimeout(() => {
          setIsLoading(false);
          setLoadingStartTime(null);
        }, remainingTime);
      } else {
        setIsLoading(false);
        setLoadingStartTime(null);
      }
    }

    // Clean up timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  }, [pathname, isLoading, loadingStartTime, minLoadingTime, loadingTimeout]);

  return {
    isLoading,
    navigateTo,
    currentPath: pathname,
  };
}
