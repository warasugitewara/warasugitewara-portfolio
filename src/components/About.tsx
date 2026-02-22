import type { I18n, Profile } from '../types';
import { useEffect, useState } from 'react';
import { getDataUrl } from '../utils/path';

interface AboutProps {
  i18n: I18n | null;
}

export const About = ({ i18n }: AboutProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(getDataUrl('profile.json'));
        if (!response.ok) throw new Error(`Failed to load profile: ${response.status}`);
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
    <section id="about" className="section about">
      <div className="section-container">
        <h2 className="section-title">{i18n.about.title}</h2>
        <div className="about-content">
          <div className="about-text">
            <p>{i18n.about.description}</p>
            <p className="about-school">
              <strong>学歴:</strong> {profile.school}
            </p>
          </div>
          <div className="about-details">
            <div className="detail-item">
              <span className="label">Name</span>
              <span className="value">{profile.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Location</span>
              <span className="value">{profile.location}</span>
            </div>
            <div className="detail-item">
              <span className="label">GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="value link">
                @warasugitewara
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
