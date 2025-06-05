/**
 * Smoothly scrolls to a target element with an optional offset and custom duration
 * @param target - The target element ID or selector
 * @param offset - Offset from the top of the element (default: 100)
 * @param duration - Duration of the animation in ms (default: 800)
 */
export function smoothScrollTo(
  target: string,
  offset: number = 100,
  duration: number = 800
): void {
  // Find the target element
  const targetElement =
    document.querySelector(target) ||
    document.getElementById(target.replace("#", ""));

  if (!targetElement) {
    console.warn(`Smooth scroll: Target element not found: ${target}`);
    return;
  }

  // Get the current scroll position
  const startPosition = window.pageYOffset;

  // Calculate the target position with offset
  const targetPosition =
    targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

  // Calculate distance to scroll
  const distance = targetPosition - startPosition;

  let startTime: number | null = null;

  // Animation function
  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const elapsedTime = currentTime - startTime;

    // Easing function - easeInOutCubic
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const run = easeInOutCubic(Math.min(elapsedTime / duration, 1));
    window.scrollTo(0, startPosition + distance * run);

    // Continue the animation if not complete
    if (elapsedTime < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Start the animation
  requestAnimationFrame(animation);
}

/**
 * Sets up smooth scrolling for all anchor links on the page
 * @param offset - Offset from the top of the element (default: 100)
 */
export function setupSmoothScrolling(offset: number = 100): void {
  // Only run on client side
  if (typeof window === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Find closest anchor tag if any
    const link = target.closest("a");

    if (link && link.hash && link.pathname === window.location.pathname) {
      e.preventDefault();
      smoothScrollTo(link.hash, offset);

      // Optionally update the URL
      window.history.pushState(null, "", link.hash);
    }
  });
}
