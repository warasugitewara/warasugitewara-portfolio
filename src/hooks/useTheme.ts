import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = (defaultTheme: Theme = 'dark') => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Get saved theme from localStorage or detect system preference
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const detectedTheme: Theme = prefersDark ? 'dark' : 'light';
      setTheme(detectedTheme);
      document.documentElement.setAttribute('data-theme', detectedTheme);
    }
  }, []);

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    switchTheme(newTheme);
  };

  return { theme, switchTheme, toggleTheme };
};
