import { useEffect, useState } from 'react';
import { useI18n } from './hooks/useI18n';
import { BootAnimation } from './components/BootAnimation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import type { Language } from './types';

function App() {
  const { lang, i18n, switchLanguage } = useI18n('ja');
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Set document language
    document.documentElement.lang = lang;
  }, [lang]);

  if (!i18n) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {showBoot && <BootAnimation onComplete={() => setShowBoot(false)} />}
      <header className="header">
        <div className="header-wrapper">
          <div className="header-content">
            <h1 className="header-title">
              <a href="#" className="header-link">
                warasugi
              </a>
            </h1>
          </div>
          <nav className="header-nav">
            <a href="#about" className="nav-link">
              {i18n.nav.about}
            </a>
            <a href="#skills" className="nav-link">
              {i18n.nav.skills}
            </a>
            <a href="#projects" className="nav-link">
              {i18n.nav.projects}
            </a>
            <a href="#philosophy" className="nav-link">
              {i18n.nav.philosophy}
            </a>
            <a href="#contact" className="nav-link">
              {i18n.nav.contact}
            </a>
            <div className="lang-switcher">
              <button
                className={`lang-btn ${lang === 'ja' ? 'active' : ''}`}
                onClick={() => switchLanguage('ja')}
              >
                日本語
              </button>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => switchLanguage('en')}
              >
                English
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="main">
        <Hero i18n={i18n} />
        <About i18n={i18n} />
        <Skills i18n={i18n} />
        <Projects i18n={i18n} />
        <Philosophy i18n={i18n} />
        <Contact i18n={i18n} />
      </main>

      <footer className="footer">
        <p>{i18n.footer.copyright}</p>
      </footer>
    </div>
  );
}

export default App;
