# warasugi - Portfolio

CLI-focused engineer. Lightweight systems, infrastructure design, and custom tools.

🌐 **Live Site**: https://warasugitewara.github.io/warasugi-portfolio/  
🔗 **GitHub**: https://github.com/warasugitewara

---

## ✨ Features

- **CLI-Oriented Design** - Terminal-inspired UI with boot animation
- **Lightweight & Fast** - ~192KB JS (gzip: 60KB), optimized for performance
- **Bilingual Support** - Japanese (日本語) / English with localStorage persistence
- **Dark/Light Theme** - Smooth theme toggle with system preference detection
- **GitHub Contributions** - Snake animation showing activity history
- **GitHub API Integration** - Real-time project showcase from GitHub
- **Responsive Design** - Mobile-first approach, works on all devices
- **Minimal Dependencies** - React + TypeScript only, no heavy frameworks
- **Accessible** - Proper semantic HTML, keyboard navigation, ARIA labels

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: CSS (NeoBrutalism design)
- **API Data**: GitHub API + JSON static data
- **i18n**: Custom hook with localStorage persistence
- **Deployment**: GitHub Pages with GitHub Actions

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Welcome section with avatar
│   ├── About.tsx             # Profile information
│   ├── Snake.tsx             # GitHub contributions animation
│   ├── Skills.tsx            # Technical skills grid
│   ├── Projects.tsx          # GitHub projects (API-driven)
│   ├── Contact.tsx           # Social links & contact info
│   └── BootAnimation.tsx     # Startup sequence
├── hooks/
│   ├── useI18n.ts            # Multi-language hook
│   └── useTheme.ts           # Dark/light theme hook
├── types/
│   └── index.ts              # TypeScript type definitions
├── styles/
│   └── main.css              # Global styles + animations
├── App.tsx                   # Main app component
└── main.tsx                  # Entry point

public/data/
├── profile.json              # User profile & social links
├── skills.json               # Skills data
├── i18n-ja.json              # Japanese translations
└── i18n-en.json              # English translations
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Performance

- **Bundle Size**: ~547KB JS (gzip: 96KB)
- **Initial Load**: ~1.5s on 3G
- **Lighthouse Target**: 90+
- **Optimizations**:
  - esbuild minification
  - CSS code splitting
  - DNS prefetch for external APIs
  - Lazy image loading
  - Reduced motion support

## 🌐 Multi-Language Support

Supports Japanese (default) and English. Language preference is saved to localStorage.

- `/data/i18n-ja.json` - Japanese
- `/data/i18n-en.json` - English

Switch language using the header language buttons.

## 📦 Data Management

All static data is stored as JSON files in `public/data/`:

- **profile.json** - Basic profile, social links, education
- **skills.json** - Technical skills categorized
- **philosophy.json** - Development principles
- **i18n-*.json** - Translations for all UI text

GitHub API is called dynamically to fetch real project data.

## 🎨 Design Philosophy

- **Minimal** - Only necessary elements, no bloat
- **Fast** - Optimized for edge and low-bandwidth connections
- **Accessible** - Respects user preferences (reduced motion, dark mode)
- **CLI-Friendly** - Terminal aesthetic, monospace fonts
- **Infrastructure-First** - Built with DevOps mindset

## 🔄 Continuous Deployment

This project uses GitHub Actions for automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds the project (`npm run build`)
3. SVG files for contribution snake are auto-generated every 24 hours
4. Output deployed to GitHub Pages (custom domain: https://wc.f5.si)

## 📝 License

MIT - Feel free to use as a template or reference.

---

**Made with CLI tools in Hokkaido** 🇯🇵
