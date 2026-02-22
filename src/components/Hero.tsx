import { useEffect, useState } from 'react';
import type { Profile } from '../types';
import type { I18n } from '../types';

interface HeroProps {
  i18n: I18n | null;
}

export const Hero = ({ i18n }: HeroProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/data/profile.json');
        const data = await response.json();
        setProfile(data);
        setAvatar(data.avatar);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  if (!i18n) return null;

  return (
    <section className="hero">
      <div className="hero-container">
        {avatar && (
          <div className="hero-avatar">
            <img src={avatar} alt="warasugi" loading="lazy" />
          </div>
        )}
        <div className="hero-content">
          <h1 className="hero-title">{i18n.hero.title}</h1>
          <p className="hero-subtitle">{i18n.hero.subtitle}</p>
          {profile && (
            <p className="hero-location">📍 {profile.location}</p>
          )}
        </div>
      </div>
    </section>
  );
};
