---
name: chair-solutions-design
description: Use this skill to generate well-branded interfaces and assets for Chair Solutions, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map of this skill

- `README.md` — full design system: content fundamentals, visual foundations, iconography. **Read this first.**
- `colors_and_type.css` — every design token (colour, type, spacing, radii, shadows, motion). Import this from any new HTML you build.
- `fonts/` — typeface notes. Plus Jakarta Sans, loaded from Google Fonts.
- `assets/photos/` — five real product photos: hospitality, healthcare, boardroom, education, soft-seating. Always prefer these over stock or generated imagery.
- `ui_kits/website/` — hi-fi marketing homepage with reusable JSX components (Nav, PillButton, ProductCard, MarketTile, Footer, plus a `Collage` signature move). `index.html` is a full working example.
- `preview/` — small specimen HTMLs for the Design System tab. Useful as quick "what does this look like" lookups.

## Brand in one sentence

Chair Solutions is a 50-year New Zealand chair manufacturer reintroduced to specifiers and designers via **Considered Craft** — warm neutral palette, generous editorial spacing, pill buttons, Plus Jakarta Sans, real product photography. No emoji. No SaaS-y gradients. No serifs.

## When designing, you must

- Use **Plus Jakarta Sans only**. Weight contrast (300/400 ↔ 600/700) carries hierarchy.
- Background is **cream** (`#FBF8F3`), never pure white. Text is **warm charcoal** (`#1F1A14`), never blue-black.
- Primary CTAs are **umber pills** (`#3B2418`). Outlined CTAs use the ink colour.
- **Denim blue is a sparing accent** for badges and small UI moments — never dominant, never a CTA fill.
- Photography lives in real interiors — never cutouts on flat backgrounds.
- The signature visual move is the **photo overlay collage** (secondary image rotated −4° over a primary image).
- Voice is **direct, considered, no fluff**. CTAs are concrete verbs: "Browse products", "Request a quote", "Speak to our trade team", "Order samples".
- Avoid banned vocabulary: *Discover, Unlock, Transform, Elevate, Reimagine, Curated, Bespoke, Premium, Luxury* (unless specific).
- New Zealand English: *colour, centre, organisation, catalogue*.
- No emoji, no SVG illustrations invented from scratch, no purple/blue gradient meshes.
