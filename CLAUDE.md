# dc-detailing

I will brief you on the first message

Built with a multi-agent pipeline: requirements analyst → developer → tester → pull request. A human reviews and merges every PR.

## Stack

- Vite + React 18 + TypeScript (strict), single static page.
- Tailwind CSS 3.4 with `brand` color tokens (`tailwind.config.js`), fonts self-hosted via `@fontsource` (Barlow, Inter).
- `lucide-react` icons, `framer-motion` reveal animations (off with `prefers-reduced-motion`).
- Booking form: `react-hook-form` + `zod` + `@hookform/resolvers`.
- Unit tests: Vitest + Testing Library (jsdom). E2E: Playwright (Chromium, `desktop` 1280 px and `mobile` 375 px projects) + `@axe-core/playwright`.
- CI: `.github/workflows/ci.yml` (lint, unit, build, e2e) on pull requests and pushes to `main`.

## Commands

- `npm install` — install dependencies (`npx playwright install chromium` once for e2e).
- `npm run dev` — dev server.
- `npm run build` — type-check and production build to `dist/`.
- `npm run preview` — serve the build.
- `npm run lint` — ESLint.
- `npm run test` — unit tests (Vitest).
- `npm run test:e2e` — builds and serves on port **5179** (never 4545), then runs Playwright. The build uses `VITE_BOOKING_ENDPOINT=https://booking.test/submit`, which tests intercept with `page.route`.

Environment: `VITE_BOOKING_ENDPOINT` (build time) is the Formspree-style URL that receives booking requests as JSON. When unset, the form runs in demo mode (nothing is sent, console warning). It must be set before going live.

## Structure

- `src/App.tsx`: page composition; holds the selected vehicle size and the package pre-fill for the booking form.
- `src/components/`: one component per section (`TopBar`, `Navbar`, `Hero`, `TrustBar`, `PackagesSection`, `PackageCard`, `AddonsGrid`, `GallerySection`, `BeforeAfterSlider`, `ServiceSplit`, `ReviewsSection`, `AboutSection`, `BookingForm`, `Footer`, `MobileCallFloat`) plus `Logo` and `Reveal`.
- `src/data/detailingData.ts`: all business content and copy. Components never hard-code it.
- `src/lib/`: pure, unit-tested logic (`pricing`, `gallery`, `slider`, `bookingSchema`, `bookingPayload`, `submitBooking`), tests next to each file (`*.test.ts`).
- `public/images/`: WebP images (provisional placeholders, see `CREDITS.md`).
- `index.html`: title, meta, Open Graph and JSON-LD.
- `e2e/`: Playwright tests.

- `docs/specs/`: feature specs written by the requirements analyst
- `docs/test-cases/`: test cases (TC-n, with steps and expected results) written by the tester
- `docs/test-reports/`: test reports written by the tester
- Bugs found in testing are filed as GitHub issues labeled `bug` and `severity: *`. Fix commits reference the issue (`fix: ... (#12)`), and PRs close them with `Fixes #12`.

## Conventions

- Everything in the repository is written in English: code, comments, docs, commit messages, PR descriptions.
- Keep business logic in pure, testable functions, separate from UI code.
- Never render user input as HTML.
- Prefer accessible markup (labels, roles, `aria-*`). End-to-end tests locate elements with `getByRole`, `getByLabel` and `getByText` where possible.
- Name tests after behavior. Acceptance tests start with their criterion ID, for example `AC-2: rejects a blank title`.
- Commits follow Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`.
- Feature branches are named `feature/<slug>`, or keep the branch Claude Code created for a worktree session. Never commit to `main`.

## Definition of done

- Every acceptance criterion in the spec is covered by at least one test.
- Build, unit tests and end-to-end tests all pass.
- No unrelated changes in the diff.
