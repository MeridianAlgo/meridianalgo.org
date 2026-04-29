# Contributing

Thanks for your interest in contributing to MeridianAlgo's website.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
git clone https://github.com/MeridianAlgo/meridianalgo.org.git
cd meridianalgo.org
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Making Changes

1. **Fork** the repo and create a branch off `main`.
2. Make your changes. Run `npm run build` before opening a PR to confirm the build passes.
3. Open a pull request against `main` with a clear description of what changed and why.

## What We Welcome

- Bug fixes
- Accessibility improvements
- New financial calculators (add them to `ToolsPage.tsx` using the `<CollapsibleTool>` pattern)
- Newsletter manifest updates
- Documentation improvements

## Style Guidelines

- TypeScript — no `any` types
- Tailwind utility classes only; avoid inline `style` props unless animating
- No new dependencies without discussion — keep the bundle lean
- No comments explaining *what* code does; only add a comment when the *why* is non-obvious

## Project Structure

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for a full breakdown of the codebase.

## Contact

Open an issue or email `contact@meridianalgo.org` for questions.
