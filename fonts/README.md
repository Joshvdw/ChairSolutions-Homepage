# Fonts

## Plus Jakarta Sans

Per the user's brief, Plus Jakarta Sans is the system's only typeface — used for both display and body, with weight contrast (Light/Regular body, Semibold/Bold display) carrying hierarchy.

It is loaded via **Google Fonts** at the top of `colors_and_type.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap");
```

Weights in use: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).

### Note on DESIGN.md original spec

The DESIGN.md brief originally proposed Söhne (Klim Type Foundry) with GT America as alternate. The user overrode this in the conversation: **"Primary typeface: Plus Jakarta Sans."** Plus Jakarta Sans is a free, open-source geometric humanist sans with comparable proportions — slightly more humanist warmth than Söhne, similar weight contrast range. It is the typeface used throughout this system.

If a self-hosted set is required for production (offline, performance, GDPR), download the static TTFs from <https://fonts.google.com/specimen/Plus+Jakarta+Sans> and place them in this folder, then swap the `@import` for `@font-face` declarations.
