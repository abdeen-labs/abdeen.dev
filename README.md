# abdeen.dev

Private software. Clear boundaries. This repository powers [abdeen.dev](https://abdeen.dev), the home of Abdeen Labs, the open-source and experimental division of Abdeen Industries. It hosts project pages, releases, and browser tools.

Built with [Next.js](https://nextjs.org) (App Router), Tailwind CSS v4, and TypeScript. Deployed on Vercel. The interface implements **Redline**, the shared Abdeen brand system, with the canonical Void, Surface, Border, Mist, and Accent anchors and the official Iconoir React package.

`src/lib/brand.ts` mirrors the canonical copy in `../abdeen-brand/brand-content.js`.

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
- `src/app/globals.css` · Redline role tokens, the approved studio-site layouts, and shared tool controls.
- `src/app/font-files/` · canonical local webfonts loaded through `next/font/local`.
- `public/fonts/redline/static/` · local font files used by the OG renderer.
- `public/brand/` · generated Labs assets copied from `../abdeen-brand/renders/labs/svg/components/`.
- `public/data/` · word lists and lookup data fetched by the tools at runtime.

The live interface mark `عابدين` is set in Aref Ruqaa 700. Standalone SVG exports, the favicon, and the OG renderer derive from the canonical Seal geometry.

## License

Content and branding are © Jaafar Abdeen. Fonts are licensed under the SIL OFL. See individual tool pages for third-party data credits (EFF word list, BIP-39, MusicBrainz/Cover Art Archive).
