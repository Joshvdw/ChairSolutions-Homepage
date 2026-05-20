# Website UI Kit — Chair Solutions

A hi-fi recreation of the Chair Solutions marketing homepage in the **Considered Craft** direction, following the WVH visual language. Built as small JSX components loaded via Babel-standalone — these are *recreations* meant for prototyping, not production code.

## Files

| File | What |
|---|---|
| `index.html` | Bootstraps React + Babel and composes every section into a full homepage |
| `components.jsx` | Atoms: `Nav`, `Footer`, `PillButton`, `Eyebrow`, `Stat`, `ProductCard`, `MarketTile` |
| `homepage.jsx` | Sections: `Hero`, `MarketsStrip`, `TrustedBy`, `Trending`, `Collage`, `Promise`, `FinalCTA` |

## How to use

Open `index.html` in any modern browser. The page is fully static — no backend, no real cart.

## Interactive bits (the click-thru)

- The **Market filter chips** under "Trending right now" switch which photography set the product cards display.
- Hovering any product card lifts it and casts a soft shadow.
- The sticky nav blurs the cream background once you scroll past the hero.
- The photo-overlay collage gently rotates into position the first time it enters view (handled with `IntersectionObserver` + CSS transition).

## Components covered

Hero, sticky nav, "trusted by" logo strip, market filter chips, product grid with photography, asymmetric image+text section (the signature collage move), feature strip with outline icons, final CTA over full-bleed imagery, footer with link columns. That's enough atoms to compose a product listing page, a market landing page, or a trade-portal sign-in page without writing new components.
