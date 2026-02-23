import { useState, useEffect } from 'react';
import type { I18n } from '../types';

interface SnakeProps {
  i18n: I18n | null;
}

export const Snake = ({ i18n }: SnakeProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if dark mode is active
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme !== 'light');

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setIsDark(newTheme !== 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  if (!i18n) return null;

  const snakeUrl = isDark
    ? 'https://raw.githubusercontent.com/warasugitewara/.Warasugi-portfolio/output/github-contribution-grid-snake-dark.svg'
    : 'https://raw.githubusercontent.com/warasugitewara/.Warasugi-portfolio/output/github-contribution-grid-snake.svg';

  return (
    <section className="section snake">
      <div className="section-container">
        <h2 className="section-title">Contributions</h2>
        <div className="snake-container">
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://raw.githubusercontent.com/warasugitewara/.Warasugi-portfolio/output/github-contribution-grid-snake-dark.svg"
            />
            <source
              media="(prefers-color-scheme: light)"
              srcSet="https://raw.githubusercontent.com/warasugitewara/.Warasugi-portfolio/output/github-contribution-grid-snake.svg"
            />
            <img
              alt="github contribution grid snake animation"
              src={snakeUrl}
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
