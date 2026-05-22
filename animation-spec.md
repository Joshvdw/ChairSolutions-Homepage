# wvh.co.nz — Animation Specification

## Animation Stack

| Library / Method | Source | Purpose |
|---|---|---|
| **Motion One** (`motion`) | Bundled in `theme.js` | Scroll-linked parallax, scroll-triggered reveals, button hovers, drawer/menu transitions, tab panels, count-up, character text animations |
| **Flickity** | Bundled in `vendor.js` | Logo carousel and product card carousels (momentum-based, internal physics engine) |
| **CSS Transitions** | Native | Button hovers, sticky header, drawers, product cards, nav dropdowns, mega menu |
| **CSS `@keyframes`** | Native | Marquee scroll, loading/spinner states, SVG strokes, shimmer skeletons, hotspot pulse |
| **`IntersectionObserver`** | Native | Triggers Motion One scroll-reveal animations on elements entering viewport |
| **`requestAnimationFrame`** | Native | Throttled scroll/resize handlers, `--header-height` CSS var updates |
| **`scroll-behavior: smooth`** | Native CSS | Page-level smooth scrolling on `<html>` |
| **Splitting.js** | Bundled in `theme.js` | Character-level text splitting for `splitting-banner` component |

### Libraries to install for replication

```bash
npm install motion        # Motion One — core animation library
# Flickity — bundle from source or replace with preferred carousel
# Splitting.js — bundle from source if using character-split text effects
```

---

## CSS Animation Tokens

These custom properties are used throughout as shorthand for transitions.

| Token | Value |
|---|---|
| `--animation-primary` | `0.5s cubic-bezier(0.3, 1, 0.3, 1)` |
| `--animation-fast` | `0.3s cubic-bezier(0.7, 0, 0.3, 1)` |
| `--animation-smooth` | `0.7s cubic-bezier(0.7, 0, 0.3, 1)` |
| `--animation-nav` | `0.5s cubic-bezier(0.6, 0, 0.4, 1)` |
| `--animation-short` | `0.2s cubic-bezier(0.7, 0, 0.3, 1)` |

---

## Global / Sitewide Patterns

These animation patterns repeat across every section.

### Button Fill Hover (HoverButton)

Applied to every `.button` with a `[data-fill]` inner element (all primary and secondary CTAs sitewide).

| Property | Value |
|---|---|
| **Trigger** | `mouseenter` / `mouseleave` |
| **Library** | Motion One |
| **Element** | `[data-fill]` overlay inside button |
| **On enter — transform** | `y: ["76%", "0%"]` |
| **On enter — duration** | `0.6s` |
| **On leave — transform** | `y: "-76%"` |
| **On leave — duration** | `0.6s` |
| **Easing** | None specified (Motion One default) |
| **Disabled when** | Touch device, or `data-button-hover="none"` on `<body>` |

---

### Button Magnet Effect (MagnetButton)

Applied to elements with `data-magnet` attribute. Nav items use `data-magnet="0"` (effect disabled).

| Property | Value |
|---|---|
| **Trigger** | `mousemove` / `mouseleave` (desktop only) |
| **Library** | Motion One |
| **Element** | `[data-text]` inside button, or the container itself |
| **On move — transform** | `x/y` = `(cursorPositionRelativeToCenter × magnet)` |
| **On move — duration** | `1.5s` |
| **On move — easing** | `Motion.spring()` |
| **On leave — transform** | `x: 0, y: 0` |
| **On leave — duration** | `1.5s` |
| **On leave — easing** | `Motion.spring()` |
| **Default magnet value** | `10` (px equivalent offset) |
| **Disabled when** | `motionReduced` is true |

---

### Button Reveal Effect (RevealButton)

A cursor-following reveal element inside a button, with stepped opacity.

