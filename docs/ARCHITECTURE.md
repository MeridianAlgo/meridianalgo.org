# Architecture

## Overview

meridianalgo.org is a static React SPA built with Vite and deployed as a CDN-hosted site. There is no backend — all dynamic behavior uses client-side state, the Formspree API for contact form submissions, and a static `newsletters/manifest.json` file for the newsletter archive.

## Routing

Routes are defined in `src/App.tsx` using React Router v6 with `<BrowserRouter>`. All pages are lazy-loaded via `React.lazy` and wrapped in `<Suspense>` for code splitting.

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Hero + project carousel + codestack |
| `/about` | About | Mission, values, CTA |
| `/tools` | ToolsPage | 20+ collapsible financial calculators |
| `/opensource` | OpenSource | GitHub project grid with category filter |
| `/newsletters` | Newsletters | PDF archive with search, filter, paginate |
| `/partnerships` | Partnerships | Partner cards |
| `/contact` | Contact | Formspree-powered contact form |
| `*` | NotFound | 404 fallback |

## Layout

Every page is wrapped in `AppLayout` which renders `<Navbar>` above and `<Footer>` below the page content. The navbar is fixed-position; `AppLayout` adds top padding to offset it.

## Navigation

`Navbar.tsx` has two link groups:

- **About** — direct link
- **Learning** (dropdown) — Financial Tools, Open Source, Newsletters

The navbar animates the brand name out of view on scroll and collapses to a hamburger on mobile (`lg:` breakpoint).

## Footer

`Footer.tsx` is organized into four sections:

- **Logo & bio** — brand mark, tagline, social icons
- **Platform** — About, Newsletters
- **Resources** — Financial Tools, Open Source
- **Community** — Partnerships, Contact, The Hack Foundation

The bottom bar holds Changelog, Privacy, and Terms links.

## Financial Calculators

Each calculator in `ToolsPage.tsx` is self-contained: local `useState` for inputs, `useMemo` for derived outputs. They are wrapped in `<CollapsibleTool>` (an accordion component) so only one tool's UI is expanded at a time by default.

## Newsletter Archive

`Newsletters.tsx` fetches `/newsletters/manifest.json` at runtime. The manifest lists newsletter PDFs stored in `public/newsletters/`. A built-in PDF viewer (`<iframe>`) opens selected issues inline.

## Styling

Tailwind CSS handles all styling. The brand accent color is `orange-300` (#fdba74). Global CSS lives in `src/index.css` (Tailwind directives + focus/scrollbar styles). Keyframe animations are in `src/assets/styles/animations.css`.

## Static Assets

- `public/meridianalgo.png` — favicon and navbar logo
- `public/mountain.jpg` — hero background on Home
- `public/newsletters/` — PDF files + `manifest.json`
- `public/legal/` — Privacy Policy and Terms of Service PDFs
- `src/assets/images/` — partner logos (imported as ES modules)
