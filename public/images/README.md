# Images

Drop photographs here using the exact filenames below and they replace the placeholder art
automatically at build time — no code change needed. Add them one at a time; there is no
all-or-nothing.

## Page heroes — full-bleed bands

These are the widest, most prominent images on the site. Type sits over them, so pick frames with
a calm area in the middle.

| Filename | Page | Crop | Export |
| --- | --- | --- | --- |
| `hero.jpg` | Home | 16:9 | 2400 × 1350 |
| `hero-services.jpg` | Services | 16:9 | 2400 × 1350 |
| `hero-results.jpg` | Results | 16:9 | 2400 × 1350 |
| `hero-about.jpg` | About | 16:9 | 2400 × 1350 |
| `hero-pricing.jpg` | Pricing | 16:9 | 2400 × 1350 |
| `hero-contact.jpg` | Contact | 16:9 | 2400 × 1350 |

## Who we work with — caption tiles

Captions sit on the lower part of each image, so keep the bottom third uncluttered.

| Filename | Crop | Export |
| --- | --- | --- |
| `client-coach.jpg` | 4:3 | 1200 × 900 |
| `client-founder.jpg` | 4:3 | 1200 × 900 |
| `client-consultant.jpg` | 4:3 | 1200 × 900 |
| `client-educator.jpg` | 4:3 | 1200 × 900 |

## Portraits and supporting frames

| Filename | Where | Crop | Export |
| --- | --- | --- | --- |
| `batch-day.jpg` | Home, beside "How it works" | 3:4 | 1000 × 1333 |
| `amy-portrait.jpg` | About, founder section | 4:5 | 1200 × 1500 |
| `studio-01.jpg` | About, studio strip — filming | 4:5 | 900 × 1125 |
| `studio-02.jpg` | About, studio strip — the read-out | 4:5 | 900 × 1125 |
| `studio-03.jpg` | About, studio strip — the inbox | 4:5 | 900 × 1125 |
| `process-01.jpg` | Services, above the ninety-day process | 21:9 | 1800 × 771 |
| `case-01.jpg` | Results, first case study | 4:3 | 1000 × 750 |
| `case-02.jpg` | Results, second case study | 4:3 | 1000 × 750 |
| `amy-call.jpg` | Contact, beside the form | 4:3 | 1000 × 750 |

## Until then

`Portrait.astro` and `HeroBand.astro` check whether each file exists. If it does not, they render a
golden-hour light study in its place — warm wall, raking late light, the cast band of a window.
Deliberately the same art direction as the shoot, so pages read as finished rather than broken and
swapping the real photo in is visually continuous. Six variants ship, two of them cool rather than
warm, so a page with several frames never repeats a panel.

## Art direction

The existing founder photography is the reference: late low sun, cream or off-white wall, the
subject's shadow thrown beside them, warm amber falloff into shade. Keep it. It is the one warm
thing against a Midnight interface, which is exactly why it works.

- Match the crop in the tables. Frames are `object-fit: cover`, so anything else gets cropped.
- Hero bands carry a scrim so type stays legible on any photograph. Bright, busy frames still work,
  but a frame with some depth in the middle will look better.
- Keep the subject's eyeline in the upper third on the portrait crops.
- Do not colour-correct the warmth out. The amber cast is doing the work.
- Export at roughly twice the display size, no larger. These are hero images, not print files.

## Other assets

- `og-default.png` — 1200 × 630 social share card. Regenerate only if the headline changes.
- `../favicon.svg` and `../apple-touch-icon.png` — the `ks.` monogram per Brand Guidelines §04.

## Added in the latest pass

| Filename | Where | Crop | Export |
| --- | --- | --- | --- |
| `quote-home.jpg` | Home, first quote band | 16:9 | 2000 × 1125 |
| `quote-proof.jpg` | Home, second quote band | 16:9 | 2000 × 1125 |
| `quote-services.jpg` | Services, quote band | 16:9 | 2000 × 1125 |
| `quote-results.jpg` | Results, quote band | 16:9 | 2000 × 1125 |
| `service-01.jpg` … `service-06.jpg` | Services, one per alternating row | 4:3 | 1200 × 900 |
| `studio-04.jpg` … `studio-06.jpg` | About, extended studio strip | 4:5 | 900 × 1125 |

Quote bands carry a scrim and a slow parallax drift, so frames with depth in the middle read best.
Anything flat and evenly lit will still work; it just does less.
