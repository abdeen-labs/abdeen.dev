# abdeen.dev

Private software. Clear boundaries. This repository powers [abdeen.dev](https://abdeen.dev), one Abdeen Labs property for product pages and small open-source tools.

Built with [Next.js](https://nextjs.org) (App Router), Tailwind CSS v4, and TypeScript. Deployed on Vercel. The interface implements **Axis** (Abdeen Labs brand v3.5): one role-token set driving a canonical dark mode and a first-class light mode.

## Development

This project uses [Bun](https://bun.sh):

```bash
bun install
bun run dev      # dev server at http://localhost:3000
bun run lint     # eslint
bun run build    # production build
```

## Layout

- `src/app/` · routes. Each browser tool is a folder with a `page.tsx` (metadata + shell) and one client component.
- `src/components/` · shared UI (tool page shell, Seal, section header, fade-in wrapper).
- `src/lib/catalog.ts` · the single index of apps and tools that drives the homepage, footer, and cross-links.
- `src/app/globals.css` · Axis role tokens for both modes and the shared controls, fields, console, and textures.
- `public/fonts/axis/static/` · instanced TTFs for the OG renderer (Satori cannot ingest variable files). Page fonts load via `next/font/google` — downloaded at build time, served from this origin.
- `public/data/` · word lists and lookup data fetched by the tools at runtime.

There is no logo file: the mark `عابدين` is set live in Aref Ruqaa 700, and the favicon/OG renders derive from the Seal component at build time.

## License

Content and branding are © Jaafar Abdeen. Fonts are licensed under the SIL OFL. See individual tool pages for third-party data credits (EFF word list, BIP-39, MusicBrainz/Cover Art Archive).
