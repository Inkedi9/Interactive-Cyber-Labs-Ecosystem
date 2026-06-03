# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint across all .js/.jsx files
```

No test suite is configured.

## Architecture

**Stack**: React 19 + Vite 8 + TailwindCSS 3 + React Router 7 + Framer Motion + Recharts + Lucide React

This is a cybersecurity/AI portfolio SPA (v2.0 — AI/Homelab refocus). `src/App.jsx` is the root: it mounts a persistent ambient cyber layer (matrix background, cursor glow, live logs, hacker easter egg) outside the router, then renders pages inside `AnimatePresence` for animated route transitions via `PageTransition`.

### Routes & pages

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Hero, featured project, GitHub card |
| `/cv` | `CV` | Skills, timeline, projects overview |
| `/projects` | `Projects` | All projects grid |
| `/projet-phare` | `ProjetPhare` | JARVINx deep-dive |
| `/homelab` | `Homelab` | Self-hosted infra showcase |
| `/siem-live` | `SIEMLive` | Interactive SOC demo |
| `/changelog` | `Changelog` | Build log |
| `/minilabit` | `MiniLabIT` | Mini IT lab page |
| `/download-cv` | `CVDownload` | CV download page |

### Directory layout

```
src/
  pages/          # Full page components (see routes table above)
  components/
    layout/       # Navbar, Footer, PageTransition, ScrollToTopButton, ScrollToTopOnRouteChange
    cyber/        # Ambient effects: MatrixBackground, CyberCursorGlow, CyberLogs, CyberLoader, HackerEasterEgg
                  # Interactive: CommandPalette, FakeExploitModal
    assistant/    # PortfolioAssistant chat UI, AssistantLauncher, ChatMessage, SuggestionChips, TypingIndicator
    cards/        # ProjectCard, GithubCard, Stats
    ui/           # RevealOnScroll, ScanOverlay, SectionBadge
  lib/assistant/  # Assistant engine: matcher.js, mockApi.js, storage.js, actions.js
  hooks/          # useAssistant.js — state management for the assistant
  data/           # siteData.js (projects, skills, links), assistantIntents.js (intent definitions)
  config/site.js  # SITE name and logo path
```

### Portfolio assistant

The chat assistant is entirely client-side — no external API. Flow:

1. `useAssistant` (hook) calls `askPortfolioAssistant` from `lib/assistant/mockApi.js`
2. `mockApi` calls `findBestIntent` from `matcher.js`, wraps the result in a fake async delay (500–1200 ms)
3. `matcher.js` scores intents from `data/assistantIntents.js` by keyword overlap; multi-word keywords score ×3
4. Each intent carries a `response` (string or array — one is picked randomly), `suggestions`, and an optional `action`
5. Actions are executed via `lib/assistant/actions.js`: `route` (navigate), `scroll`, `scroll-or-route`, `open-cv` (opens `/cv-inkedi.pdf`)
6. Conversation history persists to `localStorage` via `lib/assistant/storage.js`

To add new assistant topics, add an entry to `assistantIntents` in `src/data/assistantIntents.js`.

### Command palette

`CommandPalette` (Ctrl+K) is a terminal-style overlay defined entirely in `src/components/cyber/CommandPalette.jsx`. Commands are a static array with groups: Navigation, Cyber demos, External, Terminal. Terminal commands render output inline; navigation commands call `navigate()`. Two commands dispatch DOM events to trigger other components:
- `window.dispatchEvent(new Event("open-root-console"))` → triggers `HackerEasterEgg`
- `window.dispatchEvent(new Event("open-fake-exploit"))` → triggers `FakeExploitModal`

### Design system (Tailwind)

Custom tokens defined in `tailwind.config.js`:
- **Backgrounds**: `obsidian-950/900/850/800` (near-black dark theme), `surface-2/3`
- **Brand colors**: `brand-red`, `brand-redSoft`, `brand-cyan`, `brand-cyanSoft`, `brand-emerald`, `brand-emeraldSoft`
- **UI text tokens**: `ui-text`, `ui-secondary`, `ui-muted`, `ui-border`, `ui-borderStrong`
- **Glow shadows**: `shadow-redGlow`, `shadow-cyanGlow`, `shadow-emeraldGlow`
- Inline glow utilities use Tailwind arbitrary values, e.g. `hover:shadow-glow-red`, `hover:shadow-glow-cyan`

### Static content

All portfolio data lives in `src/data/siteData.js`: hero text, personal links, projects list, and skills. Update this file to change displayed content without touching page components. Note: `PERSONAL_LINKS` in `siteData.js` currently contains placeholder values (email, LinkedIn, cvUrl) that need to be updated before deploying.

### ESLint

`no-unused-vars` is set to error but ignores names matching `^[A-Z_]` (uppercase constants). Files are `.js` and `.jsx` only — no TypeScript.
