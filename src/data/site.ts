/**
 * Site content.
 * Copy follows Brand Guidelines v1.0 §07–08: confident never loud, dry not jokey,
 * specific over clever. No exclamation marks. No emoji. One em-dash per sentence, max.
 *
 * Figures marked in CONTENT.md as "confirm" are drawn from the strategy documents
 * and should be verified before launch.
 */

export const site = {
  name: 'KindaSocial',
  domain: 'kindasocial.co',
  url: 'https://kindasocial.co',
  tagline: 'The ecosystem behind the personal brands you actually follow.',
  description:
    'KindaSocial is a content and growth studio for coaches, founders and consultants. We run the strategy, content, distribution and community ops behind your personal brand. You stay on camera.',
  founder: 'Amy Cotterrell',
  email: 'hello@kindasocial.co',
  instagram: { handle: '@kinda.social_', url: 'https://instagram.com/kinda.social_' },
  linkedin: { handle: 'KindaSocial', url: 'https://linkedin.com/company/kindasocial' },
  regions: ['United Kingdom & Europe', 'United States', 'Australia'],
} as const;

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Results', href: '/results' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
] as const;

/* ---------------------------------------------------------------- services */

export const services = [
  {
    n: '01',
    title: 'Strategy & positioning',
    lede: 'We decide what you stand for before we film a single thing.',
    body: 'A positioning sprint that names your angle, your audience and the three arguments you own. We map the pillars, the proof, and the offer the content is actually pointing at. Everything after this is execution against a written plan you have signed off.',
    deliverables: [
      'Positioning and messaging document',
      'Four content pillars with example angles',
      'Offer and funnel map',
      'Competitor and category teardown',
    ],
  },
  {
    n: '02',
    title: 'Content production',
    lede: 'You record. We do the other ninety percent.',
    body: 'Scripts written in your voice, shot lists you can film on a phone in one sitting, then editing, captions, overlays, thumbnails and sign-off. Twelve to twenty-four pieces a month depending on the retainer. Nothing is generated and left unread.',
    deliverables: [
      'Monthly scripts and shot lists',
      'Full edit, captions and overlays',
      'Static and carousel design',
      'Batch-day direction, remote or in person',
    ],
  },
  {
    n: '03',
    title: 'Distribution & growth',
    lede: 'Posting is not distribution. This is the part most people skip.',
    body: 'Scheduling across Instagram, TikTok, LinkedIn and YouTube Shorts, cut for each platform rather than cross-posted. We watch retention and saves rather than likes, and we rewrite the next month against what the numbers said.',
    deliverables: [
      'Platform-native scheduling',
      'Hook and retention testing',
      'Profile and bio optimisation',
      'Monthly performance read-out',
    ],
  },
  {
    n: '04',
    title: 'Community & DM ops',
    lede: 'The revenue is in the inbox. Someone has to be in there.',
    body: 'Comment and DM management with a reply framework built from your sales calls, so a warm question turns into a booked call instead of an unread request. We track which conversations came from which post, and hand you the ones worth your time.',
    deliverables: [
      'Daily comment and DM handling',
      'Qualification and booking framework',
      'Lead source tracking, post to call',
      'Weekly handover of qualified conversations',
    ],
  },
  {
    n: '05',
    title: 'Paid amplification',
    lede: 'Once something works organically, we put money behind it.',
    body: 'We do not run cold ads against untested creative. Winning organic pieces get promoted to lookalike and interest audiences, with the destination being a booked call. Available as an add-on to Growth and Premium retainers.',
    deliverables: [
      'Creative selection from organic winners',
      'Campaign build and audience setup',
      'Landing and booking-page copy',
      'Spend and cost-per-call reporting',
    ],
  },
  {
    n: '06',
    title: 'Brand systems',
    lede: 'A personal brand is an online business. It needs a system.',
    body: 'Visual identity, templates, sign-offs and file conventions so your content looks like one brand rather than twelve moods. Built once, documented, and handed to you as a guideline you keep whether you stay with us or not.',
    deliverables: [
      'Identity and template system',
      'Written brand guidelines',
      'Asset library and naming conventions',
      'Handover documentation',
    ],
  },
] as const;

/* ----------------------------------------------------------------- process */

