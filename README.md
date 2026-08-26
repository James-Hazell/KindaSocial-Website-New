# kindasocial.co

The KindaSocial website. A static, seven-page marketing site for the agency — built from
`KindaSocial Brand Guidelines v1.0` and the 2025 strategy documents.

Built with [Astro](https://astro.build). No client framework, no runtime dependencies, ~171 KB on
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
  components/           Nav, Footer, Wordmark, Monogram, PageHero, SectionHead,
                        Portrait, CtaBand, Faq, Marquee
  pages/                one file per route
  styles/global.css     the design system — tokens, type scale, layout primitives, motion
public/
  images/               drop photographs here (see public/images/README.md)
  favicon.svg
```

**To change copy or pricing, edit `src/data/site.ts`.** The pages read from it, so a price change
lands everywhere at once — cards, comparison table, meta descriptions.

---

## The design system

`src/styles/global.css` is the single source of truth. It implements the brand guidelines directly:

| Guideline | Where it lives |
| --- | --- |
| §02 Wordmark — two tones, one pink stop | `components/Wordmark.astro` |
| §04 The mark, with the weight rule at small sizes | `components/Monogram.astro` |
| §05 Five colours, strict proportions | `:root` tokens in `global.css` |
| §06 DM Sans display, Inter body, Instrument Serif italic accent | `--font-*` tokens, `.display`/`.h1`/`.h2` |
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

### Motion

One pattern: `data-reveal` on an element fades and lifts it 16px when it scrolls into view, with a
small stagger inside each group. The observer is in `Base.astro`. Everything is disabled under
`prefers-reduced-motion: reduce`, including the marquee.

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

---

## Before launch

See `CONTENT.md` for the short list of things that need real content or a decision — photographs,
testimonials, the social handles and the contact email.
