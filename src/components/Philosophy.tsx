import { useEffect, useState } from 'react';
import type { I18n } from '../types';

interface Principle {
  title: string;
  description: string;
}

interface PhilosophyProps {
  i18n: I18n | null;
}

export const Philosophy = ({ i18n }: PhilosophyProps) => {
  const [principles, setPrinciples] = useState<Principle[]>([]);

  useEffect(() => {
    const loadPhilosophy = async () => {
      try {
        const response = await fetch('/data/philosophy.json');
        const data = await response.json();
        setPrinciples(data.philosophy.principles);
      } catch (error) {
        console.error('Failed to load philosophy:', error);
      }
    };

    loadPhilosophy();
  }, []);

  if (!i18n) return null;

  return (
    <section id="philosophy" className="section philosophy">
      <div className="section-container">
        <h2 className="section-title">{i18n.philosophy.title}</h2>
        <div className="principles-grid">
          {principles.map((principle) => (
            <div key={principle.title} className="principle-card">
              <h3 className="principle-title">{principle.title}</h3>
              <p className="principle-description">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
