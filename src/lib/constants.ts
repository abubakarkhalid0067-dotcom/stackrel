import {
  Bot,
  Globe,
  Layout,
  Layers,
  Monitor,
  Palette,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "AI", href: "#ai" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type TrustedLogo = {
  name: string;
  src?: string;
};

export const TRUSTED_LOGOS: TrustedLogo[] = [
  { name: "Vercel", src: "/logos/vercel.png" },
  { name: "Stripe", src: "/logos/stripe.png" },
  { name: "Linear", src: "/logos/linear.png" },
  { name: "Notion", src: "/logos/notion.png" },
  { name: "Figma", src: "/logos/figma.png" },
  { name: "Shopify", src: "/logos/shopify.png" },
  { name: "Webflow", src: "/logos/webflow.png" },
  { name: "Framer", src: "/logos/framer.png" },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  tag: string;
  preview: string;
  image?: string;
  /** Only these template slugs appear on the service page */
  templateSlugs: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    description:
      "Conversion-focused corporate sites that establish authority and drive qualified leads.",
    icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/10",
    tag: "Corporate",
    preview: "from-[#0c1222] via-[#111827] to-[#0f172a]",
    image: "/services/business-websites.png",
    templateSlugs: ["royal-estate", "startup-stack", "metrics-dashboard", "apex-saas"],
  },
  {
    slug: "ai-websites",
    title: "AI Websites",
    description:
      "Intelligent web experiences powered by AI chat, personalization, and automation.",
    icon: Bot,
    gradient: "from-violet-500/20 to-purple-500/10",
    tag: "AI Powered",
    preview: "from-[#120a1f] via-[#1a1033] to-[#0d0818]",
    image: "/services/ai-websites.png",
    templateSlugs: ["nova-landing", "startup-stack"],
  },
  {
    slug: "ecommerce-stores",
    title: "Ecommerce Stores",
    description:
      "High-converting online stores with seamless checkout and inventory management.",
    icon: ShoppingCart,
    gradient: "from-emerald-500/20 to-teal-500/10",
    tag: "Commerce",
    preview: "from-[#081510] via-[#0f1f18] to-[#0a1410]",
    image: "/services/ecommerce.png",
    templateSlugs: ["commerce-pro", "launch-kit"],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    description:
      "Scalable SaaS platforms with dashboards, auth, billing, and real-time features.",
    icon: Layers,
    gradient: "from-indigo-500/20 to-blue-500/10",
    tag: "Platform",
    preview: "from-[#0a0f1a] via-[#101828] to-[#0c1324]",
    image: "/services/saas.png",
    templateSlugs: ["nova-landing", "startup-stack"],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    description:
      "High-impact landing pages engineered for campaigns, launches, and growth.",
    icon: Rocket,
    gradient: "from-orange-500/20 to-amber-500/10",
    tag: "Marketing",
    preview: "from-[#1a1008] via-[#241508] to-[#140c06]",
    image: "/services/landing-pages.png",
    templateSlugs: ["nova-landing", "ocha-cafe", "beanro-coffee"],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    description:
      "Custom web apps with complex workflows, APIs, and enterprise-grade architecture.",
    icon: Monitor,
    gradient: "from-rose-500/20 to-pink-500/10",
    tag: "Application",
    preview: "from-[#1a0a10] via-[#200812] to-[#120608]",
    image: "/services/web-applications.png",
    templateSlugs: ["startup-stack", "nova-landing"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Research-driven design systems and interfaces that users love to interact with.",
    icon: Palette,
    gradient: "from-fuchsia-500/20 to-purple-500/10",
    tag: "Design",
    preview: "from-[#180a1c] via-[#1f0e28] to-[#100614]",
    image: "/services/ui-ux-design.png",
    templateSlugs: [],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    description:
      "Ongoing support, updates, security patches, and performance optimization.",
    icon: Wrench,
    gradient: "from-slate-500/20 to-gray-500/10",
    tag: "Support",
    preview: "from-[#111111] via-[#181818] to-[#0d0d0d]",
    image: "/services/website-maintenance.png",
    templateSlugs: [],
  },
];

export type PortfolioProject = {
  title: string;
  category: string;
  type: "live" | "concept";
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  href: string;
  linkLabel: string;
};

export const PORTFOLIO_FILTERS = [
  "All",
  "Live Projects",
  "Concept Demos",
  "Ecommerce",
  "SaaS",
  "AI",
] as const;

export const PORTFOLIO: PortfolioProject[] = [
  {
    title: "Alpha Freight",
    category: "Freight & Logistics",
    type: "live",
    description:
      "A live UK freight brokerage platform connecting shippers with verified carriers. Features AI-powered load matching, real-time shipment tracking, secure payments, and a cinematic hero experience — built for Alpha Freight Solutions.",
    image: "/portfolio/alpha-freight.png",
    stats: [
      { label: "Tech Stack", value: "Next.js" },
      { label: "Markets", value: "UK & EU" },
      { label: "Core Feature", value: "Load Matching" },
    ],
    href: "https://alphafreightuk.com",
    linkLabel: "View Live Site",
  },
  {
    title: "AI Voice & GPT Showcase",
    category: "AI Integration",
    type: "concept",
    description:
      "An interactive demo with multilingual voice AI, animated code generation, and GPT app previews — showing what we can build for your product.",
    image: "/portfolio/ai-gpt-showcase.png",
    stats: [
      { label: "Languages", value: "5" },
      { label: "Features", value: "Voice + Code" },
      { label: "Animation", value: "Framer" },
    ],
    href: "/#ai",
    linkLabel: "Explore Demo",
  },
  {
    title: "SaaS Dashboard",
    category: "SaaS Platform",
    type: "concept",
    description:
      "A concept dashboard layout demonstrating our UI design and component work. Ready to customize into a real product for your startup.",
    image: "/portfolio/saas-dashboard.png",
    stats: [
      { label: "Type", value: "Dashboard" },
      { label: "Design", value: "Premium UI" },
      { label: "Status", value: "Demo Build" },
    ],
    href: "/contact",
    linkLabel: "Start a Project",
  },
  {
    title: "ECOM Storefront",
    category: "Ecommerce",
    type: "concept",
    description:
      "A premium ecommerce experience with curated product grids, lookbook layouts, and conversion-focused checkout flows — built as a launch-ready template for modern brands.",
    image: "/services/ecommerce.png",
    stats: [
      { label: "Platform", value: "Framer" },
      { label: "Focus", value: "Conversion" },
      { label: "Pages", value: "12+" },
    ],
    href: "/templates/commerce-pro",
    linkLabel: "View Project",
  },
  {
    title: "Viper Agency",
    category: "Creative Agency",
    type: "concept",
    description:
      "A portfolio-centric agency template where every project takes center stage — refined typography, cinematic layouts, and a premium feel for creative studios.",
    image: "/products/viper-1.png",
    stats: [
      { label: "Type", value: "Portfolio" },
      { label: "Style", value: "Editorial" },
      { label: "Built with", value: "Framer" },
    ],
    href: "/templates/apex-saas",
    linkLabel: "View Project",
  },
  {
    title: "Pulma Analytics",
    category: "SaaS Dashboard",
    type: "concept",
    description:
      "A data-rich dashboard concept with clean charting, KPI cards, and a dark premium UI — ideal for analytics, fintech, and B2B SaaS products.",
    image: "/products/metrics-1.png",
    stats: [
      { label: "UI", value: "Dashboard" },
      { label: "Theme", value: "Dark" },
      { label: "Components", value: "40+" },
    ],
    href: "/templates/metrics-dashboard",
    linkLabel: "View Project",
  },
];

export type Template = {
  title: string;
  category: string;
  price: number;
  image: string;
  tags: string[];
};

export const TEMPLATE_CATEGORIES = [
  "All",
  "React",
  "Next.js",
  "Framer",
  "Landing Pages",
  "SaaS",
  "Dashboards",
  "Ecommerce",
] as const;

export const TEMPLATES: Template[] = [
  {
    title: "Apex SaaS",
    category: "SaaS",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
    tags: ["Next.js", "Dashboard"],
  },
  {
    title: "Nova Landing",
    category: "Landing Pages",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa7021?w=800&h=600&fit=crop&q=80",
    tags: ["React", "Framer"],
  },
  {
    title: "Commerce Pro",
    category: "Ecommerce",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop&q=80",
    tags: ["Next.js", "Shopify"],
  },
  {
    title: "Metrics Dashboard",
    category: "Dashboards",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    tags: ["React", "Charts"],
  },
  {
    title: "Launch Kit",
    category: "Landing Pages",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&q=80",
    tags: ["Framer", "Animation"],
  },
  {
    title: "Startup Stack",
    category: "SaaS",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80",
    tags: ["Next.js", "Auth"],
  },
];

export const WHY_CHOOSE = [
  {
    title: "Fast Delivery",
    description: "Launch in weeks, not months. Agile sprints with weekly deliverables.",
    icon: Zap,
  },
  {
    title: "SEO Optimized",
    description: "Built-in technical SEO, schema markup, and Core Web Vitals excellence.",
    icon: Search,
  },
  {
    title: "Lightning Performance",
    description: "Sub-second load times with edge caching and optimized assets.",
    icon: Rocket,
  },
  {
    title: "Pixel Perfect",
    description: "Design fidelity down to the last pixel across every breakpoint.",
    icon: Layout,
  },
  {
    title: "Premium UI",
    description: "Interfaces inspired by the world's best product companies.",
    icon: Sparkles,
  },
  {
    title: "Modern Code",
    description: "Clean, typed, tested codebases your team can maintain and scale.",
    icon: Layers,
  },
  {
    title: "Responsive",
    description: "Flawless experiences from mobile to 4K displays.",
    icon: Monitor,
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    description: "Deep dive into your goals, audience, and competitive landscape.",
  },
  {
    step: "02",
    title: "Research",
    description: "User research, market analysis, and technical feasibility study.",
  },
  {
    step: "03",
    title: "Design",
    description: "Wireframes, prototypes, and pixel-perfect UI design systems.",
  },
  {
    step: "04",
    title: "Development",
    description: "Clean, performant code with modern frameworks and best practices.",
  },
  {
    step: "05",
    title: "Testing",
    description: "Cross-browser QA, accessibility audits, and performance testing.",
  },
  {
    step: "06",
    title: "Launch",
    description: "Deployment, monitoring, and post-launch optimization support.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO, Nexus Finance",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
    quote:
      "STACKREL transformed our online presence. Our conversion rate tripled within the first month of launch.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "Founder, Lumière Studio",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
    quote:
      "The attention to detail is unmatched. They delivered a site that feels as premium as our brand.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "CTO, Pulse Health",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
    quote:
      "Professional, fast, and technically excellent. Our platform handles 120K users flawlessly.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "VP Marketing, CloudScale",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
    quote:
      "Best agency we've worked with. They understand both design and engineering at the highest level.",
    rating: 5,
  },
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 4999,
    description: "Perfect for small businesses and startups launching their first website.",
    features: [
      "5-page custom website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "2 rounds of revisions",
      "30-day support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: 12999,
    description: "For growing businesses that need advanced features and optimization.",
    features: [
      "Up to 15 custom pages",
      "CMS integration",
      "Advanced SEO & analytics",
      "Custom animations",
      "Ecommerce ready",
      "Performance optimization",
      "90-day support",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom solutions for large organizations with complex requirements.",
    features: [
      "Unlimited pages",
      "Custom web application",
      "Dedicated project manager",
      "Priority support 24/7",
      "SLA guarantee",
      "Security audit",
      "Ongoing maintenance",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects launch within 4–8 weeks depending on scope. Starter sites can go live in 3 weeks, while complex SaaS platforms may take 12–16 weeks. We provide a detailed timeline during discovery.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We build with React, Next.js, TypeScript, and modern headless CMS solutions. For ecommerce we use Shopify or custom Next.js stores. Every stack is chosen for performance, scalability, and maintainability.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes. We offer monthly maintenance plans covering updates, security patches, performance monitoring, content changes, and priority support. Plans start at $499/month.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We specialize in redesigns that preserve SEO equity while dramatically improving UX, performance, and conversion rates. We audit your current site before proposing a strategy.",
  },
  {
    question: "What's included in the price?",
    answer:
      "All plans include design, development, responsive testing, basic SEO, deployment, and post-launch support. Hosting, domain, and third-party subscriptions are separate unless specified.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "We work with clients worldwide. Our team operates across time zones with async communication tools and scheduled video calls to keep projects moving smoothly.",
  },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Templates", href: "/templates" },
    { label: "Documentation", href: "#" },
    { label: "Case Studies", href: "/portfolio" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
] as const;
