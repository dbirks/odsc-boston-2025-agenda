import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize from localStorage on component mount
  useEffect(() => {
    const updateThemeState = () => {
      // Check if dark class is on the html element
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial state
    updateThemeState();

    // Set up a mutation observer to track class changes on html element
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          updateThemeState();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // State will be updated by the mutation observer
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-gray-700" />
      )}
    </button>
  );
}