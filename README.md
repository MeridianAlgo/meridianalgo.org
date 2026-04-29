# MeridianAlgo

> Democratizing financial intelligence through transparent research and powerful open-source utilities.

MeridianAlgo is a student-led nonprofit building financial literacy tools, open-source projects, and educational content for everyday people — no jargon, no gatekeeping.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Forms | Formspree |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/
│   ├── images/          # Partner and brand logos
│   └── styles/          # Global animations CSS
├── components/
│   ├── Navbar.tsx        # Fixed top nav with Learning dropdown
│   ├── Footer.tsx        # Site-wide footer with link sections
│   ├── AppLayout.tsx     # Page wrapper (navbar + footer)
│   ├── CollapsibleTool.tsx  # Accordion wrapper for financial calculators
│   └── ScrollToTopButton.tsx
├── pages/
│   ├── Home.tsx          # Landing page
│   ├── About.tsx         # Mission and values
│   ├── Contact.tsx       # Contact form (Formspree)
│   ├── Newsletters.tsx   # Newsletter archive (PDF viewer)
│   ├── OpenSource.tsx    # GitHub project catalog
│   ├── Partnerships.tsx  # Partner showcase
│   ├── ToolsPage.tsx     # 20+ interactive financial calculators
│   └── NotFound.tsx      # 404 page
├── App.tsx               # Route definitions
└── index.css             # Tailwind entry + global styles
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for a deeper breakdown.

## Contributing

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE) for details.

---

**Version:** v4.3.0 &nbsp;·&nbsp; [Changelog](https://github.com/MeridianAlgo/meridianalgo.org/releases) &nbsp;·&nbsp; [Website](https://meridianalgo.org)
