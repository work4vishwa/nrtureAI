# Nrture.ai

AI-native SaaS landing page built with React + Vite.

## Tech stack

- **React 19** + **Vite** — app framework & build tool
- **Tailwind CSS v4** — styling (CSS-first config via `@theme`)
- **React Router** — routing
- **Framer Motion** — animations
- **Lucide React** — icons
- **React CountUp** — animated stat counters
- **React Hook Form** — form handling
- **clsx** + **tailwind-merge** — class name composition (`cn()`)

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
```

## Folder structure

```text
src/
├── assets/                 # Static assets (images, svgs)
├── components/
│   ├── ui/                 # Design-system primitives (Button, Container, Section)
│   ├── layout/             # Structural components (Navbar, Footer, RootLayout)
│   └── motion/             # Reusable Framer Motion wrappers (Reveal, Stagger)
├── features/
│   └── landing/            # Landing page feature
│       ├── sections/       # Hero, Stats, Features, CTA
│       └── LandingPage.jsx
├── data/                   # Dummy JSON content (single source of truth)
├── hooks/                  # Reusable hooks (useMediaQuery, usePrefersReducedMotion)
├── lib/                    # Utilities (cn, icons, constants)
├── pages/                  # Route-level page components
├── routes/                 # Router configuration
├── App.jsx                 # RouterProvider
├── main.jsx                # Entry point
└── index.css               # Tailwind + design tokens
```

## Conventions

- The `@` alias maps to `src/` (configured in `vite.config.js`).
- Content lives in `src/data/*.json` — components never hardcode copy, so it's CMS-ready.
- Icons are referenced by string name and resolved via `src/lib/icons.js` to keep the bundle tree-shakeable.
- Compose class names with `cn()` from `src/lib/cn.js`.

## Deploy to Cloudflare Pages

This is a **static React site** — use **Cloudflare Pages**, not `npx wrangler deploy` (that is for Workers).

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Deploy command | *(leave empty)* |
| Node.js version | `20` or newer |

Connect the GitHub repo (`work4vishwa/nrtureAI`) and Cloudflare will build and publish `dist` automatically.

`public/_redirects` is included so client-side routes (`/features`, `/pricing`, etc.) work on direct navigation and refresh.

No `wrangler.toml` or `wrangler.json` is required for Pages static hosting.
