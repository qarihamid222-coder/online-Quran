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
  quran/           Surah list, surah reader, juz index, and juz reader pages
  bookmarks/       Bookmarks page
components/
  quran/           Quran-specific UI (SurahCard, SurahList, SurahHeader, AyahCard, SurahDivider,
                    SurahSearch, AyahSearchInput, BookmarkButton, ...)
  bookmarks/       Bookmarks list UI
  layout/          Navbar, ThemeToggle, BookmarksNavLink, Footer, Sidebar
  ui/              Shared/generic UI primitives (Skeleton, EmptyState, ErrorState)
lib/
  quran/           Quran data client — isolated wrapper around the external Quran API
                    (search.ts holds the pure surah/ayah search predicates)
  theme.ts         Light/Dark/System theme state, shared by the toggle and the blocking init script
hooks/             Reusable React hooks (useAudioPlayer, useAyahSearch, useBookmarks)
store/             Client-side state (bookmarks.ts: a small localStorage-backed store)
prisma/            Database schema (added in a later phase)
tests/             Automated tests (mirrors the source layout)
```

## Quran data

Surah and ayah data (Arabic Uthmani text, English and Urdu translations) is fetched at
request time from the [alquran.cloud](https://alquran.cloud) API through `lib/quran/`,
which exposes typed domain models (`SurahSummary`, `SurahDetail`, `Ayah`) so the
underlying provider can be swapped later without touching UI code.

## Audio

Each ayah carries a deterministic recitation URL (`lib/quran/audio.ts`, served from the
islamic.network CDN — no extra API call needed). On the surah reader page,
`AudioPlayerProvider` (`components/quran/AudioPlayerProvider.tsx`) manages a single shared
`<audio>` element via the `useAudioPlayer` hook: tapping any ayah's play button starts a
queue that continues sequentially through the rest of the surah, which also serves as
"play surah" when started from the first ayah. Juz pages use the same player across the
whole juz, spanning surahs.

## Navigation & UX

- **Juz view** — `/quran/juz` lists all 30 juz; `/quran/juz/[juzNumber]` reads a juz
  straight through, with a divider whenever the surah changes.
- **Verse deep-linking** — every ayah has a stable anchor (`#ayah-<global-ayah-number>`,
  unique across the whole Quran) and a "Copy link" button. Opening a link to one scrolls
  to it and briefly highlights it.
- **Dark mode** — a Light/Dark/System toggle in the navbar (`components/layout/ThemeToggle.tsx`),
  backed by `lib/theme.ts` and a blocking init script in `app/layout.tsx` so there's no
  flash of the wrong theme on load.

## Search & bookmarks

- **Surah search** — the surah list (`/quran`) filters by English name, meaning, Arabic
  name, or number as you type (`filterSurahs()` in `lib/quran/search.ts`).
- **Verse search** — surah and juz reader pages have a search box that filters the
  already-loaded ayahs by Arabic, English, or Urdu text, or by ayah number
  (`matchesAyahQuery()`; `AyahSearchProvider`/`useAyahSearch`), without disturbing the
  audio queue's indexing.
- **Bookmarks** — tap "Bookmark" on any ayah to save it, no account needed. Bookmarks
  live in `localStorage` (`store/bookmarks.ts`) and stay in sync across every open
  component via `useBookmarks()`. View and remove them on the `/bookmarks` page; the
  navbar shows a live count.

## Roadmap

1. **Phase 1 (MVP)** — full Quran text, English & Urdu translations, ayah/surah audio playback, surah & juz navigation, client-side search, local (no-login) bookmarks, dark mode.
2. **Phase 2** — user accounts, synced bookmarks/notes, more reciters, tafsir.
3. **Phase 3** — PWA offline support, prayer times, memorization tools.
