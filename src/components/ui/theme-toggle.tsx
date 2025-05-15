import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

// Key for localStorage
const THEME_KEY = 'theme';

export function ThemeToggle() {
  // Track if dark mode is active
  const [isDark, setIsDark] = useState(false);
  
  // Initialize theme state on component mount
  useEffect(() => {
    // Check if dark mode is currently active in the DOM
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    // Get current state
    const newIsDark = !isDark;
    
    // Update DOM by adding/removing the dark class
    // This works with Tailwind v4's class strategy for dark mode
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem(THEME_KEY, newIsDark ? 'dark' : 'light');
    
    // Update state
    setIsDark(newIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Dark mode" : "Light mode"}
    >
      {isDark ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-gray-700" />
      )}
    </button>
  );
}