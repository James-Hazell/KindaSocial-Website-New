# kindasocial.co

The KindaSocial website. A static, seven-page marketing site for the agency — built from
`KindaSocial Brand Guidelines v1.0` and the 2025 strategy documents.

Built with [Astro](https://astro.build). No client framework, no runtime dependencies, ~129 KB on
first load across six requests.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve the built output
```

Node 18 or newer.

---

## Where things live

```
src/
  data/site.ts          all copy, pricing, services, FAQs — edit here, not in the pages
  layouts/Base.astro    <head>, SEO meta, JSON-LD, the scroll-reveal observer
  components/           TopBar, Nav, Footer, Wordmark, Monogram, HeroBand,
                        PageHero, SectionHead, Portrait, TileGrid, CityStrip,
                        CtaBand, Faq, Marquee, FeaturedIn, TestimonialRail,
                        SocialTile, ScrollTop
  pages/                one file per route
  styles/global.css     the design system — tokens, type scale, layout primitives, motion
  styles/fonts.css      the four @font-face declarations, latin only
public/
  fonts/                the woff2 files those declarations point at
  images/               drop photographs here (see public/images/README.md)
  favicon.svg
```

**To change copy or pricing, edit `src/data/site.ts`.** The pages read from it, so a price change
lands everywhere at once — cards, comparison table, meta descriptions.

---

## Layout reference

The composition follows prestidgegroup.com, at the client's direction: a permanent solid masthead
rather than a transparent header, full-bleed image bands opening every page with the headline
centred over a scrim, centred section heads with one narrow line beneath, photo tiles with the
caption laid directly on the image, square corners throughout, a press band, a reach strip, a
services mega-menu and a circular back-to-top.

What did **not** come across is the palette and typography. That side stays KindaSocial's own —
Midnight/Pearl/Chrome with Violet and Hot Pink, DM Sans and Instrument Serif, Title Case rather
than the reference's centred all-caps. Violet in particular was pulled back off buttons toward the
5% the guidelines actually specify, which is both closer to the reference's restraint and more
faithful to the brand document than the earlier build was.

---

## The design system

`src/styles/global.css` is the single source of truth. It implements the brand guidelines directly:

| Guideline | Where it lives |
| --- | --- |
| §02 Wordmark — two tones, one pink stop | `components/Wordmark.astro` |
| §04 The mark, with the weight rule at small sizes | `components/Monogram.astro` |
| §05 Five colours, strict proportions | `:root` tokens in `global.css` |
| §06 DM Sans display, Instrument Serif italic accent (body face deviates — see below) | `--font-*` tokens, `.display`/`.h1`/`.h2` |
| §09 The four social templates | `components/SocialTile.astro`, rendered live on the home page |
| §07–08 Voice — confident, dry, specific | all copy in `src/data/site.ts` |

Colour proportion holds across the site: Midnight and Pearl carry 80%+ of every surface, Violet
takes one brand moment per page, Pink is the single detail. Light sections use `.on-pearl`, which
inverts the palette — including swapping Chrome for a darker `--ink-muted`, since Chrome fails
contrast on Pearl.

Two deliberate deviations from a literal reading of the guidelines, both for screen legibility:

- The wordmark's "Social" is lifted from `#6E3CFF` to `#9D7CFF` on Midnight. Pure Violet on
  Midnight is 3.4:1 — fine for large display type, not for a 20px wordmark.
- Caption sizes are 11–12px rather than the 8–9pt print spec, and the watermark monogram on light
  cards uses a darker pink for its stop. The guidelines' own rule applies: the mark should never
  look like dust.
- **The body face is Instrument Sans, not Inter.** Guidelines §06 specify Inter; the $10K checklist
  names Inter as a disqualifier. Instrument Sans resolves the conflict in the checklist's favour and
  happens to be the companion to the Instrument Serif already in use, so the three faces come from
  two families rather than three unrelated ones. It is also 29.4KB against Inter's 47.1KB. To revert,
  change `--font-body` in `global.css` — it is one token and nothing else references the face.

### Fonts

Declared directly in `src/styles/fonts.css` rather than imported from `@fontsource`, and served
from `public/fonts/` as latin-only. The packages ship every subset as separate `@font-face` blocks,
each downloading only when a character matches — which sounds harmless until one stray glyph pulls a
whole file. A single `№` was fetching 18.3KB of Cyrillic on every page load, because U+2116 sits
inside fontsource's cyrillic range. Declaring the four faces by hand makes that impossible by
construction rather than by vigilance.

Arrows, ticks and crosses (→ ✓ ✕ ↻) fall outside the latin range and fall back to the system UI
font. That is deliberate: they render near-identically and cost nothing.

**There is no `<link rel="preload">` on the fonts, on purpose.** It was tried and measured: on Slow
4G it pushed first paint from 1.6s to 3.0s and largest paint from 1.6s to 4.3s, because the eager
font fetch competes with render-critical HTML for a narrow pipe. `font-display: swap` alone is
faster here.

### Motion

Everything lives in `components/Motion.astro`, re-initialising on `astro:page-load` as well as
first paint — the client router swaps the document without re-running module scripts.

| Hook | Entrance | Used for |
| --- | --- | --- |
| `data-split` | lines rise out of a mask, staggered per line | big headings |
| `data-reveal` | fade, 10px rise | body copy, cards, list rows |
| `data-reveal="text"` | clip-wipe downward, no opacity | headings JS did not split |
| `data-reveal="media"` | wipe up, picture settles out of a push-in | images and framed panels |
| `data-reveal="rule"` | scaleX from the left | hairlines |
| `data-parallax` | drifts against the scroll | full-bleed images |
| `data-count` | digits count up once | stat figures |

`data-split` wraps each word, measures which line it landed on, and staggers **by line** — per-word
ripple reads as a gimmick. It is pure progressive enhancement: the styles only bite once the script
adds `.is-split`, so a failure leaves plain visible text rather than an empty heading. Lines are
re-measured on resize.

Parallax is native `animation-timeline: view()` — no scroll listener, no JS, and simply static
where the browser lacks it.

Two things worth knowing before changing the reveal timing:

- The observer's negative bottom `rootMargin` buys a slightly-early entrance but carves out a dead
  band at maximum scroll, where footer content can never intersect and would stay clipped forever.
  `sweep()` closes that. Do not remove it.
- Stagger is counted **per section**, not across the document, so the tenth section starts its own
  sequence rather than picking up mid-way through a global one.

Three things loop continuously: the proof marquee, the press rail and the testimonial rail (two
rows, opposite directions, pausing on hover and keyboard focus). Page transitions cross-fade via
Astro's `ClientRouter`. All of it — reveals, marquees, parallax, count-ups, the top bar's pulse —
stops under `prefers-reduced-motion: reduce`, where the rails become ordinary scrollers with a tab
stop.

---

## Forms

The contact form works on **Netlify** as-is — `data-netlify="true"` and the hidden `form-name`
field mean Netlify picks it up at build time, with a honeypot on `company-website`.

On any other host, set `FORM_ENDPOINT` at the top of `src/pages/contact.astro` to a
[Formspree](https://formspree.io), [Basin](https://usebasin.com) or Formcarry URL. With an endpoint
set, the form submits over `fetch` and shows an inline success message instead of navigating away.

---

## A shareable preview

```bash
npm run preview:bundle
```

Collapses the built site into one self-contained HTML file at
`preview/kindasocial-preview.html` — every page, fonts inlined, client-side switching between
routes. Useful for sending someone the site before there is anywhere to deploy it. It is a preview
of the real build, not a second copy to maintain: it is generated from `dist/`, so it can never
drift from the site.

---

## Deploying

The build output in `dist/` is plain static files — any host will serve it.

- **Netlify** — `netlify.toml` is committed. Connect the repo and it builds. Forms work immediately.
- **Vercel** — `vercel.json` is committed. Import the repo; the framework preset is detected.
- **Cloudflare Pages** — build command `npm run build`, output directory `dist`.
- **GitHub Pages** — works, but set `site` in `astro.config.mjs` to the Pages URL first.

Before the first deploy, change `site` in `astro.config.mjs` if the domain is not `kindasocial.co`.
It feeds canonical URLs, the sitemap and Open Graph tags.

---

## Checks

```bash
npm run build                       # must pass clean
```

The site was verified at 320, 390, 768, 1024 and 1440px with no horizontal overflow, and audited
with axe-core against WCAG 2.1 A/AA plus best-practice rules — **zero violations across all seven
pages**. Keyboard navigation, the mobile menu (including Escape-to-close and focus return) and the
FAQ accordion were tested directly.

One thing worth knowing before you edit: the `Monogram` tones (`pearl`, `chrome`, `muted`) are each
calibrated to the ground they sit on. Fading one with `opacity` to make it recede drops it under AA
and, per the guidelines' own rule, makes the mark look like dust. Pick a different tone instead.

---

## Before launch

See `CONTENT.md` for the short list of things that need real content or a decision — photographs,
testimonials, the social handles and the contact email.
