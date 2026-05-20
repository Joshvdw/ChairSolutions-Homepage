# Chair Solutions — Design System

> Direction D · **Considered Craft** — a 50‑year New Zealand chair manufacturer reintroduced to specifiers, designers and resellers through evidence and craft, not bravado.

This system is built to design and build interfaces for **Chair Solutions**: marketing site, trade portal, product pages, and supporting collateral. It is grounded in real product photography in real interiors, generous whitespace, warm neutral colour, and a single typeface carried through weight contrast.

---

## Index

| File / folder | What's in it |
|---|---|
| `README.md` | This file — fundamentals, voice, visual rules, iconography |
| `SKILL.md` | Agent skill manifest — load this first when designing for the brand |
| `colors_and_type.css` | All design tokens: colour, type, spacing, radii, shadow, motion |
| `fonts/` | Typeface notes (Plus Jakarta Sans, loaded from Google Fonts) |
| `assets/photos/` | Real product photography across the five markets |
| `preview/` | Card specimens that populate the Design System tab |
| `ui_kits/website/` | Hi‑fi marketing‑site UI kit — homepage, components, click‑thru |

---

## The brand in one paragraph

Chair Solutions makes commercial seating in New Zealand and has done so for 50 years. The new identity treats those five decades as **structural, not decorative**: visible in joinery, fabric, and consistency — never in nostalgia. The site reads like the inside of a well‑lit showroom photographed on a slow afternoon. Confident without being loud. Authority earned through clarity, not weight.

**Audiences:** specifiers, procurement leads, facility managers · designers and architects · resellers re‑engaging with the catalogue.

**Markets:** commercial · government · hospitality · education · healthcare.

---

## Sources & references

- **DESIGN.md** — pasted in the original brief (Direction D, Considered Craft). Full spec for positioning, voice, motion, components.
- **WVH — wvh.co.nz** — direct visual reference for warm neutral palette, photo‑overlay technique, asymmetric image‑text pairings, pill button shape, and editorial spacing rhythm. Screenshots in `uploads/` (Screenshot 2026-05-19 at 11.12–11.13 *.jpg/.png).
- **Product photography** — supplied by the user, real chairs in real interiors. Now in `assets/photos/`:
  - `hospitality.webp` — cafe / lounge scene, teal & green stack chairs
  - `healthcare.webp` — waiting room, denim‑blue soft seating
  - `boardroom.webp` — corporate boardroom, dark task seating
  - `education.webp` — library, black cantilever stack chairs
  - `soft-seating.webp` — atrium lounge, multi‑tone tub chairs

The reader is **not** assumed to have access to wvh.co.nz; everything observable from the screenshots has been internalised into the rules below.

---

## CONTENT FUNDAMENTALS

### Voice in one line
**Direct, considered, no fluff.** Speak in plain English about real things.

### Tone & register
- Adult, professional, warm‑neutral. Like a senior account manager who's been at the company 15 years: not corporate, not cold, not chummy.
- Confidence comes from specifics ("Most orders ship in 24–48 hours") not adjectives ("blazing‑fast delivery").
- New Zealand English spelling: *colour*, *centre*, *organisation*, *catalogue*.

### Pronouns & address
- "**We**" for Chair Solutions ("We keep our panels in stock locally…").
- "**You / your**" for the reader. Used freely, not avoided.
- Almost never "I" — the brand speaks collectively.

### Casing
- **Sentence case everywhere.** Buttons, nav, headings, eyebrows‑are‑uppercase‑and‑tracked but headings themselves stay sentence case.
- Never title case. Never ALL CAPS in body. Eyebrow labels are the only exception (tracked uppercase, 13px).

### CTA verbs — the allowed list
Clear, transactional, concrete:
- **Browse products** · **Request a quote** · **Speak to our trade team** · **Order samples** · **Explore the range** · **See how it works** · **Shop wall panels** · **View all** · **Get in touch**

### Banned vocabulary
- *Discover*, *Unlock*, *Transform*, *Elevate*, *Reimagine*, *Curated*, *Bespoke*, *Premium*, *Luxury* — unless they earn their place by being specific. ("Premium" is allowed in a sentence like "Premium wool‑blend upholstery"; not as a vibe word.)
- No exclamation marks. No "Wow." No "Welcome to…".
- No "leverage", "synergy", "best‑in‑class".

### Sentence construction
- Short → medium. Rarely long. Headlines fit on two lines, max.
- Body copy uses commas, em‑dashes (—), and full stops. No semicolons in marketing copy; fine in documentation.
- Numbers as digits: "50 years", "100,000 customers", "24–48 hours".

### Specific examples (lifted from the references / brief)

