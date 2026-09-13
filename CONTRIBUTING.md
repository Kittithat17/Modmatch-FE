# Contributing to ModMatch FE

Written for anyone joining the team. Read this once and you should be able to ship your first change.

## Local setup

```bash
git clone https://github.com/Kittithat17/Modmatch-FE.git
cd Modmatch-FE
git checkout dev # clone lands you on main, which is production. Work happens on dev.
nvm use          # uses Node 20 from .nvmrc
npm ci           # not `npm install` — `ci` installs exactly what package-lock says
cp .env.example .env.local
npm run dev
```

## Branches

There are two permanent branches. Never push to either one directly. Everything goes through a pull request.

| Branch | What it is | What merges into it |
| --- | --- | --- |
| `main` | Production. Must always work. | `dev` only |
| `dev` | Where everyone's work comes together. Branch off this one. | feature branches |

Always branch off `dev`:

```bash
git checkout dev
git pull
git checkout -b feat/matching-filter
```

Name branches with a prefix: `feat/` for new work, `fix/` for bugs, `chore/` for maintenance such as dependency bumps, `refactor/` for moving code without changing behaviour.

## How a change travels

```
feat/xxx  ──PR──▶  dev  ──PR──▶  main
   ▲                ▲              ▲
   │                │              │
CI on every push  CI again      CI again
```

1. Write code on your feature branch and push. CI runs on every push, every time.
2. Open a PR into `dev`. Wait for CI to go green and for at least one approval.
3. Merge into `dev`, then check that `dev` still works.
4. When you are ready to release, open a PR from `dev` into `main`.

## Before every push

Run these three locally so you do not wait on a red CI run to find out:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run lint:fix` fixes whatever is auto-fixable.

## Where code goes

| Adding | Put it in |
| --- | --- |
| A new page | `src/app/<route>/page.tsx`. Keep this file thin; real logic belongs in a feature. |
| Logic for one domain, e.g. matching | `src/features/<feature>/`. See `src/features/README.md` for the rules. |
| Buttons, inputs, cards reused anywhere | `src/components/ui/`. No business logic allowed. |
| Navbar, footer, sidebar | `src/components/layout/` |
| Anything that calls the backend | Go through `src/lib/api-client.ts`. Do not call `fetch` directly from components. |
| A hook used by several features | `src/hooks/`. If only one feature uses it, keep it inside that feature. |
| A type used by several features | `src/types/` |

Imports use the `@/` alias, which points at `src/`. For example `import { apiFetch } from "@/lib/api-client"`.

## Environment variables

Anything prefixed with `NEXT_PUBLIC_` is inlined into the browser bundle. Anyone who opens devtools can read it. Never put an API key or any secret behind a `NEXT_PUBLIC_` name.

Whenever you add a new environment variable, add its name to `.env.example` in the same PR so everyone else knows what they need to set.
