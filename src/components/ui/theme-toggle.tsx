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
    const handleChange = (e: MediaQueryListEvent) => {
      if (preference === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme, preference]);
  
  // Function to toggle the theme
  const toggleTheme = () => {
    // If currently using system preference or light theme, switch to dark theme
    if (preference === 'system' || activeTheme === 'light') {
      setPreference('dark');
      applyTheme('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } 
    // If using dark theme, switch to light theme
    else {
      setPreference('light');
      applyTheme('light');
      localStorage.setItem(THEME_KEY, 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={activeTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      {activeTheme === 'dark' ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-gray-700" />
      )}
    </button>
  );
}