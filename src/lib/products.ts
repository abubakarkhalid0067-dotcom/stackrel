export type Product = {
  slug: string;
  title: string;
  category: string;
  price: number;
  image: string;
  tags: string[];
  shortDescription: string;
  description: string;
  video?: string;
  /** Detail page hero — homepage card uses `image` when set */
  detailImage?: string;
  gallery: string[];
  features: string[];
  includes: string[];
  specs: { label: string; value: string }[];
  /** Who is this template for */
  audience?: string;
  /** Highlight blocks e.g. "Why Verity?" */
  highlights?: { title: string; description: string }[];
  highlightsTitle?: string;
  /** Target industries / use cases */
  builtFor?: string[];
  /** Technical detail bullets */
  detailPoints?: string[];
  /** Closing tagline */
  closingLine?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "apex-saas",
    title: "Viper",
    category: "Portfolio",
    price: 89,
    image: "/products/viper-1.png",
    tags: ["Portfolio", "Agency", "Creative"],
    shortDescription:
      "Viper is a remarkable creative agency & portfolio template crafted to enhance your agency's or portfolio presentation — clean, sophisticated, and built to let your work speak for itself.",
    description:
      "Whether you're building your first agency or portfolio or looking to refresh your existing one, Viper offers the perfect balance of creativity and elegance. Its portfolio-centric layout ensures that every project stands out, free from unnecessary clutter. This template is designed for professionals who value the importance of a well-curated portfolio, helping to make a lasting impression on clients and employers.",
    video: "/products/viper-demo.mp4",
    gallery: [
      "/products/viper-1.png",
      "/products/viper-2.png",
      "/products/viper-3.png",
    ],
    audience:
      "Viper is an ideal portfolio solution for creative designers, freelancers, creative agencies, digital agencies, personal portfolios, photographers, or anyone in the creative industry who wants to showcase their work in a clean and sophisticated way.",
    highlightsTitle: "Why Viper?",
    highlights: [
      {
        title: "Creative by design",
        description:
          "The creative design keeps the focus entirely on your look, allowing the work to speak for itself — no clutter, no distractions.",
      },
      {
        title: "Portfolio-centric layout",
        description:
          "Every project in your portfolio stands out with a layout built specifically to showcase creative work at its best.",
      },
      {
        title: "Creativity meets elegance",
        description:
          "Whether you're launching your first portfolio or refreshing an existing one, Viper balances bold creativity with refined sophistication.",
      },
      {
        title: "Built to impress",
        description:
          "Designed for professionals who value a well-curated portfolio — making a lasting impression on clients and employers.",
      },
      {
        title: "Commands attention",
        description:
          "A powerful and stylish way to present your agency or portfolio that takes your creative presence to the next level.",
      },
    ],
    features: [
      "Portfolio-centric project showcase layout",
      "Clean & sophisticated creative design",
      "Fully responsive — desktop, tablet, and mobile",
      "Agency & personal portfolio ready",
      "Smooth animations and premium typography",
      "SEO-friendly structure",
    ],
    includes: [
      "Full portfolio & agency page templates",
      "Project showcase & case study layouts",
      "About, services, and contact sections",
      "Figma design file",
      "Documentation & setup guide",
      "Commercial license",
    ],
    builtFor: [
      "Creative designers",
      "Freelancers",
      "Creative agencies",
      "Digital agencies",
      "Photographers",
      "Personal portfolios",
    ],
    detailPoints: [
      "Portfolio-centric layout — work first, always",
      "Clean & sophisticated design system",
      "Fully responsive across all devices",
      "Smooth animations & premium typography",
      "SEO-friendly & fast to customize",
    ],
    closingLine:
      "For anyone serious about their portfolio, Viper provides everything needed to create a striking agency or portfolio that commands attention.",
    specs: [
      { label: "Type", value: "Portfolio" },
      { label: "Pages", value: "12+" },
      { label: "Layout", value: "Project-first" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "nova-landing",
    title: "Verity",
    category: "Landing Pages",
    price: 49,
    image: "/portfolio/ai-gpt-showcase.png",
    tags: ["Framer", "Dark Theme", "AI / SaaS"],
    shortDescription:
      "Launch a polished landing page for your AI automation or SaaS product in minutes — dark, cinematic design with interactive product dashboards, a blog CMS, and sharp copy included.",
    description:
      "Verity is a cinematic Framer landing page built for AI and SaaS products that need to look premium from day one. Deep black palette, bold typography, interactive dashboard previews, and conversion-focused sections — everything you need to validate, launch, or raise your first round without starting from a blank canvas.",
    video: "/products/verity-demo.mp4",
    gallery: [
      "/portfolio/ai-gpt-showcase.png",
      "/products/verity-2.png",
      "/products/verity-3.png",
    ],
    audience:
      "Verity is built for AI startup founders, SaaS teams, indie makers, and solo developers who need a landing page that looks polished without looking generic — whether you're validating an idea, launching, or raising your first round.",
    highlightsTitle: "Why Verity?",
    highlights: [
      {
        title: "Cinematic by design",
        description:
          "Atmospheric visuals, a deep black palette, and bold typography that don't feel like every other dark SaaS template.",
      },
      {
        title: "Shows the product, not just the pitch",
        description:
          "Use-case tabs reveal four real dashboards: agent builder, lead routing, ticket triage, and analytics.",
      },
      {
        title: "Conversion-focused",
        description:
          "Every section moves visitors from problem to solution to action.",
      },
      {
        title: "Sharp copy included",
        description:
          "Placeholder copy that actually makes sense, plus a full blog.",
      },
      {
        title: "Fast to customize",
        description:
          "Clearly structured, labeled, and annotated. No guesswork.",
      },
    ],
    features: [
      "Fully responsive — desktop, tablet, and mobile",
      "No coding required — fully editable in Framer",
      "Blog CMS, pricing toggle, FAQ accordion, and comparison table",
      "Smooth animations, dark theme, and SEO-friendly structure",
    ],
    includes: [
      "Home page — hero, social proof bar, feature cards with product UI, use-case tabs (4 real dashboard screens), how-it-works, benefits grid, comparison table, testimonials, pricing toggle, integrations ticker, FAQ, and final CTA",
      "Contact page, Privacy Policy, Terms of Service, and custom 404",
      "Full blog CMS with sharp placeholder copy",
      "Framer project file — clearly structured and annotated",
      "Commercial license",
    ],
    builtFor: [
      "AI agents & automation platforms",
      "Workflow & ops tools",
      "Developer tools",
      "Analytics products",
      "Any SaaS with ambition",
    ],
    detailPoints: [
      "Fully responsive (desktop, tablet, mobile)",
      "No coding required — fully editable in Framer",
      "Blog CMS, pricing toggle, FAQ accordion, comparison table",
      "Smooth animations, dark theme, SEO-friendly",
    ],
    closingLine:
      "Verity is for builders who know that first impressions close deals — and want a landing page that works as hard as they do.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Sections", value: "12+" },
      { label: "Theme", value: "Dark" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "commerce-pro",
    title: "ECOM",
    category: "Ecommerce",
    price: 99,
    image: "/services/ecommerce.png",
    tags: ["Framer", "Fashion", "Ecommerce"],
    shortDescription:
      "ECOM is a premium ecommerce template designed for modern fashion brands, clothing stores, apparel labels, and lifestyle businesses looking to create a seamless online shopping experience.",
    description:
      "Built with a clean visual system and conversion-focused layouts, ECOM combines elegant product presentation with a smooth customer journey. Every page is carefully designed to help brands showcase collections, highlight products, build trust, and increase sales while maintaining a refined & contemporary aesthetic.",
    video: "/products/ecom-demo.mp4",
    detailImage: "/products/ecom-1.png",
    gallery: [
      "/products/ecom-1.png",
      "/products/ecom-2.png",
      "/products/ecom-3.png",
      "/products/ecom-4.png",
    ],
    audience:
      "Whether you're launching a fashion startup, managing an established clothing brand, or creating a store for a client, ECOM provides a complete ecommerce foundation that is easy to customize and scale.",
    highlightsTitle: "Why Choose ECOM?",
    highlights: [
      {
        title: "Built for modern fashion",
        description:
          "Designed specifically for fashion ecommerce — professional shopping experience from discovery to purchase.",
      },
      {
        title: "Flexible CMS structure",
        description:
          "CMS-powered products, collections, categories, and blogs — easy content management without the complexity.",
      },
      {
        title: "Showcase products beautifully",
        description:
          "Clean layouts focused on usability and conversions, with elegant product presentation at every touchpoint.",
      },
      {
        title: "Easy to customize",
        description:
          "Clean component structure and clearly organized pages — customize fast without starting from scratch.",
      },
      {
        title: "Performance & SEO-ready",
        description:
          "Fast loading performance, SEO-friendly page structure, and built with accessibility and responsiveness in mind.",
      },
    ],
    features: [
      "Premium fashion ecommerce template design",
      "Fully responsive across desktop, tablet, and mobile",
      "CMS-powered products, collections, categories, & blogs",
      "Wishlist experience included",
      "Integrated search experience",
      "Newsletter subscription sections",
      "Testimonials & social proof sections",
      "Smooth animations & modern interactions",
      "Clean component structure & easy customization",
      "Optimized for performance & SEO",
    ],
    includes: [
      "Home, Shop, Collection, Category & Product pages",
      "Journal, About, Contact & Wishlist pages",
      "Search page & Legal pages",
      "Custom 404 page",
      "Framer project file — CMS-ready",
      "Commercial license",
    ],
    builtFor: [
      "Fashion brands",
      "Clothing stores",
      "Streetwear labels",
      "Kids fashion brands",
      "Lifestyle brands",
      "Apparel startups",
      "Modern ecommerce stores",
      "Boutique fashion stores",
    ],
    detailPoints: [
      "Fully responsive — desktop, tablet, and mobile",
      "CMS-powered products, collections & blogs",
      "Wishlist & integrated search experience",
      "Smooth animations & modern interactions",
      "Optimized for performance, SEO & accessibility",
    ],
    closingLine:
      "ECOM gives fashion brands everything they need to launch a refined, conversion-focused store that looks as good as the products it sells.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Pages", value: "13+" },
      { label: "CMS", value: "Included" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "metrics-dashboard",
    title: "Pulma",
    category: "Portfolio",
    price: 79,
    image: "/products/metrics-1.png",
    tags: ["Portfolio", "Agency", "Structured"],
    shortDescription:
      "Pulma is built to present your work with focus — reducing noise, guiding attention, and creating a clear narrative across every section.",
    description:
      "From typography to layout, each element is considered to support both visual balance and usability. Designed with a structured approach, Pulma helps teams communicate their process, showcase their work, and build trust with intention.",
    video: "/products/metrics-demo.mp4",
    gallery: [
      "/products/metrics-1.png",
      "/products/metrics-2.png",
      "/products/metrics-3.png",
    ],
    audience:
      "Pulma is for creative teams, agencies, and studios who want to present their work with clarity and purpose — without distraction, without clutter, and with a narrative that builds trust from the first scroll.",
    highlightsTitle: "Why Pulma?",
    highlights: [
      {
        title: "Focused presentation",
        description:
          "Built to reduce noise and guide attention — so your work is always the hero, never lost in unnecessary elements.",
      },
      {
        title: "Clear narrative",
        description:
          "Every section is designed to tell a story, creating a cohesive journey from introduction to project showcase to call-to-action.",
      },
      {
        title: "Structured approach",
        description:
          "Helps teams communicate their process, showcase their work, and build trust with intention — not guesswork.",
      },
      {
        title: "Visual balance & usability",
        description:
          "From typography to layout, each element is carefully considered to support both aesthetic refinement and practical usability.",
      },
      {
        title: "Trust by design",
        description:
          "A template that doesn't just look professional — it feels considered, credible, and built for teams who take presentation seriously.",
      },
    ],
    features: [
      "Focus-driven layout — work first, always",
      "Clear narrative flow across every section",
      "Refined typography & visual balance",
      "Process & project showcase sections",
      "Fully responsive — desktop, tablet, and mobile",
      "SEO-friendly structure",
    ],
    includes: [
      "Full portfolio & agency page templates",
      "Process, work, and about sections",
      "Project showcase & case study layouts",
      "Contact & trust-building sections",
      "Documentation & setup guide",
      "Commercial license",
    ],
    builtFor: [
      "Creative agencies",
      "Design studios",
      "Product teams",
      "Freelancers & consultants",
      "Brand & digital studios",
    ],
    detailPoints: [
      "Focus-driven layout with minimal noise",
      "Structured narrative across all sections",
      "Typography & layout built for balance",
      "Process showcase & trust-building sections",
      "Fully responsive & SEO-friendly",
    ],
    closingLine:
      "Pulma is for teams who know that how you present your work is just as important as the work itself.",
    specs: [
      { label: "Type", value: "Portfolio" },
      { label: "Sections", value: "10+" },
      { label: "Focus", value: "Narrative" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "launch-kit",
    title: "Velaa",
    category: "Ecommerce",
    price: 39,
    image: "/products/velaa-cover.png",
    tags: ["Framer", "Fashion", "Pastel"],
    shortDescription:
      "Velaa is a beautifully crafted Framer template designed for modern fashion, clothing, and lifestyle brands — soft pastel aesthetic, clean layouts, and an elegant online store foundation.",
    description:
      "Built with creators and small brands in mind, Velaa features fully responsive pages, dynamic CMS collections, and pre-designed shopping flows that streamline your customer journey from browsing to checkout. Velaa is 100% customizable in Framer — change colors, fonts, images, and layouts easily to match your brand identity.",
    video: "/products/velaa-demo.mp4",
    detailImage: "/products/velaa-1.png",
    gallery: [
      "/products/velaa-1.png",
      "/products/velaa-2.png",
    ],
    audience:
      "Whether you're launching a new brand or refreshing your current online presence, Velaa gives you the tools and flexibility to do it beautifully — with no coding required. Perfect for slow fashion, boutique labels, and minimalist lifestyle brands.",
    highlightsTitle: "Why Velaa?",
    highlights: [
      {
        title: "Soft pastel aesthetic",
        description:
          "A calm and sophisticated vibe with clean layouts — perfect for fashion, clothing, and lifestyle brands that value elegance over noise.",
      },
      {
        title: "Complete shopping flows",
        description:
          "Pre-designed flows from browsing to checkout, with product listings, individual product pages, lookbooks, and more.",
      },
      {
        title: "CMS-powered & flexible",
        description:
          "Dynamic CMS collections for easy product and content updates — manage your store without touching code.",
      },
      {
        title: "100% customizable",
        description:
          "Change colors, fonts, images, and layouts in Framer to match your brand identity in minutes.",
      },
      {
        title: "No coding required",
        description:
          "Built for creators and small brands who want a beautiful store without the technical overhead.",
      },
    ],
    features: [
      "Clean, mobile-first design",
      "CMS integration for easy product & content updates",
      "Smooth hover and scroll animations",
      "SEO-optimized structure",
      "Social media links and newsletter signup",
      "Fully responsive across all devices",
    ],
    includes: [
      "Product listing & individual product pages",
      "Lookbooks, shipping info & FAQ sections",
      "Contact forms & newsletter signup",
      "Dynamic CMS collections for products & content",
      "Framer project file — fully editable",
      "Commercial license",
    ],
    builtFor: [
      "Fashion brands",
      "Clothing stores",
      "Lifestyle brands",
      "Slow fashion labels",
      "Boutique stores",
      "Minimalist lifestyle brands",
      "Small brand creators",
    ],
    detailPoints: [
      "Soft pastel aesthetic with clean layouts",
      "CMS integration for products & content",
      "Smooth hover & scroll animations",
      "SEO-optimized page structure",
      "100% customizable in Framer — no code",
    ],
    closingLine:
      "Velaa creates a calm, sophisticated shopping experience that lets your brand shine — beautifully, effortlessly, and without code.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Theme", value: "Pastel" },
      { label: "CMS", value: "Included" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "startup-stack",
    title: "Spartan",
    category: "Agency",
    price: 69,
    image: "/products/spartan-cover.png",
    tags: ["Framer", "AI Agency", "SaaS"],
    shortDescription:
      "A bold Framer template for modern AI agencies — sharp visuals, clear layouts, smooth animations, and conversion-focused sections to attract better clients.",
    description:
      "Spartan is built for AI agencies, automation studios, consultants, SaaS teams, and tech companies that want a strong online presence without designing everything from scratch. It combines sharp visuals, clear layouts, smooth animations, and conversion-focused sections to help you explain your services, build trust, and attract better clients.",
    video: "/products/spartan-demo.mp4",
    detailImage: "/products/spartan-1.png",
    gallery: [
      "/products/spartan-1.png",
      "/products/spartan-2.png",
    ],
    audience:
      "Spartan gives you a complete website foundation that is ready to customize in Framer. Update the copy, colors, fonts, images, buttons, sections, and pages to match your brand — no coding required.",
    highlightsTitle: "Everything Your Agency Needs",
    highlights: [
      {
        title: "Service sections",
        description:
          "Clearly explain what you offer and how your solutions help clients — turn complex services into clear messages.",
      },
      {
        title: "Case studies",
        description:
          "Show your work, results, and process in a way that builds confidence with potential clients.",
      },
      {
        title: "Testimonials",
        description:
          "Add client feedback to make your agency feel more trusted and established from day one.",
      },
      {
        title: "Pricing & FAQs",
        description:
          "Present your offers, answer common questions, and remove doubts before prospects reach out.",
      },
      {
        title: "Contact forms",
        description:
          "Make it easy for visitors to book a call, request a quote, or start a project.",
      },
    ],
    features: [
      "Sharp visuals with clear, conversion-focused layouts",
      "Smooth animations & modern interactions",
      "Fully customizable in Framer — no coding required",
      "Reusable components for a clean, consistent website",
      "Responsive on desktop, tablet, and mobile",
      "SEO-friendly page structure",
    ],
    includes: [
      "Service sections & case study layouts",
      "Testimonials, pricing & FAQ sections",
      "Contact forms — book a call, request a quote",
      "Fully editable Framer project file",
      "Reusable component library",
      "Commercial license",
    ],
    builtFor: [
      "AI automation agencies",
      "AI agents & automation studios",
      "Machine learning consultancies",
      "Custom software teams",
      "Data solution providers",
      "AI consulting firms",
      "SaaS product teams",
      "Workflow system builders",
    ],
    detailPoints: [
      "Launch without the long design process",
      "Update colors, fonts, images, copy & sections in Framer",
      "Reusable components — clean & consistent",
      "Polished on desktop, tablet & mobile",
      "No coding required",
    ],
    closingLine:
      "Spartan helps ambitious AI teams launch a strong online presence fast — sharp, trusted, and built to convert.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Type", value: "AI Agency" },
      { label: "Sections", value: "10+" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "royal-estate",
    title: "ROYAL",
    category: "Agency",
    price: 89,
    image: "/products/royal-cover.png",
    tags: ["Framer", "Real Estate", "Luxury"],
    shortDescription:
      "ROYAL is a premium Framer template designed to elevate luxury real estate agencies, upscale brokers, and bespoke property consultants with an elegant, modern, and fully responsive layout.",
    description:
      "Whether you're marketing high-end homes, exclusive listings, or investment properties, ROYAL provides a sophisticated online presence that attracts discerning buyers and drives conversions. Built for ease and flexibility, it lets you customize every section to reflect your brand and showcase properties at their best — with immersive galleries, smooth animations, and persuasive client testimonials crafted to build trust and convert visitors into inquiries.",
    video: "/products/royal-demo.mp4",
    detailImage: "/products/royal-1.png",
    gallery: [
      "/products/royal-1.png",
      "/products/royal-2.png",
      "/products/royal-3.png",
      "/products/royal-4.png",
    ],
    audience:
      "ROYAL is built for luxury real estate agencies, upscale brokers, and bespoke property consultants who need a refined website that matches the caliber of their listings — from high-end homes and exclusive properties to investment portfolios.",
    highlightsTitle: "Effortless Customization & High Engagement",
    highlights: [
      {
        title: "Elegant, conversion-focused design",
        description:
          "A sophisticated layout that positions your brand as a trusted name in the high-end property market.",
      },
      {
        title: "Immersive property galleries",
        description:
          "Interactive galleries and engaging UI elements that showcase listings at their best and keep buyers exploring.",
      },
      {
        title: "Persuasive social proof",
        description:
          "Client testimonials and trust-building sections crafted to turn visitors into qualified inquiries.",
      },
      {
        title: "Smooth premium animations",
        description:
          "High-quality motion and interactions that deliver a luxury feel without sacrificing performance.",
      },
      {
        title: "Easy to edit in Framer",
        description:
          "Customize colors, fonts, images, copy, and sections to match your brand — no code required.",
      },
    ],
    features: [
      "Elegant, conversion-focused design",
      "Fully responsive and mobile-friendly",
      "High-quality animations for a premium feel",
      "Interactive galleries and engaging UI elements",
      "SEO and speed optimized for maximum reach",
      "Easy-to-edit Framer template — no code needed",
    ],
    includes: [
      "Home page — hero, featured listings, property galleries, testimonials, and inquiry CTAs",
      "Property showcase & listing detail layouts",
      "About, services, and contact sections",
      "Fully editable Framer project file",
      "Commercial license",
    ],
    builtFor: [
      "Luxury real estate agencies",
      "Upscale property brokers",
      "Bespoke property consultants",
      "High-end home marketers",
      "Exclusive listing specialists",
      "Investment property advisors",
    ],
    detailPoints: [
      "Fully optimized for SEO and fast performance",
      "Flawless on mobile, tablet, and desktop",
      "Immersive image galleries & smooth animations",
      "Customize every section to reflect your brand",
      "No coding required — edit entirely in Framer",
    ],
    closingLine:
      "Launch your luxury real estate website effortlessly with ROYAL and position your brand as a trusted name in the high-end property market.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Type", value: "Real Estate" },
      { label: "Sections", value: "10+" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "ocha-cafe",
    title: "Ocha",
    category: "Landing Pages",
    price: 69,
    image: "/products/ocha-cover.png",
    tags: ["Framer", "Café", "Food & Beverage"],
    shortDescription:
      "Ocha is a bold and expressive Framer template designed for modern matcha cafés, specialty coffee shops, tea houses, bakeries, and creative food & beverage brands.",
    description:
      "Built with oversized typography, vibrant colors, immersive imagery, and playful interactions, Ocha transforms a traditional café website into a memorable digital experience. A long-form homepage brings your brand, menu, products, people, and community together — with interactive menus, team spotlights, merchandise showcases, and CMS-powered articles.",
    video: "/products/ocha-demo.mp4",
    detailImage: "/products/ocha-1.png",
    gallery: [
      "/products/ocha-1.png",
      "/products/ocha-2.png",
      "/products/ocha-3.png",
    ],
    audience:
      "Ocha is made for cafés that want more than a basic website — matcha cafés, specialty coffee shops, tea houses, bakeries, restaurants, beverage brands, and creative hospitality businesses that value bold storytelling and community.",
    highlightsTitle: "Why Ocha?",
    highlights: [
      {
        title: "Immersive single-page experience",
        description:
          "A long-form homepage that brings your brand, menu, products, people, and community together in one memorable flow.",
      },
      {
        title: "Interactive menu & specials",
        description:
          "Showcase signature drinks, seasonal creations, and café favorites through bold, image-driven layouts.",
      },
      {
        title: "Playful interactions",
        description:
          "Smooth animations, expressive typography, and engaging visual experiences that bring your website to life.",
      },
      {
        title: "Team, reviews & community",
        description:
          "Introduce your team, share customer stories, and promote workshops, pop-ups, and upcoming events.",
      },
      {
        title: "Merchandise & CMS articles",
        description:
          "Promote apparel, packaged products, and branded merchandise — plus publish stories, recipes, and updates with Framer CMS.",
      },
    ],
    features: [
      "Immersive single-page homepage experience",
      "Interactive menu & specials with image-driven layouts",
      "Playful animations & expressive typography",
      "Team, reviews, events & community sections",
      "Merchandise showcase for apparel & packaged products",
      "CMS-powered articles for stories, recipes & updates",
      "Fully responsive — desktop, tablet & mobile",
      "Easy to customize with organized layers & reusable components",
    ],
    includes: [
      "Home — brand story, specials, menu, reviews, team, merchandise, events, location, articles, FAQ & more",
      "Ideas / Articles — CMS-powered hub for stories, recipes, guides & updates",
      "Article Detail — flexible CMS layout for long-form content",
      "Fully editable Framer project file",
      "Commercial license",
    ],
    builtFor: [
      "Matcha cafés",
      "Specialty coffee shops",
      "Tea houses",
      "Bakeries",
      "Restaurants",
      "Beverage brands",
      "Creative hospitality businesses",
    ],
    detailPoints: [
      "Oversized typography & vibrant, immersive imagery",
      "Interactive menu with seasonal specials showcase",
      "Team spotlights, reviews & event promotion",
      "Merchandise section for branded products",
      "CMS-powered articles — no coding required",
    ],
    closingLine:
      "Bold typography, vibrant visuals, interactive layouts, and community-focused storytelling come together in Ocha — for cafés that want a memorable digital experience.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Type", value: "Café / F&B" },
      { label: "Pages", value: "3+" },
      { label: "License", value: "Commercial" },
    ],
  },
  {
    slug: "beanro-coffee",
    title: "Beanro",
    category: "Landing Pages",
    price: 59,
    image: "/products/beanro-cover.png",
    tags: ["Framer", "Coffee", "Café"],
    shortDescription:
      "Launch your coffee brand with a modern online presence — Beanro is a thoughtfully crafted Framer template for coffee shops, cafés, roasteries, and specialty coffee brands.",
    description:
      "Beanro helps you showcase your menu, story, locations, and blog in a visually engaging way. With a modern layout, smooth interactions, and fully responsive design, it offers a simple no-code editing experience in Framer — whether you're building a cozy local café website or a stylish specialty coffee brand.",
    video: "/products/beanro-demo.mp4",
    detailImage: "/products/beanro-1.png",
    gallery: [
      "/products/beanro-1.png",
      "/products/beanro-2.png",
      "/products/beanro-3.png",
    ],
    audience:
      "Beanro is made for coffee shops, cafés, roasteries, and specialty coffee brands that want a clean, professional website — from cozy local spots to stylish modern roasteries looking for a warm and premium browsing experience.",
    highlightsTitle: "Designed for Modern Coffee Brands",
    highlights: [
      {
        title: "Warm & premium experience",
        description:
          "Every section is carefully designed to reflect the atmosphere of modern cafés and help your products, story, and brand identity stand out.",
      },
      {
        title: "Complete page set",
        description:
          "Beautiful pages for home, menu, blog, reservations, and more — everything a coffee brand needs to launch online.",
      },
      {
        title: "Built-in CMS support",
        description:
          "Manage menu items, blog posts, and content easily without touching code.",
      },
      {
        title: "Smooth & responsive",
        description:
          "Clean modern layouts with smooth animations, optimized for desktop, tablet, and mobile.",
      },
      {
        title: "Easy customization",
        description:
          "Update colors, typography, images, and content in a few clicks using Framer's visual editor — no coding required.",
      },
    ],
    features: [
      "Beautiful pages for home, menu, blog, reservations & more",
      "Built-in CMS support for easy content management",
      "Fully responsive across desktop, tablet & mobile",
      "Smooth animations and clean modern layouts",
      "SEO-friendly and optimized for fast loading speed",
      "No-code editing — customize entirely in Framer",
    ],
    includes: [
      "Home, menu, blog & reservations pages",
      "Location and story sections",
      "CMS-ready content management",
      "Fully editable Framer project file",
      "Commercial license",
    ],
    builtFor: [
      "Coffee shops",
      "Local cafés",
      "Specialty coffee roasteries",
      "Specialty coffee brands",
      "Cozy neighborhood cafés",
      "Modern coffee spaces",
    ],
    detailPoints: [
      "Modern layout with smooth interactions",
      "Showcase menu, story, locations & blog",
      "Built-in CMS — manage content easily",
      "SEO-friendly & fast loading",
      "Beginner-friendly Framer customization",
    ],
    closingLine:
      "Beanro gives coffee brands the perfect starting point — clean, professional, and ready to customize in minutes.",
    specs: [
      { label: "Platform", value: "Framer" },
      { label: "Type", value: "Coffee / Café" },
      { label: "Pages", value: "5+" },
      { label: "License", value: "Commercial" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
    .concat(PRODUCTS.filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}

/** Lightweight list for homepage templates grid */
export const TEMPLATE_LIST = PRODUCTS.map(
  ({ slug, title, category, price, image, tags }) => ({
    slug,
    title,
    category,
    price,
    image,
    tags,
  })
);
