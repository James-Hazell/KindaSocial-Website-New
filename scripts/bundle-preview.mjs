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
    const file = url[1].replace(/^\/_astro\//, '').replace(/["']/g, '');
    if (!KEEP_SUBSET.test(file) || /cyrillic|greek|vietnamese/.test(file)) return '';
    const bytes = fs.readFileSync(path.join(DIST, '_astro', file));
    const data = `url(data:font/woff2;base64,${bytes.toString('base64')}) format("woff2")`;
    return block.replace(/src:[^;]+;/, `src: ${data};`);
  });
}

const cssFiles = fs
  .readdirSync(path.join(DIST, '_astro'))
  .filter((f) => f.endsWith('.css'))
  // Base first so page styles keep winning, same order the real pages load them.
  .sort((a, b) => (a.startsWith('Base') ? -1 : b.startsWith('Base') ? 1 : a.localeCompare(b)));

const css = cssFiles.map((f) => inlineFonts(read(`_astro/${f}`))).join('\n');

/* ------------------------------------------------------- 2. markup per route */

const between = (html, open, close) => {
  const a = html.indexOf(open);
  if (a === -1) return '';
  const b = html.lastIndexOf(close);
  return html.slice(a + open.length, b);
};

const first = read(routes[0].file);

// Nav and footer are identical across pages, so the shell comes from the first.
const shellNav = between(first, '<header class="nav"', '</header>');
const shellFooter = between(first, '<footer class="foot"', '</footer>');

const panels = routes.map((r) => {
  const html = read(r.file);
  const main = between(html, '<main id="main">', '</main>');
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

<header class="nav"${shellNav}</header>

<main id="main">
${panels
  .map(
    (p) => `<div class="route${p.path === '/' ? ' is-active' : ''}" data-route="${p.path}" data-title="${p.title.replace(/"/g, '&quot;')}">${p.main}</div>`,
  )
  .join('\n')}
</main>

<footer class="foot"${shellFooter}</footer>

<script>
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- reveal on scroll (same behaviour as the built site) ---- */
  function reveal(scope) {
    var targets = scope.querySelectorAll('[data-reveal]:not(.is-in)');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--reveal-delay')) {
        el.style.setProperty('--reveal-delay', (i % 6) * 65 + 'ms');
      }
      io.observe(el);
    });
  }

  /* ---- routing between panels ---- */
  var routes = document.querySelectorAll('[data-route]');
  var header = document.querySelector('[data-nav]');

  function go(pathname, push) {
    var found = false;
    routes.forEach(function (r) {
      var on = r.dataset.route === pathname;
      r.classList.toggle('is-active', on);
      if (on) { found = true; document.title = r.dataset.title; reveal(r); }
    });
    if (!found) return false;

    // Mirror the real site's current-page states.
    document.querySelectorAll('.nav__link, .panel__item a').forEach(function (a) {
      var on = a.getAttribute('href') === pathname;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (push) history.pushState({ p: pathname }, '', '#' + pathname);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
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

    if (closeMenu) closeMenu();
    go(base, true);

    if (hash) {
      setTimeout(function () {
        var t = document.getElementById(hash);
        if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }, 120);
    }
  });

  window.addEventListener('popstate', function () {
    go((location.hash || '#/').slice(1) || '/', false);
  });

  /* ---- mobile menu ---- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.querySelector('[data-nav-panel]');
  var label = document.querySelector('[data-nav-label]');
  var open = false;
  var closeMenu = null;

  if (header && toggle && panel && label) {
    function setOpen(next) {
      open = next;
      toggle.setAttribute('aria-expanded', String(next));
      header.classList.toggle('is-open', next);
      label.textContent = next ? 'Close' : 'Menu';
      document.body.style.overflow = next ? 'hidden' : '';
      if (next) {
        panel.hidden = false;
        requestAnimationFrame(function () { panel.classList.add('is-visible'); });
      } else {
        panel.classList.remove('is-visible');
        setTimeout(function () { if (!open) panel.hidden = true; }, 340);
      }
    }
    closeMenu = function () { if (open) setOpen(false); };
    toggle.addEventListener('click', function () { setOpen(!open); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 62rem)').addEventListener('change', function (e) {
      if (e.matches && open) setOpen(false);
    });
  }

  /* ---- sticky header ---- */
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- the form posts nowhere in a preview; say so rather than reloading ---- */
  var form = document.querySelector('#apply-form');
  var status = document.querySelector('[data-form-status]');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.dataset.state = 'ok';
      status.textContent =
        'This is a preview, so nothing was sent. On the live site this reaches one inbox and gets a written reply within two working days.';
      status.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ---- boot ---- */
  go((location.hash || '#/').slice(1) || '/', false);
  reveal(document);
})();
</script>
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, doc);
console.log(`${out} — ${(Buffer.byteLength(doc) / 1024 / 1024).toFixed(2)} MB, ${panels.length} routes`);
