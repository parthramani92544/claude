# PlastoShip — Manufacturer Panel

The manufacturer-facing business portal for the PlastoShip B2B marketplace.

> **Design rule:** this panel is an *extension of the PlastoShip website*, not an
> ERP/admin dashboard. Every screen stays light, calm and uncluttered — white
> cards on Paper Light, soft borders, minimal shadows, generous whitespace.
> If a screen starts to feel like a control panel, it has gone wrong.

## Screens

| Screen | Component | Status |
|--------|-----------|--------|
| Manufacturer Login | `ManufacturerLogin.tsx` | ✅ Built |

## Viewing it

```bash
npm install
npm run dev          # then open http://localhost:3000/plastoship.html
```

The panel has its own Vite entry (`plastoship.html` → `src/plastoship/main.tsx`),
separate from the host app's `index.html`. This is deliberate: the host app's
`src/index.css` rewrites Tailwind's entire color palette to a warm ivory/forest
theme, which would silently repaint anything the panel rendered inside it. The
panel ships its own tokens instead and depends on none of that.

## Brand

| Token | Value | Used for |
|-------|-------|----------|
| `--ps-ink-navy` | `#0B1F3A` | Headings, wordmark, brand mark, input text |
| `--ps-dispatch-orange` | `#FF7A18` | Primary CTA and highlights — nothing else |
| `--ps-paper-light` | `#F4F7FC` | Page background |
| `--ps-steel` | `#5A6B82` | Secondary text, field labels, helper copy |
| `--ps-border` | `#E6EAF0` | Card and input borders |

**Typography** — Plus Jakarta Sans for *all* UI text, headings, navigation and
cards. Space Mono (`.ps-mono`) is reserved exclusively for technical codes and
IDs: order IDs, SKU codes, GSTIN, dispatch numbers. Never for UI copy.

**Shape & elevation** — cards `16px`, controls `12px`. Shadows stay minimal;
Dispatch Orange gets a soft lift, never a glow.

## Conventions

- All styles are namespaced `ps-` and scoped under a `.ps-root` wrapper, so the
  panel renders identically wherever it is mounted and cannot leak into a host
  page.
- The scoped reset in `tokens.css` is wrapped in `:where()` so it carries **zero
  specificity**. Written plainly, `.ps-root p { margin: 0 }` scores 0,1,1 and
  silently beats every single-class component rule — which is exactly how the
  CTA lost its white text and the help link lost its spacing during the first
  build of this screen. Keep new resets inside `:where()`.
- Light theme only. No dark surfaces, no gradients, no neon.
- One primary action per screen. Resist adding options the brief did not ask
  for — on Login that means no social sign-in, no "remember me", no sign-up
  cross-sell.

## Files

| File | What it is |
|------|------------|
| `tokens.css` | Brand tokens + scoped reset — the design system's source of truth |
| `PlastoShipLogo.tsx` | Brand lockup (mark + wordmark) |
| `ManufacturerLogin.tsx` | Manufacturer Login screen |
| `ManufacturerLogin.css` | Login screen styles, incl. the mobile breakpoint |
| `main.tsx` | Mount point for the `plastoship.html` entry |
| `index.ts` | Public exports for embedding the panel elsewhere |
