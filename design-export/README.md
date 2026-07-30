# Gyan Vatika Pathshala — Live Screen Prototype Export

Every **student** screen and important UI state, rendered from the **actual
existing** React components, CSS, icons, content and data — nothing here is
recreated, redesigned, or reinterpreted from file names.

- **33** screens / states across **7** groups
- Captured at the app's real mobile device viewport (390 × 810 frame)
- Each card = the live-rendered device-frame DOM + the app's own compiled
  Tailwind/CSS, inlined so it is fully self-contained

## Contents

| Path | What it is |
|------|------------|
| `prototype.html` | Single self-contained **live prototype** — all screens in one navigable viewer (published as a Claude Artifact) |
| `cards/<id>.html` | One self-contained card per screen (first line carries a `<!-- @dsCard group="…" -->` marker for Claude Design) |
| `shots/<id>.png` | Verification screenshot of each rendered screen |
| `manifest.json` | Machine-readable index of every screen/state and its preview URL |
| `capture-report.json` | Capture run report (rendered screen, byte size, image count) |

## How each screen was produced (source of truth = the running app)

1. A dev-only `?screen=<Name>&state=<variant>` preview system was added to
   `src/App.tsx`, gated behind `import.meta.env.DEV` so **production behavior is
   unchanged** (in production the app always boots the normal `Splash` flow).
2. The Vite dev server was run and the pre-installed Chromium loaded each
   manifest entry at the mobile viewport.
3. The real `[data-device-frame]` subtree + the document's compiled stylesheets
   were serialized into a self-contained card. The standalone card was
   re-rendered and confirmed pixel-identical to the live app.

Reproduce locally:

```bash
npm install
npm run dev                 # in one shell (serves on :3000)
npm run screens:capture     # writes design-export/cards + shots
npm run screens:prototype   # writes design-export/prototype.html
```

Preview any single screen in the browser (dev only):

```
http://localhost:3000/?screen=Niyam
http://localhost:3000/?screen=Search&state=results
```

## Exporting to Claude Design (claude.ai/design)

The cards under `cards/` are ready to push to a Claude Design design-system
project via the DesignSync MCP. That push needs an interactive
`/design-login`, which is **not available in a Claude Code on the web
session**. To complete it, either:

- run the sync from an interactive Claude Code terminal (`/design-login`, then
  `/design-sync`), pushing `cards/*.html` (their `@dsCard` markers build the
  Design System pane index automatically); or
- open Claude Design and use **"Send to Claude Code Web"** to seed the target
  project into the workspace, then re-run the sync here.

Until then, `prototype.html` is the live, viewable prototype of the exact same
rendered screens.

## Preserved exactly

Layout · content & data · colors · typography · spacing · cards · icons ·
navigation · and the selected / empty / locked / completed / draft / submitted
states — because each screen **is** the app's own rendered output, not a new
interpretation of it.