| Property | Value |
|---|---|
| **Trigger** | `mousemove` / `mouseleave` (desktop only) |
| **Library** | Motion One |
| **Element** | `[data-reveal]` element inside button |
| **On move — transform** | `x/y` cursor offset + `opacity: 0 → 1` |
| **On move — duration** | `0.2s` |
| **On move — easing** | `"steps(2, start)"` |
| **On leave — transform** | `x: 0, y: 0, opacity: 0` |
| **On leave — duration** | `0.2s` |
| **On leave — easing** | `[0.61, 1, 0.88, 1]` |
| **Fallback** | If no `[data-reveal]`, falls back to MagnetButton spring behaviour |

---

### Scroll-Reveal — `animate-element` (all sections)

Custom element `<animate-element>` triggers on IntersectionObserver viewport entry. All heading words use this pattern with staggered delays.

| Type | Initial transform | Initial opacity | Final transform | Final opacity | Duration | Easing |
|---|---|---|---|---|---|---|
| `fade-in` | — | `0` | — | `1` | `1.5s` | `[0.16, 1, 0.3, 1]` |
| `fade-up` | `translateY(min(2rem, 90%))` | `0` | `translateY(0)` | `1` | `1.5s` | `[0.16, 1, 0.3, 1]` |
| `fade-up-large` | `translateY(90%)` | `0` | `translateY(0)` | `1` | `1s` | `[0.16, 1, 0.3, 1]` |
| `zoom-out` | `scale(1.3)` | — | `scale(1)` | — | `1.3s` | `[0.16, 1, 0.3, 1]` |

- **Delay:** `data-animate-delay` attribute (ms → divided by 1000 for seconds)
- **Easing note:** `[0.16, 1, 0.3, 1]` is a custom expo-out cubic-bezier
- **Library:** Motion One

---

### Product Grid Stagger (AnimateList)

Used on collection grids; also reloads on filter change.

| Property | Desktop | Mobile |
|---|---|---|
| **Trigger** | Page load / filter change | Same |
| **Library** | Motion One | Motion One |
| **Transform** | `y: [50px → 0]` | `y: [30px → 0]` |
| **Opacity** | `[0 → 1]` | `[0 → 1]` |
| **Visibility** | `hidden → visible` | `hidden → visible` |
| **Duration** | `0.5s` | `0.3s` |
| **Stagger** | `Motion.stagger(0.1s)` | `Motion.stagger(0.05s)` |

---

## Section: Header / Navigation

### Sticky Header — Scroll transition

| Property | Value |
|---|---|
| **Trigger** | Scroll past `headerHeight × 2` threshold |
| **Method** | classList toggle `header-scrolled` on section wrapper |
| **Element** | `.header[is=sticky-header]` |
| **Transition** | `--animation-nav` = `0.5s cubic-bezier(0.6, 0, 0.4, 1)` (CSS) |

---

### Nav Menu Items — Underline/dot hover

| Property | Value |
|---|---|
| **Element** | `.header__menu > ul.with-dot .menu__item .btn-text:after` |
| **Trigger** | hover |
| **Method** | CSS transition |
| **Transform** | scaleX or translate of indicator pseudo-element |
| **Transition** | `transform var(--animation-fast)` = `0.3s cubic-bezier(0.7, 0, 0.3, 1)` |

---

### Nav Menu Items — Block style hover

| Property | Value |
|---|---|
| **Elements** | `.menu__item [data-text]`, `.menu__item .btn-duplicate` |
| **Trigger** | hover |
| **Method** | CSS transition |
| **Transition** | `var(--animation-primary)` = `0.5s cubic-bezier(0.3, 1, 0.3, 1)` |

---

### Desktop Dropdown Submenu

| Property | Show | Hide |
|---|---|---|
| **Library** | Motion One | Motion One |
| **Trigger** | hover / focus | hover out / focus out |
| **Overlay opacity** | `[0 → 1]`, visibility visible, `0.6s` | `opacity: 0`, visibility hidden, `0.3s` |
| **Overlay easing** | `[0.7, 0, 0.2, 1]` | `[0.7, 0, 0.2, 1]` |
| **Container transform** | `translateY(-105%) → translateY(0)`, `0.6s`, delay `0.2s` | `translateY(-105%)`, `0.6s` |
| **Container easing** | `[0.7, 0, 0.2, 1]` | `[0.7, 0, 0.2, 1]` |
| **Nav list items (CSS)** | `transform 1s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 1s cubic-bezier(0.19, 1, 0.22, 1)` | — |

