/**
 * Bundles the built site (dist/) into one self-contained HTML file for preview.
 *
 * The published site is seven real pages; this collapses them into one document
 * with client-side panel switching, so the whole thing can be viewed from a
 * single link. Nothing about the design changes — the same CSS and markup the
 * real build produces, with fonts inlined as data URIs because the preview host
 * blocks external requests.
 *
 *   node scripts/bundle-preview.mjs [outfile]
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const out = process.argv[2] || 'preview/kindasocial-preview.html';

const routes = [
  { path: '/', file: 'index.html', label: 'Home' },
  { path: '/services', file: 'services/index.html', label: 'Services' },
  { path: '/results', file: 'results/index.html', label: 'Results' },
  { path: '/pricing', file: 'pricing/index.html', label: 'Pricing' },
  { path: '/about', file: 'about/index.html', label: 'About' },
  { path: '/contact', file: 'contact/index.html', label: 'Contact' },
];

const read = (p) => fs.readFileSync(path.join(DIST, p), 'utf8');

/* ---------------------------------------------------------------- 1. styles */

// Only latin subsets ship. The copy is English, and the other subsets would add
// roughly 200 KB of base64 nobody's browser would ever draw from.
const KEEP_SUBSET = /latin/;

function inlineFonts(css) {
  return css.replace(/@font-face\s*\{[^}]*\}/g, (block) => {
    const url = block.match(/url\(([^)]*\.woff2)\)/);
    if (!url) return '';
    // Font URLs are root-relative (/fonts/… now, /_astro/… when Astro fingerprints
    // them), so resolve against dist rather than assuming one directory.
    const href = url[1].replace(/["']/g, '');
    const file = path.join(DIST, href.replace(/^\//, ''));
    if (!fs.existsSync(file)) return '';
    if (!KEEP_SUBSET.test(path.basename(file)) || /cyrillic|greek|vietnamese/.test(file)) return '';
    const bytes = fs.readFileSync(file);
    const data = `url(data:font/woff2;base64,${bytes.toString('base64')}) format("woff2")`;
    return block.replace(/src:[^;]+;/, `src: ${data};`);
  });
}

const cssFiles = fs
  .readdirSync(path.join(DIST, '_astro'))
  .filter((f) => f.endsWith('.css'))
  // Base first so page styles keep winning, same order the real pages load them.
  .sort((a, b) => (a.startsWith('Base') ? -1 : b.startsWith('Base') ? 1 : a.localeCompare(b)));

// Astro's inlineStylesheets:'auto' emits small stylesheets as <style> in each
// page's <head> instead of as a file, so reading _astro/*.css alone silently
// loses component CSS — which is how the hero band arrived here unstyled.
const inlineBlocks = [];
for (const r of routes) {
  const html = read(r.file);
  for (const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g)) {
    if (!inlineBlocks.includes(m[1])) inlineBlocks.push(m[1]);
  }
}

const css = [
  ...cssFiles.map((f) => inlineFonts(read(`_astro/${f}`))),
  ...inlineBlocks.map(inlineFonts),
].join('\n');

// Fail loudly rather than shipping a page that merely looks wrong. These are
// rules the layout cannot do without; if the collection above ever misses a
// source again, the build stops here instead of at the user.
for (const rule of ['band__scrim', 'band__inner', 'nav__bar', 'tiles', 'fi__track', 'iq__quote', 'sw__i']) {
  if (!css.includes(rule)) throw new Error(`bundle-preview: stylesheet is missing .${rule}`);
}

/* ------------------------------------------------------- 2. markup per route */

/**
 * Pull one element out of the built HTML, opening tag to matching close.
 *
 * Naive indexOf/lastIndexOf does not work here: SectionHead renders a <header>,
 * the rails render <aside>, so "last closing tag on the page" is nowhere near
 * the element being extracted. This walks forward counting depth instead, and
 * throws rather than returning a plausible-looking wrong slice — a bundler that
 * silently emits three copies of the nav is worse than one that stops.
 */
const extract = (html, startMarker, tag) => {
  const a = html.indexOf(startMarker);
  if (a === -1) throw new Error(`bundle-preview: could not find ${startMarker}`);

  const open = new RegExp(`<${tag}\\b`, 'g');
  const close = new RegExp(`</${tag}\\s*>`, 'g');
  open.lastIndex = a;

  let depth = 0;
  let i = a;

  while (i < html.length) {
    open.lastIndex = i;
    close.lastIndex = i;
    const o = open.exec(html);
    const c = close.exec(html);
    if (!c) throw new Error(`bundle-preview: unclosed <${tag}> from ${startMarker}`);

    if (o && o.index < c.index) {
      depth += 1;
      i = o.index + o[0].length;
    } else {
      depth -= 1;
      i = c.index + c[0].length;
      if (depth === 0) return html.slice(a, i);
    }
  }
  throw new Error(`bundle-preview: unbalanced <${tag}> from ${startMarker}`);
};

/** Inner HTML of an element, for the route panels. */
const innerOf = (outer, tag) =>
  outer.slice(outer.indexOf('>') + 1, outer.lastIndexOf(`</${tag}`));

const first = read(routes[0].file);

// Nav, top bar, footer and the back-to-top live outside <main>, identical on
// every page, so the shell comes from the first.
const shellNav = extract(first, '<header class="nav"', 'header');
const shellFooter = extract(first, '<footer class="foot"', 'footer');
const shellTopbar = extract(first, '<aside class="topbar"', 'aside');
const shellTotop = extract(first, '<button class="totop"', 'button');

// Astro inlines each component's script as a module. Reusing them verbatim
// means the preview animates exactly as the site does — a re-implementation
// here would drift the moment the real one changed. The client router is an
// external file and is deliberately not included: it would fight the panel
// routing below.
const moduleScripts = [];
for (const r of routes) {
  const html = read(r.file);
  for (const m of html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)) {
    if (!moduleScripts.includes(m[1])) moduleScripts.push(m[1]);
  }
}

