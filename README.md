# Online Quran

A website for reading, listening to, and studying the Holy Quran online — Arabic text (Uthmani script), English and Urdu translations, and per-ayah audio recitation.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- Quran text, translations, and audio sourced from a public Quran API
- ESLint + Prettier

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server             |
| `npm run build`        | Production build                 |
| `npm run start`        | Run the production build         |
| `npm run lint`         | Lint the codebase                |
| `npm run format`       | Format with Prettier             |
| `npm run format:check` | Check formatting without writing |
| `npm run typecheck`    | TypeScript type-check, no emit   |
| `npm test`             | Run unit tests (Vitest)          |

## Project structure

```
app/               Routes (App Router pages, layouts, API routes)
  quran/           Surah list and surah reader pages
components/
  quran/           Quran-specific UI (SurahCard, SurahList, SurahHeader, AyahCard, ...)
  layout/          Navbar, Footer, Sidebar
  ui/              Shared/generic UI primitives (Skeleton, EmptyState, ErrorState)
lib/
  quran/           Quran data client — isolated wrapper around the external Quran API
hooks/             Reusable React hooks
store/             Client-side state (Zustand)
prisma/            Database schema (added in a later phase)
tests/             Automated tests (mirrors the source layout)
```

## Quran data

Surah and ayah data (Arabic Uthmani text, English and Urdu translations) is fetched at
request time from the [alquran.cloud](https://alquran.cloud) API through `lib/quran/`,
which exposes typed domain models (`SurahSummary`, `SurahDetail`, `Ayah`) so the
underlying provider can be swapped later without touching UI code.

## Roadmap

1. **Phase 1 (MVP)** — full Quran text, English & Urdu translations, ayah/surah audio playback, surah & juz navigation, client-side search, local (no-login) bookmarks, dark mode.
2. **Phase 2** — user accounts, synced bookmarks/notes, more reciters, tafsir.
3. **Phase 3** — PWA offline support, prayer times, memorization tools.
