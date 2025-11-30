// lib/posts.ts

export type Topic = 'world' | 'tech' | 'money' | 'society';

export type Post = {
  slug: string;
  title: string;
  topic: Topic;
  summary: string;
  minutes: number;
  date: string; // ISO date string
  bullets: string[];
  sections: {
    heading: string;
    body: string;
  }[];
};

const posts: Post[] = [
  {
    slug: 'hong-kong-apartment-blaze-safety-crisis',
    topic: 'world',
    title: 'Deadly Hong Kong blaze exposes hidden risks in older apartment blocks',
    summary:
      'A massive fire in aging, tightly packed buildings has killed dozens and raised urgent questions about housing safety in Hong Kong.',
    minutes: 3,
    date: '2025-11-29',
    bullets: [
      'What happened and how the fire spread through older buildings',
      'Why renovation covers and cramped layouts made it worse',
      'What this reveals about Hong Kong’s housing crisis',
    ],
    sections: [
      {
        heading: 'What happened',
        body:
          'A large fire broke out in a cluster of older apartment buildings in Hong Kong, quickly spreading through multiple floors. ' +
          'The buildings were wrapped in bamboo scaffolding and plastic sheeting due to ongoing renovations, which helped the fire jump from level to level.'
      },
      {
        heading: 'The context',
        body:
          'Hong Kong has some of the most crowded housing in the world. Older buildings often rely on outdated wiring, narrow stairwells, and improvised renovations. ' +
          'These “temporary” fixes can stay in place for years, leaving residents exposed to fire and structural risks.'
      },
      {
        heading: 'Why this matters',
        body:
          'The blaze is not just a one-off tragedy. It highlights a long-running tension between scarce housing, slow regulation, and the cost of safety upgrades. ' +
          'It also raises questions about how many other buildings might be vulnerable to similar disasters.'
      },
      {
        heading: 'What happens next',
        body:
          'Authorities are likely to announce inspections and short-term crackdowns. The bigger question is whether this turns into a deeper reform of building codes, ' +
          'enforcement, and support for low-income residents living in risky properties.'
      },
    ],
  },
  {
    slug: 'eu-targets-big-tech-with-ai-rules',
    topic: 'tech',
    title: 'EU targets big tech with new AI and competition rules',
    summary:
      'European regulators are rolling out stricter rules for AI and large platforms, reshaping how big tech operates in the region.',
    minutes: 4,
    date: '2025-11-28',
    bullets: [
      'New EU rules on AI and “gatekeeper” platforms',
      'What tech companies will have to change',
      'How this could affect users and startups',
    ],
    sections: [
      {
        heading: 'What happened',
        body:
          'The EU has introduced a new package of regulations aimed at AI systems and large digital platforms. ' +
          'These rules seek to limit opaque algorithms, risky AI uses, and anti-competitive behavior from the biggest tech companies.'
      },
      {
        heading: 'The context',
        body:
          'Europe has positioned itself as the global regulator for Big Tech, previously passing laws on data privacy (GDPR) and platform responsibility. ' +
          'The new rules extend that approach into AI and competition, targeting firms that dominate online search, social media, and app ecosystems.'
      },
      {
        heading: 'Why this matters',
        body:
          'For tech giants, it means more compliance costs and constraints on how they can use data and deploy AI. ' +
          'For users and smaller companies, it could mean more transparency and a fairer playing field — but also slower product rollouts in Europe.'
      },
      {
        heading: 'What happens next',
        body:
          'Companies will lobby for flexibility and may delay or limit certain features in the EU. The rest of the world will watch closely to see if other regions copy the EU’s approach.'
      },
    ],
  },
  {
    slug: 'inflation-cools-what-it-means-for-your-budget',
    topic: 'money',
    title: 'Inflation is cooling — but prices still feel high. Here’s why.',
    summary:
      'Inflation rates are slowing down, yet many people say their wallets still feel squeezed. Both things can be true at once.',
    minutes: 3,
    date: '2025-11-26',
    bullets: [
      'Inflation growth is slowing, but prices are not going backwards',
      'Why your grocery bill still feels painful',
      'What this means for interest rates and loans',
    ],
    sections: [
      {
        heading: 'What happened',
        body:
          'Recent data shows inflation growing more slowly than in previous months. Central banks see this as a sign that interest rate hikes are starting to work.'
      },
      {
        heading: 'The context',
        body:
          'Inflation measures how fast prices are rising, not whether they are high or low. After years of fast increases, many prices are now stuck at a higher level, ' +
          'even if they’re no longer rising as quickly.'
      },
      {
        heading: 'Why this matters',
        body:
          'Households still face higher rent, food, and energy costs compared to a few years ago. Slower inflation doesn’t rewind those increases, ' +
          'but it can make it easier for wages to catch up over time.'
      },
      {
        heading: 'What happens next',
        body:
          'If inflation keeps cooling, central banks may eventually cut rates, easing pressure on mortgages and loans. ' +
          'But they are likely to move carefully to avoid triggering another spike in prices.'
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  // newest first
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}
