import { useState, useEffect } from 'react';
import type { I18n } from '../types';

interface SnakeProps {
  i18n: I18n | null;
}

export const Snake = ({ i18n }: SnakeProps) => {
  const [isDark, setIsDark] = useState(true);
  const [hasSnake, setHasSnake] = useState(false);

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

    // Check if snake SVG exists (by trying to fetch it)
    const checkSnake = async () => {
      try {
        const url = isDark
          ? '/github-contribution-grid-snake-dark.svg'
          : '/github-contribution-grid-snake.svg';
        
        const response = await fetch(url);
        setHasSnake(response.ok);
      } catch (e) {
        setHasSnake(false);
      }
    };

    checkSnake();

    return () => observer.disconnect();
  }, [isDark]);

  if (!i18n) return null;

  const snakeDarkUrl = '/github-contribution-grid-snake-dark.svg';
  const snakeLightUrl = '/github-contribution-grid-snake.svg';

  return (
    <section className="section snake">
      <div className="section-container">
        <h2 className="section-title">Contributions</h2>
        <div className="snake-container">
          {hasSnake ? (
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet={snakeDarkUrl}
              />
              <source
                media="(prefers-color-scheme: light)"
                srcSet={snakeLightUrl}
              />
              <img
                alt="github contribution grid snake animation"
                src={snakeDarkUrl}
                loading="lazy"
              />
            </picture>
          ) : (
            <div className="snake-placeholder">
              <p>🐍 GitHub contribution animation generating...</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                Trigger the workflow on GitHub Actions to generate the snake animation
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
