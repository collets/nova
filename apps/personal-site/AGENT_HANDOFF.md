# Personal Site Handoff

## Project Scope
- App: `apps/personal-site`
- Stack: React + TypeScript + React Router + global CSS (`src/styles.css`)
- Theme: Pixel-art RPG UI

## Architecture (DDD-lite)
- `src/app/domain/*`
  - Pure value objects and business derivation logic
  - `domain/site/value-objects.ts`
  - `domain/skills/skills.ts`
  - `domain/quests/quests.ts`
- `src/app/application/*`
  - Mapping/use-case logic for UI consumption
  - `application/quests/get-quest-view-models.ts`
  - `application/site/contact-options.ts`
- `src/app/features/*`
  - Route-level containers and shell pieces
  - `features/character/character-page.tsx`
  - `features/skills/skills-page.tsx`
  - `features/quests/quests-page.tsx`
  - `features/navigation/sidebar-content.tsx`
  - `features/contact/contact-dialog.tsx`
- `src/app/components/ui/*`
  - Presentational components
  - Includes `app-dialog`, `page-header`, `menu-list`, `tag-chip`, `badge-icon`, `ability-card`, `quest-card`
- `src/app/hooks/*`
  - Cross-cutting UI behavior hooks (`use-mobile-viewport`, `use-lock-body-scroll`, `use-escape-to-close`, `use-route-focus-first-interactive`)

## Routes
- `/character`
- `/skills`
- `/quests`
- `/messenger` redirects to `/character`
- `/` and `*` redirect to `/character`

## Single Source of Truth
- Content is static in `src/app/content/site-content.ts`
- Contacts are mapped from `siteContent.contact` through `application/site/contact-options.ts`

## Current External Links
- LinkedIn: `https://www.linkedin.com/in/colettasimone`
- GitHub: `https://github.com/collets`
- All external links use `_blank` with `rel="nofollow noopener noreferrer"`

## Validation Commands
- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site:lint`
- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site:typecheck`
- `NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site:test`
