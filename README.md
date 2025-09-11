# MeridianAlgo Website & Documentation

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