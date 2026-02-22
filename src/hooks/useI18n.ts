import { useEffect, useState } from 'react';
import type { Language, I18n } from '../types';

export const useI18n = (defaultLang: Language = 'ja') => {
  const [lang, setLang] = useState<Language>(defaultLang);
  const [i18n, setI18n] = useState<I18n | null>(null);

  // Get base path from import.meta.env.BASE_URL
  const basePath = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang) {
      setLang(savedLang);
    }

    // Load i18n file
    const loadI18n = async () => {
      try {
        const fileName = savedLang || defaultLang;
        const url = `${basePath}data/i18n-${fileName}.json`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load i18n from ${url}: ${response.status}`);
        }
        const data = await response.json();
        setI18n(data);
      } catch (error) {
        console.error('Failed to load i18n:', error);
        // Set minimal fallback
        setI18n({
          nav: {},
          hero: { title: 'warasugi', subtitle: 'Loading...' },
          about: { title: 'About', description: 'Loading...' },
          skills: { title: 'Skills', languages: '', tools: '', backend: '', certifications: '' },
          projects: { title: 'Projects', pinned: '' },
          philosophy: { title: 'Philosophy' },
          contact: { title: 'Contact', github: 'GitHub', twitter: 'Twitter', discord: 'Discord' },
          footer: { copyright: '© 2026 warasugi' },
        });
      }
    };

    loadI18n();
  }, [basePath]);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    // Reload i18n
    const url = `${basePath}data/i18n-${newLang}.json`;
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load i18n: ${r.status}`);
        return r.json();
      })
      .then(data => setI18n(data))
      .catch(e => console.error('Failed to load i18n:', e));
  };

  return { lang, i18n, switchLanguage };
};
