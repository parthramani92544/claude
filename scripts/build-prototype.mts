/**
 * Assemble the individually-captured screen cards into ONE self-contained live
 * prototype viewer (design-export/prototype.html). The app's compiled CSS is
 * inlined once; every screen is the real rendered device-frame DOM. A left rail
 * (mirroring the app's own Interactive Switcher) hot-swaps screens.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SCREEN_MANIFEST from '../src/screenManifest.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CARDS = path.join(ROOT, 'design-export', 'cards');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function extractCss(card: string): string {
  const m = card.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}
function extractDevice(card: string): string {
  const m = card.match(/<div class="ds-stage">\s*([\s\S]*?)\s*<\/div>\s*<\/body>/);
  return m ? m[1] : '';
}

async function main() {
  let appCss = '';
  const screens: { entry: any; html: string }[] = [];

  for (const entry of SCREEN_MANIFEST) {
    const card = await readFile(path.join(CARDS, `${entry.id}.html`), 'utf8');
    if (!appCss) appCss = extractCss(card);
    screens.push({ entry, html: extractDevice(card) });
  }

  // Group preserving manifest order.
  const groups: string[] = [];
  for (const { entry } of screens) if (!groups.includes(entry.group)) groups.push(entry.group);

  const nav = groups
    .map((g) => {
      const items = screens
        .filter((s) => s.entry.group === g)
        .map(
          ({ entry }, i) => `
          <button class="scr" data-target="${entry.id}"${
            entry.id === screens[0].entry.id ? ' aria-current="true"' : ''
          }>
            <span class="scr-idx">${String(SCREEN_MANIFEST.indexOf(entry) + 1).padStart(2, '0')}</span>
            <span class="scr-body">
              <span class="scr-title">${esc(entry.title)}</span>
              ${
                entry.states
                  ? `<span class="scr-states">${entry.states
                      .map((st: string) => `<span class="chip">${esc(st)}</span>`)
                      .join('')}</span>`
                  : ''
              }
            </span>
          </button>`
        )
        .join('');
      return `
        <div class="grp">
          <div class="grp-h">${esc(g)}</div>
          ${items}
        </div>`;
    })
    .join('');

  const stages = screens
    .map(
      ({ entry, html }, i) => `
      <div class="stage-item${i === 0 ? ' on' : ''}" data-id="${entry.id}">
        <div class="frame-wrap">${html}</div>
        <div class="stage-meta">
          <div class="sm-title">${esc(entry.title)}</div>
          <div class="sm-desc">${esc(entry.description)}</div>
          <div class="sm-tags"><span class="sm-screen">activeScreen: ${esc(entry.screen)}</span>${
            entry.state ? `<span class="sm-screen">state: ${esc(entry.state)}</span>` : ''
          }${(entry.states || [])
        .map((st: string) => `<span class="chip">${esc(st)}</span>`)
        .join('')}</div>
        </div>
      </div>`
    )
    .join('');

  const shell = `<!-- prototype viewer -->
<style>
/* ── App's own compiled styles (captured live) — carry every screen's exact look ── */
${appCss}
</style>
<style>
/* ── Prototype studio shell — honors the app's forest-green / ivory / gold identity ── */
:root{
  --bg:#070b13; --panel:#0d1420; --panel-2:#0f1a12; --line:#1e2a3a;
  --forest:#163E2B; --emerald:#34d399; --gold:#C5A059;
  --ink:#e2e8f0; --ink-dim:#94a3b8; --ink-faint:#64748b;
  --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
}
*{box-sizing:border-box}
.proto{min-height:100vh;background:
    radial-gradient(680px 480px at 12% 0%, rgba(22,62,43,.28), transparent 60%),
    radial-gradient(720px 520px at 100% 100%, rgba(197,160,89,.10), transparent 55%),
    var(--bg);
  color:var(--ink);font-family:var(--sans);display:grid;grid-template-columns:340px 1fr;}
