// This script runs before React hydration, setting the initial theme to prevent flash
export function ThemeScript() {
  const themeScript = `
    (function() {
      function getThemePreference() {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      const theme = getThemePreference();
      
      // Immediately apply theme to prevent flash
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.style.colorScheme = theme;
    })();
  `;

  // Using dangerouslySetInnerHTML as this is a critical script that needs to run before rendering
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
