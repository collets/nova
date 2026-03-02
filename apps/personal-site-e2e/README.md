# @org/personal-site-e2e

Playwright end-to-end smoke tests for `@org/personal-site`.

## Commands

- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site-e2e:e2e-smoke`
- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site-e2e:e2e`
- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site-e2e:e2e-headed`
- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site-e2e:e2e-ui`

## Tags

- `@smoke`: fast critical journey checks
- `@regression`: broader interaction and edge-case checks

## First-time setup

1. Install dependencies:
   - `pnpm install`
2. Install Playwright browser binaries:
   - `pnpm exec playwright install --with-deps chromium`