.rail{border-right:1px solid var(--line);padding:22px 16px 40px;position:sticky;top:0;height:100vh;overflow-y:auto;}
.brand{display:flex;align-items:center;gap:10px;margin-bottom:4px;}
.brand-dot{width:9px;height:9px;border-radius:50%;background:var(--emerald);box-shadow:0 0 0 4px rgba(52,211,153,.15);}
.brand-name{font-weight:800;letter-spacing:-.01em;}
.brand-sub{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin:2px 0 16px;}
.count-row{display:flex;gap:6px;margin-bottom:18px;flex-wrap:wrap;}
.pill{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 9px;border-radius:999px;border:1px solid var(--line);color:var(--ink-dim);}
.pill.on{color:var(--emerald);border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.06);}
.grp{margin-bottom:14px;}
.grp-h{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint);padding:8px 8px 6px;}
.scr{width:100%;text-align:left;display:flex;gap:10px;align-items:flex-start;padding:9px 10px;border-radius:12px;border:1px solid transparent;background:none;color:var(--ink-dim);cursor:pointer;font-family:var(--sans);transition:background .15s,color .15s,border-color .15s;}
.scr:hover{background:rgba(148,163,184,.06);color:var(--ink);}
.scr[aria-current="true"]{background:var(--forest);color:#fff;border-color:rgba(52,211,153,.25);}
.scr[aria-current="true"] .scr-idx{color:var(--emerald);}
.scr-idx{font-family:var(--mono);font-size:11px;color:var(--ink-faint);padding-top:1px;}
.scr-body{display:flex;flex-direction:column;gap:4px;}
.scr-title{font-size:13px;font-weight:600;}
.scr-states{display:flex;flex-wrap:wrap;gap:4px;}
.chip{font-family:var(--mono);font-size:9px;letter-spacing:.04em;text-transform:uppercase;padding:2px 6px;border-radius:999px;background:rgba(197,160,89,.12);color:var(--gold);border:1px solid rgba(197,160,89,.2);}
.stage{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:36px 24px 60px;overflow-y:auto;height:100vh;}
.stage-item{display:none;flex-direction:column;align-items:center;gap:22px;}
.stage-item.on{display:flex;animation:fade .28s ease;}
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.frame-wrap{filter:drop-shadow(0 30px 60px rgba(0,0,0,.55));}
.stage-meta{max-width:460px;text-align:center;}
.sm-title{font-size:16px;font-weight:800;letter-spacing:-.01em;}
.sm-desc{font-size:13px;color:var(--ink-dim);margin-top:6px;line-height:1.5;}
.sm-tags{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:12px;}
.sm-screen{font-family:var(--mono);font-size:10px;letter-spacing:.03em;padding:3px 8px;border-radius:999px;border:1px solid var(--line);color:var(--ink-faint);}
@media (prefers-reduced-motion:reduce){.stage-item.on{animation:none}}
@media (max-width:820px){.proto{grid-template-columns:1fr}.rail{position:static;height:auto;max-height:none}}
</style>

<div class="proto">
  <aside class="rail">
    <div class="brand"><span class="brand-dot"></span><span class="brand-name">Gyan Vatika Pathshala</span></div>
    <div class="brand-sub">Student Screen Prototype</div>
    <div class="count-row">
      <span class="pill on">${screens.length} screens</span>
      <span class="pill">${groups.length} groups</span>
      <span class="pill">live render</span>
    </div>
    ${nav}
  </aside>
  <main class="stage">
    ${stages}
  </main>
</div>

<script>
(function(){
  var btns = Array.prototype.slice.call(document.querySelectorAll('.scr'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.stage-item'));
  function show(id){
    items.forEach(function(el){ el.classList.toggle('on', el.getAttribute('data-id')===id); });
    btns.forEach(function(b){
      if(b.getAttribute('data-target')===id){ b.setAttribute('aria-current','true'); }
      else { b.removeAttribute('aria-current'); }
    });
    var stage = document.querySelector('.stage'); if(stage) stage.scrollTop = 0;
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ show(b.getAttribute('data-target')); }); });
})();
</script>
`;

  await writeFile(path.join(ROOT, 'design-export', 'prototype.html'), shell, 'utf8');
  console.log(`Built prototype.html with ${screens.length} screens, ${groups.length} groups. CSS ${appCss.length}B.`);
}

main();
