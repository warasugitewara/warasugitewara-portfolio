import { useEffect, useState } from 'react';
import type { I18n, Profile } from '../types';

interface ContactProps {
  i18n: I18n | null;
}

export const Contact = ({ i18n }: ContactProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/data/profile.json');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  if (!i18n || !profile) return null;

  return (
    <section id="contact" className="section contact">
      <div className="section-container">
        <h2 className="section-title">{i18n.contact.title}</h2>
        <div className="contact-links">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="icon">→</span>
            <span className="label">{i18n.contact.github}</span>
          </a>
          <a
            href={profile.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="icon">→</span>
            <span className="label">{i18n.contact.twitter}</span>
          </a>
          <a
            href={profile.socials.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="icon">→</span>
            <span className="label">{i18n.contact.discord}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
