export type BlogCategory =
  | "Design"
  | "Development"
  | "Performance"
  | "SEO"
  | "Business";

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content: BlogSection[];
};

export const BLOG_CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Performance",
  "SEO",
  "Business",
] as const;

export type BlogFilter = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "modern-ui-design-trends",
    title: "Modern UI Design Trends",
    excerpt:
      "A well designed interface is more than just visuals. It improves user experience, builds trust, and helps users complete tasks smoothly.",
    category: "Design",
    author: "Olivia Carter",
    authorRole: "Creative Director",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
    publishedAt: "2026-07-07",
    readTime: "15 min read",
    image: "/blog/modern-ui-hero.avif",
    featured: true,
    content: [
      {
        paragraphs: [
          "A well designed interface is more than just visuals. It improves user experience, builds trust, and helps users complete tasks smoothly. Modern trends focus on reducing clutter, using smart layouts, and creating meaningful interactions that enhance usability and user satisfaction effectively.",
        ],
        image: "/blog/studio-display.avif",
      },
      {
        heading: "AI In UI Design",
        paragraphs: [
          "AI improves UI design by creating personalized experiences, predicting user actions, and automating design tasks, helping designers build faster, smarter, and more user friendly digital interfaces across modern platforms.",
        ],
        image: "/blog/ai-ui-design.avif",
      },
      {
        heading: "Voice And Gesture Interfaces",
        paragraphs: [
          "Voice and gesture controls are reshaping how people interact with digital products — making experiences faster, more natural, and accessible across devices.",
        ],
        bullets: [
          "Voice interfaces allow users to control apps using speech, making interaction faster and more natural.",
          "Gesture controls enable touch-free navigation through simple hand movements, improving ease and accessibility.",
          "These interfaces reduce physical effort, helping users interact with devices more comfortably.",
          "Voice commands improve accessibility for users with disabilities, making products more inclusive.",
          "Modern devices support these technologies, making interfaces smarter, faster, and easier for everyday use.",
        ],
        quote:
          "Great design is simple, useful, and easy for everyone to understand quickly.",
        image: "/blog/voice-gesture.avif",
      },
      {
        heading: "Personalized User Experience",
        paragraphs: [
          "Personalization goes beyond showing someone's name on a dashboard. Modern UI adapts layouts, content, and interactions based on behavior, context, and preferences — creating experiences that feel built for each individual user.",
          "When done well, personalization increases engagement, reduces friction, and builds the kind of trust that turns first-time visitors into long-term customers.",
        ],
        image: "/blog/personalized-ux.avif",
      },
    ],
  },
  {
    slug: "core-web-vitals-2026",
    title: "Why Core Web Vitals Still Matter in 2026",
    excerpt:
      "Speed is not a nice-to-have anymore — it is a ranking signal, a conversion lever, and a brand impression. Here is how we approach performance from day one.",
    category: "Performance",
    author: "STACKREL Team",
    publishedAt: "2026-07-28",
    readTime: "6 min read",
    image: "/blog/web-performance.avif",
    content: [
      {
        paragraphs: [
          "Every year someone declares that web performance has been solved. And every year, client sites still ship with bloated bundles, unoptimized images, and third-party scripts that destroy the user experience before the hero even loads.",
          "At STACKREL, performance is not a post-launch audit — it is a design constraint. We set budgets before the first component is built, and we treat every millisecond as part of the product.",
        ],
      },
      {
        heading: "The metrics that actually move the needle",
        paragraphs: [
          "LCP, INP, and CLS remain the foundation. But in 2026, the teams winning are the ones who go further: edge caching, font subsetting, route-level code splitting, and image pipelines that serve AVIF/WebP with proper sizing.",
          "We aim for sub-second LCP on marketing pages and keep interaction delays under 50ms on critical flows. That is not vanity — it is measurable revenue impact for ecommerce and SaaS clients.",
        ],
      },
      {
        heading: "How we bake it in",
        paragraphs: [
          "Modern stacks help — Next.js, edge functions, and static generation where it makes sense. But tooling alone does not guarantee speed. We profile early, lazy-load below the fold, and strip anything that does not earn its place on the critical path.",
          "If you are planning a launch, start with a performance budget. Your future users — and your search rankings — will thank you.",
        ],
      },
    ],
  },
  {
    slug: "premium-ui-that-converts",
    title: "How We Build Premium UI That Converts",
    excerpt:
      "Great design is not decoration. It is hierarchy, trust, and clarity — the invisible structure that turns visitors into customers.",
    category: "Design",
    author: "Sarah Mitchell",
    authorRole: "Creative Director",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
    publishedAt: "2026-07-22",
    readTime: "5 min read",
    image: "/blog/ai-ui-design.avif",
    content: [
      {
        paragraphs: [
          "Premium UI is often mistaken for gradients, glass effects, and fancy animations. Those can help — but without intent, they are just noise.",
          "We start every project with a simple question: what should the user do next? Every layout decision flows from that answer.",
        ],
      },
      {
        heading: "Typography and spacing do the heavy lifting",
        paragraphs: [
          "Editorial type scales, generous whitespace, and consistent rhythm create the feeling of quality before a single interaction happens.",
        ],
        bullets: [
          "Serif headlines paired with clean sans-serif body text",
          "Consistent spacing tokens across every breakpoint",
          "Readable line lengths — never more than 75 characters",
          "Purposeful micro-interactions that feel fast, not flashy",
        ],
        quote:
          "Great design is simple, useful, and easy for everyone to understand quickly.",
      },
      {
        heading: "Design systems that scale",
        paragraphs: [
          "Whether we are building a custom site or shipping a template, we document tokens, components, and patterns so your team can extend the work without breaking the visual language.",
          "Premium is consistency at scale — not one beautiful page and five mediocre ones.",
        ],
      },
    ],
  },
  {
    slug: "nextjs-vs-framer",
    title: "Next.js vs Framer: Choosing the Right Stack",
    excerpt:
      "Both can deliver stunning results. The right choice depends on your team, timeline, and how much control you need over performance and integrations.",
    category: "Development",
    author: "STACKREL Team",
    publishedAt: "2026-07-15",
    readTime: "7 min read",
    image: "/blog/studio-display.avif",
    content: [
      {
        paragraphs: [
          "Framer excels at speed-to-market and visual design iteration. Next.js excels at performance, custom logic, and deep integrations. Many clients ask us which one they should choose — the honest answer is: it depends.",
        ],
      },
      {
        heading: "When Framer wins",
        paragraphs: [
          "Marketing sites, launch pages, and brand showcases where design velocity matters most. Framer's visual editor empowers teams to iterate without a developer for every copy change.",
          "Our Framer templates are production-ready starting points — not generic themes — so you can launch in days and customize as you grow.",
        ],
      },
      {
        heading: "When Next.js wins",
        paragraphs: [
          "SaaS dashboards, ecommerce with complex flows, auth, CMS integrations, and anything that needs server-side logic or strict performance budgets.",
          "We often recommend Next.js for products that will evolve into platforms — the upfront investment pays off in flexibility and scale.",
        ],
      },
      {
        heading: "The hybrid path",
        paragraphs: [
          "Some teams launch on Framer for speed, then migrate critical flows to Next.js as the product matures. We help plan that roadmap so you are never locked in unnecessarily.",
        ],
      },
    ],
  },
  {
    slug: "technical-seo-launch-checklist",
    title: "Technical SEO Checklist for New Launches",
    excerpt:
      "A beautiful site that search engines cannot crawl is invisible. Use this checklist before you hit publish.",
    category: "SEO",
    author: "STACKREL Team",
    publishedAt: "2026-07-08",
    readTime: "8 min read",
    image: "/blog/seo-launch.avif",
    content: [
      {
        paragraphs: [
          "Design and development often treat SEO as an afterthought. That is how you end up with missing metadata, broken canonicals, and pages that never index.",
          "We ship every launch with technical SEO built in — not bolted on.",
        ],
      },
      {
        heading: "Before launch",
        paragraphs: [
          "Unique titles and meta descriptions for every indexable page. Open Graph and Twitter cards for social sharing. XML sitemap and robots.txt configured correctly.",
          "Semantic HTML structure — one H1 per page, logical heading hierarchy, alt text on images, and internal links that reflect your site architecture.",
        ],
      },
      {
        heading: "Structured data",
        paragraphs: [
          "JSON-LD for Organization, WebSite, and relevant schema types (Product, Article, FAQ) where applicable. Rich results do not guarantee rankings, but they improve visibility and click-through.",
        ],
      },
      {
        heading: "After launch",
        paragraphs: [
          "Submit the sitemap in Search Console, monitor Core Web Vitals, and track index coverage. Fix crawl errors quickly — especially on new domains where trust is still building.",
        ],
      },
    ],
  },
  {
    slug: "template-to-custom-upgrade",
    title: "From Template to Custom: When to Upgrade",
    excerpt:
      "Templates get you live fast. Custom builds unlock differentiation. Here is how to know when it is time to make the jump.",
    category: "Business",
    author: "STACKREL Team",
    publishedAt: "2026-06-30",
    readTime: "4 min read",
    image: "/blog/voice-gesture.avif",
    content: [
      {
        paragraphs: [
          "Our templates are designed for teams that need premium quality without a six-month timeline. But as your business grows, the limits of a template-based approach become clearer.",
        ],
      },
      {
        heading: "Signs you have outgrown a template",
        paragraphs: [
          "You need custom integrations — CRM, ERP, proprietary APIs — that the template was never built to support. Your brand requires a unique visual language that cannot be achieved through customization alone.",
          "Performance or SEO requirements exceed what the template architecture can deliver without a full rebuild.",
        ],
      },
      {
        heading: "Making the transition smooth",
        paragraphs: [
          "We preserve SEO equity during redesigns, migrate content systematically, and often reuse proven components from your template as a foundation for the custom build.",
          "The goal is not to throw away what worked — it is to evolve beyond what a template can offer.",
        ],
      },
    ],
  },
  {
    slug: "agile-sprints-web-launches",
    title: "Agile Sprints for Faster Web Launches",
    excerpt:
      "Weekly deliverables, transparent progress, and no black-box development — how we ship sites in weeks, not months.",
    category: "Development",
    author: "STACKREL Team",
    publishedAt: "2026-06-18",
    readTime: "5 min read",
    image: "/blog/agile-sprints.avif",
    content: [
      {
        paragraphs: [
          "Traditional agency timelines feel opaque: kickoff, silence, reveal. We work differently — in focused sprints with tangible output every week.",
        ],
      },
      {
        heading: "How a typical sprint works",
        paragraphs: [
          "Week 1: Discovery, wireframes, and technical architecture. Week 2–3: Design system and key page templates. Week 4–5: Development, integrations, and content population. Week 6: QA, performance tuning, and launch.",
          "Timelines flex based on scope, but the rhythm stays the same — you always know what was done and what is next.",
        ],
      },
      {
        heading: "Why clients prefer it",
        paragraphs: [
          "No surprises at the end. Feedback loops are short. Decisions happen while context is fresh. And if priorities shift, we adjust the backlog without derailing the entire project.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.featured);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  return BLOG_POSTS.filter(
    (post) => post.slug !== slug && post.category === current.category
  )
    .concat(BLOG_POSTS.filter((post) => post.slug !== slug))
    .slice(0, limit);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatBlogDateShort(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