| ✅ Yes | ❌ No |
|---|---|
| "Wall panels designed to transform everyday spaces" | "Discover wall panels that will transform your everyday spaces" |
| "Local stock, fast shipping and real support" | "Lightning‑fast delivery you can trust!" |
| "Most orders ship in 24–48 hours" | "Industry‑leading shipping times" |
| "Speak to our trade team" | "Get in touch with one of our amazing experts" |
| "50 years making chairs in New Zealand" | "A heritage brand reimagined for the modern era" |

### Emoji & decorative chars
- **No emoji.** Not in body, not in CTAs, not in nav. The references contain zero emoji.
- Em‑dashes (—), en‑dashes for ranges (24–48), and proper quotes (" ") are used.
- Ordinary list bullets only (•). No ✓ tick‑emoji in feature lists.

---

## VISUAL FOUNDATIONS

### Colour philosophy
Photography does the heavy lifting. UI colour stays restrained and warm.

- **Background** — `--cs-cream-50` `#FBF8F3`. Slightly creamy, never pure white. Pulled from interior backgrounds in WVH photography.
- **Foreground** — `--cs-ink-900` `#1F1A14`. Deep charcoal with a warm brown undertone, drawn from dark chair frames and slatted timber walls. Near‑black, not blue‑black.
- **Primary accent (umber)** — `--cs-umber-900` `#3B2418`. Rich saddle brown from the timber. Used on primary CTAs, the pill button fill, and key emphasis.
- **Secondary accent (denim)** — `--cs-denim-500` `#5C7388`. Muted, pulled from couch upholstery. **Sparing use only** — badges, small UI highlights. Never a dominant brand colour. Never gradients of it.
- **Supporting** — warm greys for dividers (`--cs-warmgrey-100`). Cream‑200 for hover surfaces.

### Type system
- **One family — Plus Jakarta Sans.** Geometric sans with humanist warmth.
- Hierarchy through weight contrast: 300 / 400 for body, 600 / 700 for display.
- Display sizes set via `clamp()` so they're editorial on desktop and still readable on phones.
- Letter‑spacing tightens at large sizes (`-0.022em`) and loosens for eyebrow labels (`+0.08em`, uppercase).
- `text-wrap: balance` on headings; `text-wrap: pretty` on body.
- **No serifs anywhere.** Not for quotes, not for prices, not decoratively.

### Spacing & rhythm
- 4 px base scale, but generous on the upper end (`--space-9: 96px`, `--space-10: 128px`).
- **Sections breathe.** Vertical padding on a homepage section is `--space-9` to `--space-10`, never less than `--space-8`.
- **Asymmetric image‑text pairings**, not centred heroes. Image on one side, text on the other, at roughly 55/45 split.
- Container max 1320 px. Side padding `clamp(20px, 4vw, 64px)`.

### Backgrounds
- **No gradients.** No gradient meshes. No glassmorphism.
- **No patterns or repeating textures.** No grain.
- Full‑bleed product photography is the dominant background treatment — used at hero, "Ready to transform your space" sections, and behind dark CTAs.
- Solid cream behind text‑led sections. Sometimes a slightly deeper cream band (`--bg-surface`) to separate sections.

### The signature layout move — photo overlay collage
A secondary product photo floats over a primary photo at a **slight rotation (3–6°)** with a soft outer shadow. The smaller image typically sits at the lower‑left of the primary, slightly overlapping. On scroll it can settle into position with `cubic-bezier(0.22, 0.61, 0.36, 1)` easing — but the **static** version is also fine. This is the one moment of visual playfulness; the rest of the page is structured.

### Imagery direction
- Real product photography in real interiors. Always.
- Mix wide environmental shots with close‑up detail of joinery, fabric, craftsmanship.
- People are allowed but treated as part of the space — never centred portraits.
- **No stock cutouts on flat backgrounds.** No "floating product card" hero.
- Colour grade leans **warm**: brown undertones, golden highlights, not cool/blue. Black‑and‑white is reserved for portraiture inserts, used sparingly.

### Borders
- 1 px solid `--border-subtle` `#DCD1BC` for dividers and faint card outlines.
- 1 px solid `--border-strong` `#1F1A14` for outlined buttons and form inputs in their resting state.
- No 2 px borders. No double borders. No left‑accent‑bar cards.

### Shadows
- Used **only where needed for depth** (collage overlay images, sticky nav once scrolled, modal).
- All shadows are warm‑tinted: `rgba(31, 26, 20, 0.06)` — never neutral grey, never blue.
- Four steps: `--shadow-xs` / `sm` / `md` / `lg`. `lg` only for floating overlays.

### Corner radii
- **Pill (`999px`)** for buttons, chips, badges, search input.
- **`16px` (`--radius-lg`)** for cards and product tiles.
- **`24px` (`--radius-xl`)** for the photo‑overlay images (gently rounded, never too round).
- **`8px` (`--radius-md`)** for form inputs.
- Avatars and circular accents only when functional — never just for vibe.

