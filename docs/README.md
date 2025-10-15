# 🌟 MeridianAlgo - Democratizing Financial Literacy

[![GitHub stars](https://img.shields.io/github/stars/MeridianAlgo/Website.svg)](https://github.com/MeridianAlgo/Website/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/MeridianAlgo/Website.svg)](https://github.com/MeridianAlgo/Website/issues)
[![GitHub license](https://img.shields.io/github/license/MeridianAlgo/Website.svg)](https://github.com/MeridianAlgo/Website/blob/main/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/MeridianAlgo/Website.svg)](https://github.com/MeridianAlgo/Website/tags)

> A modern, open-source platform dedicated to strengthening financial literacy across Midwestern communities through education, research, and accessible technology.

## 📋 Overview

MeridianAlgo is a student-led initiative that bridges the gap between complex financial concepts and practical, accessible education. We provide open-source learning tools, educational resources, and research papers to empower individuals from all backgrounds to build wealth with confidence.

### 🎯 Mission
> "Expand financial literacy and wealth-building confidence through open-source education, community-driven research, and accessible technology."

## ✨ Features

### 🚀 Main Features
- **Modern React Application** - Built with React 18, TypeScript, and Vite
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Open Source Showcase** - 10+ active GitHub repositories
- **Newsletter System** - Educational financial content delivery
- **Team Showcase** - Detailed team structure and roles
- **Research Publications** - Academic papers and research findings
- **Contact Integration** - Formspree-powered contact forms
- **SEO Optimized** - Meta tags, Open Graph, and Twitter cards
- **PWA Ready** - Progressive Web App capabilities

### 📊 Pages & Sections
- **Home** - Hero section, features, open source showcase, advantages
- **About** - Mission, team structure, research areas
- **Open Source** - GitHub repositories with filtering
- **Research** - Publications and research focus areas
- **Partnerships** - Collaborations and partnerships
- **Contact** - Contact forms and information
- **Newsletters** - Educational content archives

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type safety and better developer experience
- **Vite 7.1.5** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS 8.4.35** - CSS processing and optimization
- **Lucide React 0.344.0** - Beautiful icon library

### Additional Libraries
- **React Router DOM 6.20.1** - Client-side routing
- **React Markdown 10.1.0** - Markdown rendering
- **Formspree React 2.5.1** - Contact form handling

### Development Tools
- **ESLint 9.9.1** - Code linting and formatting
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MeridianAlgo/Website.git
cd Website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

## Financial News Hub

MeridianAlgo now includes a curated financial news experience designed for learners who want real-time market awareness.

- **Dynamic Filtering**: Filter headlines by category, sentiment, and importance to focus on what matters most.
- **Smart Sorting**: Sort by latest, oldest, impact, or sentiment strength to tailor the news feed.
- **Searchable Feed**: Quickly find stories by keywords, company names, or sources.
- **Curated Summaries**: Hand-picked summaries with quick links to trusted publications.

All data for the news section lives in `src/data/financialNews.ts`, making it easy to extend or connect to a live API later.

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Website-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.tsx      # Site footer with links
│   │   ├── Navbar.tsx      # Navigation header
│   │   └── NewsletterCard.tsx # Newsletter display component
│   ├── pages/              # Route pages
│   │   ├── Home.tsx        # Landing page
│   │   ├── About.tsx       # About us page
│   │   ├── OpenSource.tsx  # GitHub repos showcase
│   │   ├── Research.tsx    # Research publications
│   │   ├── Partnerships.tsx # Partner organizations
│   │   ├── Contact.tsx     # Contact information
│   │   └── Newsletters.tsx # Newsletter archives
│   ├── App.tsx             # App shell with routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind
├── public/
│   ├── newsletters/        # PDF newsletters and manifest
│   ├── legal/              # Privacy policy and terms
│   └── assets/             # Images and static files
├── meridianalgo-docs/      # Documentation site (Docusaurus)
├── requirements.txt        # Python dependencies
   # In another terminal, start frontend
   npm run dev
   ```

### Usage
- Access financial tools via `/tools` or click "Financial Tools" in the dashboard
- Use interactive calculators for budgeting, savings, and investments
- Get educational information with appropriate disclaimers

> **Note**: The tools provide educational information only, not personalized financial advice. Users are always reminded to consult qualified financial professionals.

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on the codebase |

## 🌐 Open Source Projects

This website showcases **10 active GitHub repositories**:

### Community Programs & Tools
- **In-NodeJS** - Interactive Node.js simulations for community financial literacy workshops.
- **BitFlow** - Real-time data exploration engine that helps classrooms analyze markets and personal finance scenarios.
- **JavaScript Packages** - Utilities for building financial literacy dashboards and interactive lessons.
- **Utilities** - Scripts that support community surveys, events, and research coordination.

### Education & Curriculum
- **In-Pine** - Pine Script lessons that visualize market movements and personal finance concepts.
- **Python Library** - Budgeting labs, classroom activities, and community data storytelling utilities.
- **Ara** - Machine learning tools that support financial equity research and academic projects.
- **Cryptvault** - ML-powered charting resources for comparing savings and investment case studies.

### Research Collections
- **Option Pricing Research** - Financial models used to teach risk management and pricing fundamentals.
- **TimeSeries Research** - Time-series analysis for forecasting Midwestern economic trends and household resilience.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the linter (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS utility classes
- Maintain responsive design principles
- Write meaningful commit messages
- Test on multiple devices and browsers

### Code Style
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable and function names
- Comment complex logic appropriately

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

MeridianAlgo is led by a dedicated team of students and researchers:

- **Ishaan Manoor** - Founder & Lead Researcher
- **Daniel Dimov** - Research & Compliance
- **Dennis Talpa** - SysAdmin & Quant Research
- **Team of 15+ contributors** across various specializations

## 📞 Contact & Support

- **Website**: [meridianalgo.com](https://meridianalgo.com)
- **GitHub**: [github.com/MeridianAlgo](https://github.com/MeridianAlgo)
- **Email**: contact@meridianalgo.com
- **LinkedIn**: [MeridianAlgo](https://linkedin.com/company/meridianalgo)

### Support Channels
- **Issues**: [GitHub Issues](https://github.com/MeridianAlgo/Website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MeridianAlgo/Website/discussions)
- **Contact Form**: Available on the website

## 🙏 Acknowledgments

- **Open Source Community** - For the amazing tools and libraries
- **React Team** - For the incredible framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Vite Team** - For the lightning-fast build tool
- **Our Contributors** - For making this project possible

## 📈 Changelog

### v3.1.0 (Latest)
- Enhanced Open Source page with 10 active projects
- Improved About page with detailed team structure
- Added TimeSeries Research repository showcase
- Updated partnerships section with new collaborations
- Enhanced SEO with meta tags and social media cards
- Improved responsive design and mobile experience

### v3.0.0
- Complete redesign with modern React 18
- TypeScript migration for better type safety
- Tailwind CSS integration for consistent styling
- New component architecture and routing system

---

**Made with ❤️ by the MeridianAlgo team**

[⭐ Star us on GitHub](https://github.com/MeridianAlgo/Website) • [🐛 Report Issues](https://github.com/MeridianAlgo/Website/issues) • [💬 Join Discussions](https://github.com/MeridianAlgo/Website/discussions)

Monorepo containing:
- Main site: React + Vite + TypeScript + Tailwind CSS (folder: `./`)
- Docs site: Docusaurus (folder: `./meridianalgo-docs/`)

Current version: v3.1.0

## Quick Start

Prereqs:
- Node.js 18+ and npm 9+

Install dependencies (root):

```bash
npm install
```

Run the main website (Vite dev server, default http://localhost:5173):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview local production build:

```bash
npm run preview
```

## Project Structure

```
Website-main/
├─ src/
│  ├─ components/            # Reusable UI components (Header, Navbar, Footer)
│  ├─ pages/                 # Route pages (Home, About, Contact, OpenSource, Newsletters, etc.)
│  ├─ App.tsx                # App shell
│  ├─ index.css              # Tailwind + global styles
│  └─ main.tsx               # App entry
├─ public/
│  ├─ newsletters/           # PDFs and manifest.json for newsletters
│  └─ legal/                 # Privacy Policy / Terms PDFs
├─ meridianalgo-docs/        # Docusaurus documentation site
├─ package.json
├─ vite.config.ts
└─ tailwind.config.js
```

## Environment & Styling

- Styling uses Tailwind CSS. Global utilities live in `src/index.css`.
- Icons are from `lucide-react`.

## Newsletters

The Newsletters page reads `public/newsletters/manifest.json` for available PDFs:

```json
{
  "newsletters": [
    {
      "title": "Smart Cents Weekly - Inaugural Newsletter",
      "description": "...",
      "fileName": "Smart Cents Weekly - Newsletter Week 1 (2).pdf",
      "uploadDate": "2025-08-04"
    }
  ]
}
```

Add new newsletter PDFs to `public/newsletters/` and list them in `manifest.json`. Only `.pdf` files are displayed.

## Open Source Page

Project cards and titles are defined in `src/pages/OpenSource.tsx`.

## Release v3.1.0 (Highlights)

- Home: widened “Teaching Finance to Everyone”, orange theme, clean card borders
- Home: infinite auto-scrolling Open Source carousel (pause on card hover), aligned buttons
- Home: consistent section dividers; “MeridianAlgo Advantage” heading without gradient
- Footer: right-aligned Privacy Policy and Terms links; version bump to v3.1.0
- Open Source page: repo titles surfaced prominently
- About: orange theme and detailed team + team structure sections

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Build production assets
npm run preview   # Preview built site locally
```

## Deployment

This site is Vite-based and can be deployed to platforms like Vercel, Netlify, or static hosts.

Build output is in `dist/`. Serve as static assets.

## Contributing

PRs welcome. Please lint and test locally before submitting.