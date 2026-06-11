# AGENTS.md

## Monorepo structure

Three independent packages in the root, each with its own `bun.lock` — **do not install or run from the repo root**.

| package | runtime | port | deploy |
|---|---|---|---|
| `jobtrail-frontend/` | Node (Next.js) | 3000 | Vercel |
| `jobtrail-backend/` | Bun (Elysia) | 3003 | Railway |
| `deletion-service/` | Bun (Elysia) | — | Railway |

## Frontend (Next.js 16)

- **Path alias**: `@/*` → `src/*` (via tsconfig `paths`)
- **Styling**: Tailwind v4 utilities only — no CSS modules, no styled-components, no `<style>` tags. Single CSS file at `src/app/globals.css`
- **Lint**: `npm run lint` (uses ESLint with `eslint-config-next`). Run before committing. Rules: 4-space indent, no semicolons, `object-curly-spacing: always`
- **TypeScript**: `strict: true` with `ignoreBuildErrors: true` in next.config — always run `npx tsc --noEmit` yourself to catch type errors
- **Component conventions**: `cva` for variant-based styling (`Button.tsx`, `Input.tsx`), `cn()` utility (`clsx` + `tailwind-merge`) for class merging
- **Data fetching**: TanStack React Query v5 via `src/services/` — each API concern has its own directory with per-query hooks
- **Icons**: `@tabler/icons-react` and `lucide-react` — prefer tabler icons
- **Forms**: `react-hook-form`
- **Dialogs**: Radix UI `Dialog` primitives wrapped in `OverlayWrapper` (shared dialog shell)

### Frontend commands

```bash
cd jobtrail-frontend
bun dev           # dev server on :3000
bun run build     # production build (skips TS errors per config)
bun run lint      # eslint
npx tsc --noEmit  # manual type check (not in CI — you must run it)
bun run cypress:open  # launch Cypress (no headless script)
```

## Backend (Elysia + Bun)

- **Entrypoint**: `src/index.ts` — listen on port 3003
- **Runtime**: Bun only — do not use Node/npm
- **Database**: PostgreSQL via Neon, Drizzle ORM, schema at `src/db/schema.ts`
- **Migrations**: `bun run gen` (drizzle-kit generate), `bun run migrate` (drizzle-kit migrate). Run `gen` after schema changes, then `migrate` to apply.
- **Auth**: JWT via `@elysiajs/jwt`, sessions stored in Redis (Upstash)
- **Messaging**: BullMQ via Redis (Upstash) — queue workers run via the `deletion-service`
- **Logging**: Winston via `src/logger.ts`
- **File uploads**: Cloudflare R2 / S3 with pre-signed URLs

### Backend commands

```bash
cd jobtrail-backend
bun dev           # dev server on :3003
bun run gen       # generate Drizzle migration
bun run migrate   # apply Drizzle migration
```

## Deletion service

Separate microservice for scheduled user deletion. Shares the same Drizzle schema and DB. Runs BullMQ workers. Also Bun/Elysia, deployed on Railway.

## CI pipelines (GitHub Actions)

Four workflows in `.github/workflows/`:

| workflow | file | triggers | what it does |
|---|---|---|---|
| **CI** | `ci.yml` | PR (opened/synchronize), manual | Backend: installs Bun, deps, runs migrations |
| **Frontend test** | `frontend-test.yml` | PR (opened/synchronize), manual | Frontend: installs deps, builds, lints, runs Cypress component + E2E tests |
| **opencode** | `opencode.yml` | issue/PR comment with `/oc` or `/opencode` | Runs opencode agent |
| **labeler** | `labeler.yml` (at `.github/labeler.yml`) | PR events via GitHub's labeler action | Auto-labels PRs: `frontend`, `backend`, `ci`, `release` |

## Repository conventions

- **`.env` files are gitignored** — check `.env.local` in frontend and env vars for backend
- **Image hostnames**: Cloudflare R2 — next.config allows `**.r2.cloudflarestorage.com`
- **Prisma/Kysely/etc.** — not used. Only Drizzle ORM.