### Hover & press states
- **Buttons (primary umber)** — fill darkens from `--cs-umber-900` to `--cs-umber-700`. Subtle scale `1.02` on hover. Press scale `0.98`.
- **Buttons (outlined)** — fill animates in to `--cs-ink-900`; text becomes `--cs-cream-50`. Same scale rules.
- **Cards** — soft lift via `transform: translateY(-2px)` plus `--shadow-md` on hover. 280 ms ease‑out.
- **Links** — `text-decoration` animates in via a `background-image` underline draw (gentle, left‑to‑right). Never a hard underline appears on hover.
- **Nav items** — no underline. Slight opacity shift on hover (`0.7`).

### Motion principles
- Restrained, considered. Page transitions: smooth fades + gentle vertical drift.
- Default easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease-out`).
- Default durations: `180ms` fast, `280ms` base, `600ms` slow.
- **Light parallax** on hero photography on scroll (transform: translateY at 0.95×).
- The **photo‑overlay rotation settles into position** on scroll — this is the signature motion moment.
- No bounces. No spring overshoot. No aggressive swipes.

### Transparency & blur
- Used only on the sticky nav once the page scrolls: backdrop‑filter `blur(12px) saturate(1.2)` over `rgba(251, 248, 243, 0.85)`.
- Never on cards. Never on hero overlays (use solid darkening, not blur).

### Cards (the canonical pattern)
```
- Background: white or --bg-surface
- Border: 1px solid var(--border-subtle), OR none
- Radius: 16px
- Padding: 24px on small, 32px on large
- Shadow: --shadow-sm at rest, --shadow-md on hover
- Hover: translateY(-2px), 280ms ease-out
- Eyebrow label (tracked uppercase, 13px) → Headline (h3 / h4) → Body
```

No coloured left border. No gradient fill. No emoji.

### Fixed elements
- Sticky top nav (transparent at top, blurred‑cream once scrolled).
- A small persistent **"5% off" pill** sometimes lives bottom‑left in the references. Use sparingly; not part of the core spec.
- No bottom drawers, no chat bubbles unless explicitly required.

### Density
- Generous. Body text never feels cramped. Line lengths 60–75 ch.
- Two columns max above 1024 px for content. Three+ only for product grids.

---

## ICONOGRAPHY

### Approach
**Iconography is minimal and almost invisible.** The references show only a handful of icons across an entire homepage: search, account, cart, and four faint outline icons in the "Why us" strip (star, package, checkmark, parcel). That's the budget for the whole site.

### System
- **Lucide** is the system of choice (`https://unpkg.com/lucide@latest`). 1.5 px stroke, rounded line caps. Outline only — never filled.
- All icons render at `--fg-secondary` or `--fg-muted` colour — never accent umber. They sit quietly next to text.
- Default size: **20 px** inline with text, **24 px** standalone, **48 px** for the rare hero‑strip "feature" icons (rendered at `--fg-muted`, very low visual weight).

### Substitution note
The original brand likely had its own thin icon set (cf. WVH's faint outline strip — star, drill/package, check‑circle, parcel). We have **substituted Lucide** as the closest CDN match: same stroke weight, same rounded ends, same outline‑only aesthetic. **If real icons are supplied, drop them into `assets/icons/` and update the manifest in this section.**

### No emoji, no Unicode glyphs as icons
- Emoji are not used anywhere.
- Unicode arrows (→, ←) are acceptable in text links ("View all →") because they read as typography, not iconography. Used sparingly.
- ★ for review ratings is acceptable — it's how Trustpilot renders.

### Logo
Chair Solutions does **not** have a finalised logo in this system. The references use **"WVH"** in a heavy geometric sans wordmark, top‑left, locked to nav. For Chair Solutions we render **"Chair Solutions"** in `Plus Jakarta Sans 700` at the same position — same proportions, same vertical alignment. A proper logotype is a flagged TODO for the user to supply (see Caveats).

---

## Components — quick rules

- **Buttons** — pill shaped (`--radius-pill`), generous horizontal padding (24–32 px), 48 px tall standard / 56 px hero. Primary = umber fill, white text. Secondary = transparent fill, ink border. Tertiary = text + underline draw.
- **Form inputs** — labels **above** inputs (not placeholder‑driven, for accessibility — specifiers fill these out). 1 px border, `--radius-md`, 48 px tall.
- **Navigation** — sticky, transparent at top, blurred cream once scrolled. Restrained type weight (500). No underlines. Logo left, links centre, account/search/cart right.
- **Chips / tabs** — pill shaped, two states: active (umber fill, white text) and inactive (cream‑200 fill, ink text).
- **Product card** — 16 px radius image, eyebrow ("CHAIR SOLUTIONS · NZ"), product name (h4), price right‑aligned. Save % badge top‑left as a small umber pill if discounted.

See `preview/` for rendered specimens and `ui_kits/website/` for full component implementations.