---

### Desktop Mega Menu

| Property | Show | Hide |
|---|---|---|
| **Library** | Motion One | Motion One |
| **Trigger** | hover on mega menu item | hover out |
| **Container transform** | `translateY(-105%) → translateY(0)`, visibility visible, `0.6s` | `translateY(-105%)`, visibility hidden, `0.6s` |
| **Easing** | `[0.7, 0, 0.2, 1]` | `[0.7, 0, 0.2, 1]` |
| **`.mega-menu__item` (CSS)** | `transform 1.5s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.9s cubic-bezier(0.19, 1, 0.22, 1)` | — |
| **`.mega-menu__nav-item`, `.media-card__text` (CSS)** | `transform 2s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 1s cubic-bezier(0.19, 1, 0.22, 1)` | — |
| **`.mega-menu__footer:before` (CSS)** | `transform 1s cubic-bezier(0.215, 0.61, 0.355, 1)` | — |

---

### Page Overlay (behind dropdown/mega menu)

| Property | Value |
|---|---|
| **Element** | `.header ~ .overlay` |
| **Trigger** | dropdown or mega menu open |
| **Method** | CSS transition |
| **Transition** | `0.8s cubic-bezier(0.7, 0, 0.2, 1)` |

---

### Mobile Menu Drawer

| Property | Value |
|---|---|
| **Trigger** | Hamburger button click |
| **Overlay** | `transition: 0.8s cubic-bezier(0.7, 0, 0.2, 1)` (CSS) |
| **Drawer panel** | `transition: var(--animation-primary) 0.35s` when active (CSS) |
| **Menu items — transform** | `translateX(-20px) → translateX(0)` (desktop), `translateY(2.5rem) → translateY(0)` (mobile) |
| **Menu items — opacity** | `[0 → 1]` |
| **Menu items — duration** | `0.6s` |
| **Library** | Motion One |

---

## Section: Scrolling Text (Marquee Bar)

| Property | Value |
|---|---|
| **Element** | `.marquee` inside `<marquee-element>` |
| **Trigger** | IntersectionObserver entry (margin: `200px 0px 200px 0px`) |
| **Method** | CSS `@keyframes scrolling-left` (or `scrolling-right` for RTL) |
| **Keyframe** | `translate3d(-100%, 0, 0) → translate3d(-200%, 0, 0)` |
| **Timing function** | `linear` |
| **Iteration** | `infinite` |
| **Duration** | `var(--duration)` — calculated: element width ÷ `data-speed` (default speed = `16`) |
| **Reduced motion** | `animation: none` |

---

## Section 1: Hero — "Wall panels designed to transform everyday spaces"

### Background image — Zoom out on load

| Property | Value |
|---|---|
| **Element** | `<picture class="media banner__media">` |
| **Type** | `zoom-out` (animate-element) |
| **Trigger** | Page load |
| **Library** | Motion One |
| **Initial transform** | `scale(1.3)` |
| **Final transform** | `scale(1)` |
| **Duration** | `1.3s` |
| **Easing** | `[0.16, 1, 0.3, 1]` |

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Element** | `<split-words>` + per-word `<animate-element>` |
| **Type** | `fade-up-large` |
| **Trigger** | Page load |
| **Library** | Motion One |
| **Initial** | `translateY(90%)`, `opacity: 0` |
| **Final** | `translateY(0)`, `opacity: 1` |
| **Duration** | `1s` |
| **Easing** | `[0.16, 1, 0.3, 1]` |
| **Delays** | 250, 280, 310, 340, 370, 400, 430ms (+30ms per word, 7 words) |

### CTA Buttons (×2)

Fill hover on `.button--primary` and `.button--secondary` — see global HoverButton spec.

---

## Section 2: Logo List — "As seen in"

### Logo carousel

