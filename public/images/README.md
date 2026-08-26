# Images

Drop photographs here using the exact filenames below and they replace the placeholder art
automatically at build time — no code change needed.

| Filename | Where it appears | Crop | Export |
| --- | --- | --- | --- |
| `amy-hero.jpg` | Home hero, main frame | 4:5 | 1200 × 1500 |
| `amy-working.jpg` | Home hero, square inset | 1:1 | 900 × 900 |
| `batch-day.jpg` | Home, beside "How it works" | 3:4 | 1000 × 1333 |
| `amy-portrait.jpg` | About, founder section | 4:5 | 1200 × 1500 |
| `studio-01.jpg` | About, studio strip — filming | 4:5 | 900 × 1125 |
| `studio-02.jpg` | About, studio strip — the read-out | 4:5 | 900 × 1125 |
| `studio-03.jpg` | About, studio strip — the inbox | 4:5 | 900 × 1125 |
| `process-01.jpg` | Services, above the ninety-day process | 21:9 | 1800 × 771 |
| `case-01.jpg` | Results, first case study | 4:3 | 1000 × 750 |
| `case-02.jpg` | Results, second case study | 4:3 | 1000 × 750 |
| `amy-call.jpg` | Contact, beside the form | 4:3 | 1000 × 750 |

Any you don't supply keep their placeholder. There is no all-or-nothing — add them as you get them.

## Until then

`src/components/Portrait.astro` checks whether each file exists. If it does not, it renders a
golden-hour light study in its place — warm wall, raking late light, the cast band of a window.
That is deliberately the same art direction as the shoot, so pages read as finished rather than
broken and swapping the real photo in is visually continuous. Six variants ship, two of them cool
rather than warm, so a page with several frames never reads as the same panel repeated.

## Art direction

The existing founder photography is the reference: late low sun, cream or off-white wall, the
subject's shadow thrown beside them, warm amber falloff into shade. Keep it. It is the one warm
thing against a Midnight interface, which is exactly why it works.

- Match the crop in the table. Frames are `object-fit: cover`, so anything else gets cropped.
- Keep the subject's eyeline in the upper third on the portrait crops.
- Do not colour-correct the warmth out. The amber cast is doing the work.
- Export at roughly twice the display size, no larger. These are hero images, not print files.

## Other assets

- `og-default.png` — 1200 × 630 social share card. Regenerate only if the headline changes.
- `../favicon.svg` and `../apple-touch-icon.png` — the `ks.` monogram per Brand Guidelines §04.
