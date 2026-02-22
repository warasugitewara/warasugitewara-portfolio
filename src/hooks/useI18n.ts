import { useEffect, useState } from 'react';
import type { Language, I18n } from '../types';

export const useI18n = (defaultLang: Language = 'ja') => {
  const [lang, setLang] = useState<Language>(defaultLang);
  const [i18n, setI18n] = useState<I18n | null>(null);

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
        const response = await fetch(`/data/i18n-${fileName}.json`);
        const data = await response.json();
        setI18n(data);
      } catch (error) {
        console.error('Failed to load i18n:', error);
      }
    };

    loadI18n();
  }, []);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    // Reload i18n
    fetch(`/data/i18n-${newLang}.json`)
      .then(r => r.json())
      .then(data => setI18n(data))
      .catch(e => console.error('Failed to load i18n:', e));
  };

  return { lang, i18n, switchLanguage };
};
