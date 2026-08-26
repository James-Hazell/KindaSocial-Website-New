# Before launch

Everything on the site is real copy written from the brand and strategy documents. This is the
short list of things that need a real asset or a decision from you before it goes live.

Ordered by how much it matters.

---

## 1. Photographs — the biggest single upgrade

The founder photography was not accessible to the build, so both portrait slots currently render a
golden-hour light study instead. It looks deliberate rather than broken, but a face beats an
abstract every time on a personal-branding site.

There are now **nineteen** image slots. Drop files into `public/images/` using the filenames in
`public/images/README.md` and they replace the placeholders automatically — one at a time is fine.

The six that matter most are the **page hero bands** (`hero.jpg`, `hero-services.jpg`, and so on).
Every page now opens with a full-bleed image, which is the single most defining thing about the
reference site's layout — and the one place a placeholder is most obvious. A 16:9 frame with some
depth in the middle works best, since the headline sits over it behind a scrim.

After those, `amy-portrait.jpg` on the About page. The warm sunset-on-a-cream-wall frames already
shot are exactly right.

## 2. Testimonials — currently placeholders

`src/data/site.ts` → `testimonials`. **Eight** quotes now, because the scrolling rail needs enough
to fill two rows without the loop reading as a loop. They are attributed generically as
"Client · Coach · United Kingdom", written in the brand's voice — but **they are not real client
words**, so swap them before launch. Fewer real ones beats eight invented ones; the rail works
from about four.

Per the brand's own rule — specific over clever — real attribution is worth chasing: a first name,
a discipline, and ideally a number in the quote itself.

## 2b. Press placements — now live, one wording change to approve

The banner runs your supplied placements: **Bloomberg, Forbes, TED, BBC, Vogue, Financial Times,
NBC, Mindvalley.** They live in `src/data/site.ts` → `featuredIn`.

Two things to check:

**The pronoun.** You sent "I've worked with personal brands that have been featured in". The site
says **"We've"**, because your brand strategy puts the agency in we-language and Amy's personal
brand in I-language. If you want the founder voice on the agency site here, it is one word in
`featuredIn.headline`.

**What the line claims.** It says your *clients* were featured, not that KindaSocial was. That
distinction is doing real work — keep it if you rewrite the line, because it is the difference
between a true claim and one that will not survive being checked.

Names are set in type rather than reproduced as logo files: each gets a treatment that evokes its
real wordmark (Forbes and the FT as upright serif caps, Vogue letterspaced, TED and NBC as tight
sans caps). Using a publication's name in a credit list is normal; redrawing their logo is not, so
the site does the first and not the second.

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
- **No client logo wall.** The scrolling banner covers this ground, and with a capped roster a
  second thin row of marks would have diluted the proof rather than added to it.
- **No Kinda Social Club page.** The Club is a section on the pricing page with a waitlist link.
  When it launches properly it deserves its own page.
