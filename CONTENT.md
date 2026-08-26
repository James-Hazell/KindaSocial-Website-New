# Before launch

Everything on the site is real copy written from the brand and strategy documents. This is the
short list of things that need a real asset or a decision from you before it goes live.

Ordered by how much it matters.

---

## 1. Photographs — the biggest single upgrade

The founder photography was not accessible to the build, so both portrait slots currently render a
golden-hour light study instead. It looks deliberate rather than broken, but a face beats an
abstract every time on a personal-branding site.

Drop two files into `public/images/` and they replace the placeholders automatically:

| File | Where |
| --- | --- |
| `amy-hero.jpg` | Home page hero, beside the headline |
| `amy-portrait.jpg` | About page, founder section |

Crop to **4:5**, export around 1200 × 1500. The warm sunset-on-a-cream-wall frames already shot are
exactly right — see `public/images/README.md` for the art direction notes.

## 2. Testimonials — currently placeholders

`src/data/site.ts` → `testimonials`. Three quotes, attributed generically as
"Client · Coach · United Kingdom". They are written in the brand's voice but **they are not real
client words**, so swap them before launch.

Per the brand's own rule — specific over clever — real attribution is worth chasing: a first name,
a discipline, and ideally a number in the quote itself.

## 3. Contact details — confirm these are right

In `src/data/site.ts`:

- `email` — currently `hello@kindasocial.co`. Change if the inbox is different.
- `instagram.url` — points to `instagram.com/kinda.social_`, taken from the strategy doc handle.
- `linkedin.url` — **guessed** as `linkedin.com/company/kindasocial`. This one almost certainly
  needs correcting.

## 4. Figures — confirm before they go public

Both come from the strategy documents. They appear on the home page, the results page and in the
meta descriptions, so they are the most quotable things on the site.

- **800 → 40k followers in under six months**, presented as the agency's own account.
- **49k → 156k in six months**, presented as a coaching client.

Two things to check: that you are happy publishing them, and that the second one is attributed
correctly. If the client will go on record with a name, the case study gets considerably stronger.

## 5. The founder narrative

`src/pages/about.astro`, the three paragraphs under "Amy Cotterrell". Written for you from the
strategy documents, in the brand voice, but written *for* you rather than *by* you. Read it and
make it yours — it is the one section where the words should be first-person true.

## 6. Pricing — confirm the numbers are current

Lite $1,900 · Growth $3,150 · Premium $3,900 · Club $49–$99. All from the offer ladder in the brand
strategy. They live in `src/data/site.ts` → `packages` and `club`, and flow through to the cards,
the comparison table and the contact form's dropdown.

Also decide: prices are shown in **USD**. Given the UK base and a UK/EU/US/AU client split, that is
a positioning choice worth making deliberately rather than by default.

## 7. Form delivery

The contact form works out of the box on Netlify. On any other host it needs an endpoint — see
**Forms** in `README.md`. Worth testing an actual submission end to end before you point traffic
at it.

## 8. Legal pages

There is no privacy policy or terms page. If you run paid ads to this site, Meta and Google both
expect a privacy policy at a reachable URL, and the contact form collects personal data under UK
GDPR. Worth adding before the ads funnel switches on.

---

## Things deliberately left out

Noting these so they read as decisions rather than omissions:

- **No cookie banner.** The site sets no cookies and runs no analytics. If you add analytics, you
  will need consent handling.
- **No blog.** Nothing in the strategy pointed at long-form written content as a channel, and an
  empty blog is worse than no blog. The structure supports adding one later.
- **No client logo wall.** With a capped roster and case studies doing the work, a thin logo row
  would have weakened the proof rather than strengthened it.
- **No Kinda Social Club page.** The Club is a section on the pricing page with a waitlist link.
  When it launches properly it deserves its own page.
