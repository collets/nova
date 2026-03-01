# Personal Site Handoff

## Project Scope
- App: `apps/personal-site`
- Stack: React + TypeScript + React Router + global CSS (`src/styles.css`)
- Theme: Pixel-art RPG UI (inspired by tactical/retro menus, not game mechanics)

## Current Routes
- `/character`
- `/skills`
- `/quests`
- `/messenger` redirects to `/character` (Messenger is now a dialog, not a page)
- `/` and `*` redirect to `/character`

## Core Files
- App composition and page components:
  - `apps/personal-site/src/app/app.tsx`
- Global styling/tokens/layout:
  - `apps/personal-site/src/styles.css`
- Content source:
  - `apps/personal-site/src/app/content/site-content.ts`
- Shared UI components:
  - `apps/personal-site/src/app/components/ui/app-dialog.tsx`
  - `apps/personal-site/src/app/components/ui/dialog-close-button.tsx`
  - `apps/personal-site/src/app/components/ui/menu-list.tsx`
  - `apps/personal-site/src/app/components/ui/tag-chip.tsx`

## Design Tokens / Typography
- Fonts loaded in `index.html`:
  - Press Start 2P
  - Silkscreen
  - Space Grotesk
  - Material Symbols Outlined
- Tokens live in `:root` in `styles.css`:
  - Color palette
  - Typography scale + semantic typography roles
  - Shared spacing/line-height/weights

## Asset Mapping
- Profile images (`public/`):
  - Sidebar portrait: `/portrait.png`
  - Character full figure: `/full-figure.png`
- Sprite sheet:
  - `/pixel-art-ui-elements/Icons.png`
- Currently used icon mappings include:
  - Project/skill badges: shield, sword, ring, pendant, armor
  - Messenger scroll icons:
    - row 10 col 4 -> `.project-badge-icon--scroll-purple`
    - row 10 col 5 -> `.project-badge-icon--scroll-blue`
    - row 10 col 6 -> `.project-badge-icon--scroll-red`

## Page Status

### Character Sheet
- Layout:
  - Top row: portrait + equipment
  - Bottom: stats + backstory + CTA buttons
- Sidebar portrait is hidden only on `/character` (to avoid redundancy with full figure)
- Entry animation unified with other pages (`reveal`)

### Skill Book
- 3 category cards:
  - Core Arcana
  - Toolsmithing
  - Product Alchemy
- Selected category drives abilities grid
- Ability cards:
  - rank, icon, title, description, footer status
- Includes:
  - locked cards (grayscale `LOCKED`)
  - unlock slot card (`UNLOCK SKILL`)
- Unlock flow opens native dialog (via `AppDialog`):
  - selectable 3-option list
  - ARIA radio semantics + keyboard navigation (Arrow/Home/End)
  - explicit meme note (“does not actually add skills”)

### Quest Board
- Grid-style cards (same visual language as skill cards)
- Each card:
  - icon
  - `Bounty` + tier
  - objective description (`Objective: ...`)
  - footer with Difficulty/LV and `View Details` button
- `View Details` opens native Quest dialog (via `AppDialog`)
  - vertical layout
  - sections: active quest, brief, rewards tags, complete button

### Messenger
- Not a standalone page anymore
- Opens as dialog from:
  - Sidebar menu item `Messenger`
  - Character CTA `Hire For Quest`
- Contact dialog rows:
  - left icon badge
  - center two-line text
  - right caret
- Links:
  - Mail: `mailto:simone.coletta@outlook.com`
  - LinkedIn: `https://www.linkedin.com/in/simone-coletta`
  - GitHub: `https://github.com/scoletta`
  - all external links use `target="_blank"` + `rel="nofollow noreferrer"`

## Reusable Modal System
- `AppDialog` is the shared native `<dialog>` wrapper:
  - `isOpen`
  - `onRequestClose`
  - `ariaLabelledBy`
  - `dialogClassName` (wrapper-level)
  - `panelClassName` (inner panel-level, width controlled by integrator)
- `DialogCloseButton` is shared across dialogs
- Shared modal shell style:
  - fixed padding in `.app-dialog-panel`
  - width set per modal class (e.g. `.skill-modal`, `.quest-modal`, `.contact-modal`)

## Notable Interaction Rules
- Menu list supports interception via `onItemSelect` (used to open Messenger dialog)
- Sidebar portrait spacing: `0.75rem` bottom margin when visible
- All major pages use subtle entry animation (`reveal`)

## Validation Command
- Type check:
  - `pnpm exec tsc -p apps/personal-site/tsconfig.app.json --noEmit`

## Known Context / Preferences
- Strong preference for cohesive pixel-RPG UI
- Keep typography and spacing systems tokenized and consistent
- Avoid native title tooltips for critical content
- Prefer native `<dialog>` for modal interactions