| Property | Value |
|---|---|
| **Element** | Flickity slider (`.flickity-enabled`) |
| **Library** | Flickity |
| **Interaction** | Touch/drag with momentum physics (internal velocity + friction) |
| **Dots transition (CSS)** | `transition-property: opacity, visibility, transform` / `var(--animation-primary)` = `0.5s cubic-bezier(0.3, 1, 0.3, 1)` |

---

## Section 3: Image + Text — "Join over 100,000 people transforming their spaces"

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Trigger** | IntersectionObserver (viewport entry) |
| **Initial** | `translateY(90%)`, `opacity: 0` |
| **Final** | `translateY(0)`, `opacity: 1` |
| **Duration** | `1s` / **Easing** | `[0.16, 1, 0.3, 1]` |
| **Delays** | 250, 280, 310, 340, 370, 400, 430, 460, 490ms (9 words) |

### CTA Button

Fill hover on `.button--primary` — see global HoverButton spec.

---

## Section 4: Featured Collections — "Trending wall panels"

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 0, 30, 60ms (3 words — starts immediately on viewport entry) |
| See global animate-element spec for all other values. |

### Tab buttons — Fill hover

All `.tab__item` buttons (`.button--primary` and `.button--secondary`). See global HoverButton spec.

### Tab panel transition

| Property | Value |
|---|---|
| **Trigger** | Tab click |
| **Library** | Motion One |
| **Panel out — transform** | `translateY(0) → translateY(2rem)` |
| **Panel out — opacity** | `[1 → 0]` |
| **Panel out — duration** | `0.15s` |
| **Panel in — transform** | `translateY(2rem) → translateY(0)` |
| **Panel in — opacity** | `[0 → 1]` |

### Product card — Image hover

| Property | Value |
|---|---|
| **Element** | `.product-card__media img`, `.product-card__carousel`, `.product-card__secondary` |
| **Trigger** | hover |
| **Method** | CSS transition |
| **Transition** | `var(--animation-primary)` = `0.5s cubic-bezier(0.3, 1, 0.3, 1)` |

### Product card — Quick Add reveal

| Property | Value |
|---|---|
| **Element** | `.quick-add` |
| **Trigger** | hover on card |
| **Transition** | `var(--animation-primary)` (CSS) |

### Product grid stagger

See global AnimateList spec. Desktop: `y [50px → 0]`, `0.5s`, `stagger 0.1s`.

---

## Section 5: Image + Text — "Wall panels for easy installs, trusted by homeowners and pros"

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 250, 280, 310, 340, 370, 400, 430, 460, 490, 520ms (10 words) |
| See global animate-element spec. |

### CTA Button

Fill hover on `.button--primary` — see global HoverButton spec.

---

## Section 6: Multicolumn — "Over 1 million panels sold"

No entrance animations or scroll-triggered Motion One effects detected. CTA buttons carry the sitewide fill hover. Section is rendered statically.

---

## Section 7: Images + Text — "Architectural-grade quality"

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 250, 280ms (2 words) |
| See global animate-element spec. |

### Secondary (overlapping) image

| Property | Value |
|---|---|
| **Element** | `.image-with-text__image-second` (`parallax-element` custom element) |
| **Note** | `data-parallax` attribute not present — JS parallax is inactive. The element is absolutely positioned for a layered depth illusion; no scroll-linked motion. |

### CTA Button

Fill hover on `.button--primary` — see global HoverButton spec.

---

## Section 8: Images + Text — "Local stock, fast shipping and real support"

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 250, 280, 310, 340, 370, 400, 430ms (7 words) |
| See global animate-element spec. |

### Secondary image

Same as Section 7 — `parallax-element` present, parallax not active.

### CTA Button

Fill hover on `.button--primary` — see global HoverButton spec.

---

## Section 9: Shop the Feed — "Real projects, real spaces"

### Shop link buttons

Multiple `.button--primary.button--blur` and `.button--primary` buttons. See global HoverButton spec.

### Video media transition

| Property | Value |
|---|---|
| **Element** | `video, iframe, img, svg` inside `video-media` |
| **Trigger** | load / hover |
| **Method** | CSS transition |
| **Transition** | `var(--animation-short)` = `0.2s cubic-bezier(0.7, 0, 0.3, 1)` |
| **Play button** | `transition: opacity, visibility var(--animation-short)` |