const panels = routes.map((r) => {
  const html = read(r.file);
  const main = innerOf(extract(html, '<main id="main"', 'main'), 'main');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'KindaSocial';
  return { ...r, main, title };
});

/* ------------------------------------------------------------ 3. compose */

// The preview host controls <head>, so this is the only place a charset can be
// declared. Browsers pick it up during the encoding pre-scan of the first bytes;
// without it, em-dashes and curly quotes render as mojibake over file://.
const doc = `<meta charset="utf-8" />
<title>KindaSocial</title>

<style>
${css}

/* ---- preview shell only: route panels, not part of the real site ---- */
.route { display: none; }
.route.is-active { display: block; }
</style>

<a class="skip-link" href="#main">Skip to content</a>
<div class="grain" aria-hidden="true"></div>

${shellTopbar}

${shellNav}

<main id="main">
${panels
  .map(
    (p) => `<div class="route${p.path === '/' ? ' is-active' : ''}" data-route="${p.path}" data-title="${p.title.replace(/"/g, '&quot;')}">${p.main}</div>`,
  )
  .join('\n')}
</main>

${shellFooter}

${shellTotop}

${moduleScripts.map((js) => `<script type="module">${js}</script>`).join('\n')}

<script>
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var routes = document.querySelectorAll('[data-route]');

  function go(pathname, push) {
    var found = false;
    routes.forEach(function (r) {
      var on = r.dataset.route === pathname;
      r.classList.toggle('is-active', on);
      if (on) { found = true; document.title = r.dataset.title; }
    });
    if (!found) return false;

    document.querySelectorAll('.nav__link, .panel__item a').forEach(function (a) {
      var on = a.getAttribute('href') === pathname;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (push) history.pushState({ p: pathname }, '', '#' + pathname);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

    // The real motion code re-initialises on this event, which is exactly what
    // a router swap needs — so the preview reuses it rather than duplicating it.
    document.dispatchEvent(new Event('astro:page-load'));
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/"]');
    if (!a || a.target === '_blank') return;
    var url = a.getAttribute('href');
    var base = url.split('#')[0].replace(/\\/$/, '') || '/';
    var hash = url.indexOf('#') > -1 ? url.slice(url.indexOf('#') + 1) : '';
    if (!document.querySelector('[data-route="' + base + '"]')) return;
    e.preventDefault();

    // Close the mobile panel by driving its own toggle, so its state stays honest.
    var toggle = document.querySelector('[data-nav-toggle]');
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') toggle.click();

    go(base, true);

    if (hash) {
      setTimeout(function () {
        var t = document.getElementById(hash);
        if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }, 160);
    }
  });

  window.addEventListener('popstate', function () {
    go((location.hash || '#/').slice(1) || '/', false);
  });

  go((location.hash || '#/').slice(1) || '/', false);
})();
</script>
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, doc);
console.log(`${out} — ${(Buffer.byteLength(doc) / 1024 / 1024).toFixed(2)} MB, ${panels.length} routes`);
