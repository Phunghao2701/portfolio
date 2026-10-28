# Tool collection

A bilingual personal catalog of finished software tools. The first version is frontend-only; product data lives in `lib/products.ts` until a backend is added.

## Run locally

- `npm run dev` starts the Next.js development server.
- `npm run lint` checks the source with ESLint.
- `npm run build` creates the production build.
- `npm start` serves that build locally.

## Add a tool

Add a `Product` entry to `lib/products.ts`. Provide Vietnamese and English names and descriptions, a stable category id with translated labels, relevant technology tags, and only the demo, source, or download URLs that exist. Search and category filters appear automatically when entries are present.
