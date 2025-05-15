import { useState, useEffect, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';

// Key for localStorage
const THEME_KEY = 'user-theme-preference';

type ThemeMode = 'dark' | 'light';

export function ThemeToggle() {
  // This tracks the active theme (dark or light)
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('light');
  
  // Helper to apply theme to the document
  const applyTheme = useCallback((theme: ThemeMode) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setActiveTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, []);

  // On mount: initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      // Use saved theme if it exists
      applyTheme(savedTheme);
    } else {
      // Otherwise use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      applyTheme(initialTheme);
    }
  }, [applyTheme]);

  // Simple toggle between dark and light
  const toggleTheme = () => {
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={activeTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      title={activeTheme === 'dark' ? "Dark mode" : "Light mode"}
    >
      {activeTheme === 'dark' ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-gray-700" />
      )}
    </button>
  );
}