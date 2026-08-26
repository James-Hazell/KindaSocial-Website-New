# Images

Drop photographs in this folder using the exact filenames below and they replace the
placeholder art automatically at build time — no code change needed.

| Filename            | Where it appears        | Crop  | Suggested export     |
| ------------------- | ----------------------- | ----- | -------------------- |
| `amy-hero.jpg`      | Home page hero, beside the headline | 4:5 portrait | 1200 × 1500, ~85% quality |
| `amy-portrait.jpg`  | About page, founder section         | 4:5 portrait | 1200 × 1500, ~85% quality |

## Until then

`src/components/Portrait.astro` checks whether the file exists. If it does not, it renders a
golden-hour light study in its place — warm wall, raking late light, a soft cast shadow. That is
deliberately the same art direction as the shoot, so the page reads as finished rather than broken,
and swapping the real photo in is visually continuous.

## Art direction

The existing founder photography is the reference: late low sun, cream or off-white wall, the
subject's shadow thrown beside them, warm amber falloff into shade. Keep it. It is the one warm
thing against a Midnight interface, which is exactly why it works.

- Shoot or crop to **4:5**. The frames are `object-fit: cover`, so anything else gets cropped.
- Keep the subject's eyeline in the upper third.
- Do not colour-correct the warmth out. The amber cast is doing the work.
- Export at roughly twice the display size, no larger. These are hero images, not print files.

## Other assets

- `og-default.png` — 1200 × 630 social share card. Regenerate only if the headline changes.
- `../favicon.svg` and `../apple-touch-icon.png` — the `ks.` monogram per Brand Guidelines §04.