export const process = [
  {
    n: '01',
    title: 'Apply',
    body: 'A short form, then a thirty-minute call. We look at your audience, your offer and what you have already tried. If we are not the right fit, we say so on the call rather than three weeks later.',
    duration: 'Week 0',
  },
  {
    n: '02',
    title: 'Positioning sprint',
    body: 'Two weeks of work before anything is published. We come back with the angle, the pillars, the offer map and the first month of scripts for you to approve.',
    duration: 'Weeks 1–2',
  },
  {
    n: '03',
    title: 'Batch and build',
    body: 'One filming session covers the month. We edit, design, schedule and set the profile up properly. You see everything before it goes live, in one place, once.',
    duration: 'Weeks 2–4',
  },
  {
    n: '04',
    title: 'Run the machine',
    body: 'Content ships on a rhythm, the inbox gets worked daily, and qualified conversations land with you. We rewrite the next month against what the retention data actually said.',
    duration: 'Month 2 onward',
  },
  {
    n: '05',
    title: 'Report on revenue',
    body: 'Monthly read-out on the numbers that matter: saves, retention, profile visits, conversations opened, calls booked. Traced back to the posts that caused them.',
    duration: 'Monthly',
  },
] as const;

/* ---------------------------------------------------------------- packages */

export const packages = [
  {
    name: 'Lite',
    price: '$1,900',
    cadence: 'per month',
    for: 'Founders testing whether consistent content moves anything.',
    volume: '12 pieces per month',
    features: [
      'Positioning and pillar strategy',
      '12 short-form pieces per month',
      'Scripts, editing and captions',
      'Two-platform distribution',
      'Monthly performance read-out',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$3,150',
    cadence: 'per month',
    for: 'The retainer most clients run. Enough volume to compound.',
    volume: '24 pieces per month',
    features: [
      'Everything in Lite',
      '24 short-form pieces per month',
      'Comment and DM management',
      'Three-platform distribution',
      'Hook and retention testing',
      'Fortnightly strategy call',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$3,900',
    cadence: 'per month',
    for: 'Experts whose buyers are on LinkedIn as well as Instagram.',
    volume: '24 pieces + LinkedIn',
    features: [
      'Everything in Growth',
      'Full LinkedIn authority programme',
      'Long-form written posts and articles',
      'Founder-led direction on every asset',
      'Qualified-conversation handover',
      'Weekly strategy call',
    ],
    featured: false,
  },
] as const;

export const addOns = [
  { name: 'Paid amplification', note: 'Ads built from organic winners. Media spend separate.' },
  { name: 'Email and newsletter', note: 'Weekly send written from the month’s best-performing angle.' },
  { name: 'Community management', note: 'Group, Circle or Skool moderation and prompts.' },
  { name: 'Brand identity system', note: 'One-off build. Templates, guidelines, handover.' },
] as const;

export const club = {
  name: 'KindaSocial Club',
  price: '$49–$99',
  cadence: 'per month',
  lede: 'For the people not ready for a retainer, and honest about it.',
  body: 'A membership for founders who still want to run their own content but would rather not guess. Weekly content plans, the scripts we would write, the training vault, and a monthly session where you can ask about your own account.',
  features: [
    'Weekly content plans and scripts',
    'Training vault, updated monthly',
    'Monthly live Q&A on your account',
    'Templates and hook library',
  ],
} as const;

/* ----------------------------------------------------------------- results */

export const results = [
  {
    n: '01',
    client: 'The system, proven in-house',
    discipline: 'Agency brand · Instagram',
    from: '800',
    to: '40k',
    unit: 'followers',
    window: 'Under six months',
    summary:
      'We built KindaSocial the way we build client accounts, so the method was tested on our own name before it was sold to anyone. Positioning first, one filming rhythm, distribution cut per platform, and the inbox worked daily.',
    detail: [
      'Rebuilt positioning around one argument: attention is easy, authority that books calls is not.',
      'Moved from bursts of posting to a fixed monthly batch rhythm.',
      'Tested hooks against retention rather than likes.',
      'Every qualified DM tracked back to the post that caused it.',
    ],
  },
  {
    n: '02',
    client: 'Coaching client',
    discipline: 'Personal brand · Short-form',
    from: '49k',
    to: '156k',
    unit: 'followers',
    window: 'Six months',
    summary:
      'An expert with a real audience and no system behind it. The content was good and the calendar was chaos. We took over strategy, production and distribution, and left them with one job: turn up and talk.',
    detail: [
      'Audited two years of back catalogue to find the three angles that actually travelled.',
      'Replaced ad-hoc filming with a single monthly batch day.',
      'Rebuilt the profile so a first-time visitor understood the offer in four seconds.',
      'Routed revenue conversations through the DMs rather than a cold landing page.',
    ],
  },
] as const;

export const proofPoints = [
  'Founder-led direction on every account',
  '800 to 40k followers in under six months',
  'Retention over likes',
  'You stay on camera, we run the machine',
  'No AI slop',
  'Receipts over adjectives',
] as const;

/* ------------------------------------------------------------ testimonials */
/* Placeholder quotes — see CONTENT.md. Swap for real, attributed client words. */

export const testimonials = [
  {
    quote: 'They run the whole back end of my brand. I just show up and make stuff.',
    attribution: 'Client',
    role: 'Coach · United Kingdom',
  },
  {
    quote:
      'The first month was the first time my content had a point. Not more posts. Better ones, pointed at the offer.',
    attribution: 'Client',
    role: 'Consultant · United States',
  },
  {
    quote: 'I stopped checking whether it had been posted. That is the whole thing I was paying for.',
    attribution: 'Client',
    role: 'Online educator · Australia',
  },
] as const;

/* -------------------------------------------------------------------- faqs */

export const faqs = [
  {
    q: 'Will it actually sound like me?',
    a: 'That is the first two weeks of work. We take your sales calls, your voice notes and your existing content, and we write against them until you stop editing drafts. If the first month reads like an agency wrote it, we have failed the brief and we will rewrite it.',
  },
  {
    q: 'How much of my time does this take?',
    a: 'One filming session a month, usually two to three hours, plus a fortnightly call. Approvals happen in one place, once. If you are spending longer than that, the system is not working and we will fix it.',
  },
  {
    q: 'How many other clients will I be sharing attention with?',
    a: 'We cap the roster deliberately. Amy directs every account rather than handing it to a junior, which is the reason the roster is capped rather than a nice thing we say.',
  },
  {
    q: 'I have been burned by an agency before. What is different?',
    a: 'Fair. Three things: a written strategy you sign off before anything is published, monthly reporting that traces conversations back to specific posts, and a rolling agreement rather than a twelve-month lock-in. If it is not working you can leave.',
  },
  {
    q: 'Do you use AI to write the content?',
    a: 'Not for voice. AI is fine for research and admin, and obvious the moment it touches a script. Every script is written by a person against your own words, which is the entire reason this works while the cheap version does not.',
  },
  {
    q: 'How do I know content is turning into revenue?',
    a: 'Because we track it. Every qualified conversation gets tagged with the post that started it, and the monthly read-out shows profile visits, conversations opened and calls booked rather than impressions.',
  },
  {
    q: 'How long before I see something?',
    a: 'Two weeks to strategy and first scripts. Content live in week three. Meaningful movement in retention and profile visits usually inside sixty days, compounding from there. Anyone promising faster is selling you a spike.',
  },
  {
    q: 'Where are you based, and does that matter?',
    a: 'We work with clients across the UK and Europe, the United States and Australia. Filming is remote by default, and calls sit in a window that works for your time zone.',
  },
] as const;

/* ------------------------------------------------------------- differences */

export const differences = [
  {
    n: '01',
    title: 'Founder-led, not account-managed',
    body: 'Amy works directly on every account. There is no team of juggling account managers between you and the person who set the strategy.',
  },
  {
    n: '02',
    title: 'Built as an ecosystem, not a feed',
    body: 'A personal brand is an online business. We treat it that way: positioning, content, distribution, inbox and offer, connected rather than posted at.',
  },
  {
    n: '03',
    title: 'Proof over promises',
    body: 'Real numbers, real conversations, real revenue. We show the mechanism behind the result, not just the screenshot of it.',
  },
  {
    n: '04',
    title: 'Written by people, on purpose',
    body: 'AI made content cheap, and now it reads cheap. Everything that carries your voice is written by a person against your own words.',
  },
] as const;