---

## Section 10: Image Overlay — "Built with care"

### Background image — Zoom out

| Property | Value |
|---|---|
| **Element** | `<picture class="media banner__media">` |
| **Type** | `zoom-out` (animate-element) |
| **Trigger** | IntersectionObserver (viewport entry) |
| **Initial** | `scale(1.3)` |
| **Final** | `scale(1)` |
| **Duration** | `1.3s` / **Easing** | `[0.16, 1, 0.3, 1]` |

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 250, 280, 310ms (3 words) |
| See global animate-element spec. |

---

## Section 11: Images + Text — "Thousands of verified 5-star reviews"

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 250, 280, 310, 340, 370, 400ms (6 words) |
| See global animate-element spec. |

### Secondary image

Same as Section 7 — `parallax-element` present, parallax not active.

### CTA Button

Fill hover on `.button--primary` — see global HoverButton spec.

---

## Section 12: Image Overlay (CTA) — "Ready to transform your space?"

### Background image — Zoom out

Same spec as Section 10.

### Heading — Word-by-word reveal

| Property | Value |
|---|---|
| **Type** | `fade-up-large` |
| **Delays** | 250, 280, 310, 340, 370ms (5 words) |
| See global animate-element spec. |

### CTA Buttons (×2)

Fill hover on `.button--primary` and `.button--secondary` — see global HoverButton spec.

---

## Drawers (Cart, Search)

| Element | Method | Value |
|---|---|---|
| Overlay | CSS transition | `0.8s cubic-bezier(0.7, 0, 0.2, 1)` |
| `.drawer__header`, `.drawer__content` | CSS transition | `var(--animation-primary) 0.1s` initially; `0.35s` delay when `[active]` |
| Modal container | CSS transition | `transform 0.6s cubic-bezier(0.7, 0, 0.2, 1)` |
| Modal list items | CSS transition | `transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1)` |
| Close button icon swap | CSS transition | `var(--animation-fast)` = `0.3s cubic-bezier(0.7, 0, 0.3, 1)` |
| Drawer menu items (mobile) | Motion One | `translateY(2.5rem) → translateY(0)`, `opacity [0→1]`, `0.6s` |

---

## CSS `@keyframes` Reference

| Name | Applied to | Transform / property | Timing |
|---|---|---|---|
| `fade-in` | Overlays, modals | `opacity: 0 → 1` | — |
| `fade-out` | Overlays, modals | `opacity: 1 → 0` | — |
| `appear-down` | Dropdowns, toasts | `translateY(-1rem), opacity: 0 → translateY(0), opacity: 1` | — |
| `appear-up` | Toasts, notices | `translateY(1rem), opacity: 0 → translateY(0), opacity: 1` | — |
| `spin` | Loading spinners | `rotate(0) → rotate(360deg)` | `1s linear infinite` |
| `blink` | Cursor blink | `opacity: 1 → 0 (at 50%) → 1` | — |
| `placeholder-shimmer` | Skeleton loaders | `background-position: -150% → 150%` | — |
| `scrolling-left` | Marquee (LTR) | `translate3d(-100%, 0, 0) → translate3d(-200%, 0, 0)` | `linear infinite` |
| `scrolling-right` | Marquee (RTL) | `translate3d(-200%, 0, 0) → translate3d(-100%, 0, 0)` | `linear infinite` |
| `preloading` | Progress bar | `scaleX(0 → 1)` with alternating `transform-origin` | — |
| `beat` | Icons, badges | `scale(1) → scale(1.2) at 50% → scale(1)` | — |
| `strokeAnimation` | SVG text underlines | `stroke-dashoffset: 1 → 0`, `opacity: 0 → 1` | — |
| `hotspot` | Lookbook hotspots | `scale(1) → scale(0.9) at 50% → scale(1)` | — |
| `pswp-clockwise` | PhotoSwipe lightbox spinner | `rotate(0) → rotate(360deg)` | — |
| `rotator` + `dash` | SVG circular loader | Combined stroke-dashoffset + rotation | — |
