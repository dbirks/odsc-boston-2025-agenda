import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

// Completely rewritten implementation to fix persistent dark mode issues

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // On mount, determine current theme from DOM state
  useEffect(() => {
    // Check directly what's in the DOM
    const isDarkMode = document.documentElement.classList.contains('dark');
    setTheme(isDarkMode ? 'dark' : 'light');
    
    console.log('Initial theme:', isDarkMode ? 'dark' : 'light');
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    console.log('Toggle clicked. Current theme:', theme);
    
    // Calculate new theme (opposite of current)
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Switching to:', newTheme);
    
    // Update document class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store preference
    localStorage.setItem('theme', newTheme);
    
    // Update state
    setTheme(newTheme);
    
    console.log('After toggle - classList:', document.documentElement.classList.toString());
  };
  
  // Force component to render with correct icon based on actual DOM state
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark');
          setTheme(isDarkMode ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Debug function - double click to reset
  const resetTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Double-click detected - Resetting theme preference');
    localStorage.removeItem('theme');
    
    // Apply system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update state
    setTheme(prefersDark ? 'dark' : 'light');
    
    console.log('Theme reset to system preference:', prefersDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      onDoubleClick={resetTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === 'dark' ? "Dark mode (click to switch to light)" : "Light mode (click to switch to dark)"}
    >
      {theme === 'dark' ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-gray-700" />
      )}
    </button>
  );
}