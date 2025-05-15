import { useState, useEffect, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';

// Key for localStorage
const THEME_KEY = 'user-theme-preference';

type ThemeMode = 'dark' | 'light' | 'system';

export function ThemeToggle() {
  // This tracks the user's preference (which can be system preference)
  const [preference, setPreference] = useState<ThemeMode>('system');
  
  // This tracks the actual active theme (always dark or light)
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('light');
  
  // Helper to apply theme to the document
  const applyTheme = useCallback((theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setActiveTheme(theme);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if user has saved a preference (could be 'system', 'dark', or 'light')
    const savedPreference = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    
    if (savedPreference) {
      setPreference(savedPreference);
      
      // If the preference is 'system', check system preference
      if (savedPreference === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      } else {
        // Otherwise apply the saved preference
        applyTheme(savedPreference);
      }
    } else {
      // Default to system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setPreference('system');
      applyTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Set up listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // The function needs to capture the current preference value to work correctly
    const handleChange = (e: MediaQueryListEvent) => {
      // Get the latest preference value
      const currentPreference = localStorage.getItem(THEME_KEY) as ThemeMode || 'system';
      
      // Only apply system preference changes if user hasn't selected explicit theme
      if (currentPreference === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]); // Only depend on applyTheme
  
  // Function to toggle through theme options: system -> light -> dark -> system
  const toggleTheme = () => {
    // If system preference -> light (explicit)
    if (preference === 'system') {
      setPreference('light');
      applyTheme('light');
      localStorage.setItem(THEME_KEY, 'light');
    }
    // If light (explicit) -> dark (explicit)
    else if (preference === 'light') {
      setPreference('dark');
      applyTheme('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    }
    // If dark (explicit) -> system preference
    else {
      setPreference('system');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
      localStorage.setItem(THEME_KEY, 'system');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={
        preference === 'system' 
          ? "Using system preference, click to switch to light mode" 
          : preference === 'light' 
            ? "Light mode enabled, click to switch to dark mode" 
            : "Dark mode enabled, click to switch to system preference"
      }
      title={
        preference === 'system' 
          ? "System preference" 
          : preference === 'light' 
            ? "Light mode" 
            : "Dark mode"
      }
    >
      {activeTheme === 'dark' ? (
        <Sun size={16} className={preference === 'system' ? "text-yellow-300 opacity-80" : "text-yellow-400"} />
      ) : (
        <Moon size={16} className={preference === 'system' ? "text-gray-600 opacity-80" : "text-gray-700"} />
      )}
    </button>
  );
}