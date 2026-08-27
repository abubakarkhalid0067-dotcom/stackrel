export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const LEGAL_CONTACT_EMAIL = "hello@stackrel.com";
export const LEGAL_COMPANY_NAME = "STACKREL";
export const LEGAL_WEBSITE = "https://stackrel.com";

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "How STACKREL collects, uses, and protects your personal information when you use our website, services, and digital products.",
  lastUpdated: "July 31, 2026",
  sections: [
    {
      id: "introduction",
      heading: "1. Introduction",
      paragraphs: [
        `${LEGAL_COMPANY_NAME} ("we", "us", or "our") operates ${LEGAL_WEBSITE} and provides premium web development services, website templates, and related digital products.`,
        "This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have. By using our website or services, you agree to the practices described here.",
      ],
    },
    {
      id: "information-we-collect",
      heading: "2. Information We Collect",
      paragraphs: [
        "We collect information you provide directly, information generated when you use our site, and limited technical data from your device.",
      ],
      list: [
        "Contact details such as name, email address, phone number, and company name when you submit forms, request quotes, or create an account.",
        "Project and billing information related to custom development work, template purchases, or checkout flows.",
        "Account credentials and profile information if you register for an account or client dashboard.",
        "Communications you send us, including support messages, career applications, and newsletter subscriptions.",
        "Usage data such as pages visited, referral source, browser type, device information, and approximate location derived from IP address.",
        "Cookies and similar technologies as described in our Cookie Policy.",
      ],
    },
    {
      id: "how-we-use",
      heading: "3. How We Use Your Information",
      list: [
        "To respond to inquiries, provide quotes, and deliver custom web development services.",
        "To process template purchases, manage carts, accounts, and customer support.",
        "To send service-related updates, onboarding information, and transactional emails.",
        "To improve our website, templates, and user experience through analytics and feedback.",
        "To send marketing communications where you have opted in, such as our newsletter.",
        "To protect our platform, prevent fraud, and comply with legal obligations.",
      ],
    },
    {
      id: "legal-bases",
      heading: "4. Legal Bases for Processing",
      paragraphs: [
        "Where applicable under data protection laws, we process personal data based on your consent, the performance of a contract, our legitimate interests in operating and improving our business, or compliance with legal requirements.",
      ],
    },
    {
      id: "sharing",
      heading: "5. How We Share Information",
      paragraphs: [
        "We do not sell your personal information. We may share data with trusted service providers who help us operate our business, such as hosting, authentication, payment processing, email delivery, and analytics partners. These providers may only use your data to perform services on our behalf.",
        "We may also disclose information if required by law, to protect our rights, or in connection with a business transfer such as a merger or acquisition.",
      ],
    },
    {
      id: "retention",
      heading: "6. Data Retention",
      paragraphs: [
        "We retain personal information for as long as needed to provide services, fulfill contractual obligations, resolve disputes, enforce agreements, and comply with legal requirements. Retention periods vary depending on the type of data and the purpose for which it was collected.",
      ],
    },
    {
      id: "security",
      heading: "7. Security",
      paragraphs: [
        "We implement reasonable administrative, technical, and organizational measures designed to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      heading: "8. Your Rights and Choices",
      list: [
        "Request access to, correction of, or deletion of your personal information, where applicable.",
        "Opt out of marketing emails by using the unsubscribe link in any promotional message.",
        "Manage cookie preferences through your browser settings and as described in our Cookie Policy.",
        "Disable non-essential tracking where required by applicable law.",
      ],
      paragraphs: [
        `To exercise privacy rights, contact us at ${LEGAL_CONTACT_EMAIL}. We may need to verify your identity before responding.`,
      ],
    },
    {
      id: "international",
      heading: "9. International Users",
      paragraphs: [
        "STACKREL works with clients worldwide. If you access our services from outside the United States, your information may be processed in the United States or other countries where we or our service providers operate.",
      ],
    },
    {
      id: "children",
      heading: "10. Children's Privacy",
      paragraphs: [
        "Our services are not directed to children under 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can delete it.",
      ],
    },
    {
      id: "changes",
      heading: "11. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. When we do, we will revise the \"Last updated\" date at the top of this page. Material changes may also be communicated through our website or by email where appropriate.",
      ],
    },
    {
      id: "contact",
      heading: "12. Contact Us",
      paragraphs: [
        `If you have questions about this Privacy Policy or our data practices, contact us at ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  slug: "terms-of-service",
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of STACKREL's website, templates, and web development services.",
  lastUpdated: "July 31, 2026",
  sections: [
    {
      id: "agreement",
      heading: "1. Agreement to Terms",
      paragraphs: [
        `These Terms of Service ("Terms") govern your access to and use of ${LEGAL_WEBSITE}, our website templates, custom development services, and related offerings provided by ${LEGAL_COMPANY_NAME}.`,
        "By accessing our website, purchasing a template, submitting a project request, or creating an account, you agree to these Terms. If you do not agree, please do not use our services.",
      ],
    },
    {
      id: "services",
      heading: "2. Our Services",
      paragraphs: [
        "STACKREL provides premium web development, design, ecommerce, SaaS, and AI-related digital services, along with ready-made website templates and related digital products.",
        "Project scope, deliverables, timelines, and pricing for custom work are defined in proposals, statements of work, or checkout summaries agreed between you and STACKREL.",
      ],
    },
    {
      id: "accounts",
      heading: "3. Accounts and Eligibility",
      paragraphs: [
        "You must provide accurate information when creating an account or submitting project details. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
        "You must be at least 18 years old, or the age of majority in your jurisdiction, to purchase services or enter into binding agreements with us.",
      ],
    },
    {
      id: "templates",
      heading: "4. Template Purchases and Licensing",
      list: [
        "Purchased templates are licensed, not sold, unless otherwise stated at checkout.",
        "Standard licenses typically allow use in personal or client projects subject to the license terms shown on the product page.",
        "You may not resell, redistribute, sublicense, or publicly share template source files except as expressly permitted.",
        "We may update templates after purchase; updates may be provided when available but are not guaranteed indefinitely.",
      ],
    },
    {
      id: "custom-work",
      heading: "5. Custom Development Projects",
      list: [
        "Client materials, content, and approvals must be supplied on time to avoid delays.",
        "Change requests outside the agreed scope may require additional fees and timeline adjustments.",
        "Final deliverables are provided upon completion of payment terms outlined in the project agreement.",
        "STACKREL may showcase completed work in its portfolio unless a confidentiality agreement states otherwise.",
      ],
    },
    {
      id: "payments",
      heading: "6. Payments, Refunds, and Cancellations",
      paragraphs: [
        "Prices are shown in the currency indicated at checkout or in your proposal. You agree to pay all applicable fees, taxes, and charges associated with your purchase or project.",
        "Refund eligibility depends on the product or service purchased. Template refunds may be limited once files have been downloaded or access granted. Custom project refunds are handled according to the signed agreement or proposal.",
      ],
    },
    {
      id: "acceptable-use",
      heading: "7. Acceptable Use",
      list: [
        "Do not use our website or deliverables for unlawful, harmful, fraudulent, or infringing activities.",
        "Do not attempt to interfere with the security, performance, or integrity of our platform.",
        "Do not scrape, copy, or reverse engineer our website, templates, or proprietary materials except as permitted by law or license.",
        "Do not misrepresent your affiliation with STACKREL or use our brand assets without permission.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "8. Intellectual Property",
      paragraphs: [
        "All website content, branding, code, designs, and materials created by STACKREL remain our intellectual property unless ownership is explicitly transferred in writing.",
        "For custom projects, intellectual property ownership is governed by the applicable proposal or contract. Client-provided assets remain the client's responsibility.",
        "Third-party tools, fonts, libraries, plugins, or stock assets may be subject to separate licenses.",
      ],
    },
    {
      id: "disclaimers",
      heading: "9. Disclaimers",
      paragraphs: [
        "Our website and services are provided on an \"as is\" and \"as available\" basis to the fullest extent permitted by law. We do not guarantee uninterrupted access, error-free operation, or specific business outcomes from use of our templates or services.",
        "STACKREL is not responsible for third-party hosting, domains, payment gateways, analytics tools, or integrations configured outside our direct control unless explicitly included in scope.",
      ],
    },
    {
      id: "liability",
      heading: "10. Limitation of Liability",
      paragraphs: [
        "To the maximum extent permitted by law, STACKREL shall not be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption.",
        "Our total liability for any claim arising out of these Terms or your use of our services shall not exceed the amount paid by you to STACKREL for the specific product or service giving rise to the claim during the twelve months preceding the event.",
      ],
    },
    {
      id: "indemnity",
      heading: "11. Indemnification",
      paragraphs: [
        "You agree to indemnify and hold STACKREL harmless from claims, damages, losses, and expenses arising from your misuse of our services, violation of these Terms, infringement of third-party rights, or content you provide for a project.",
      ],
    },
    {
      id: "termination",
      heading: "12. Termination",
      paragraphs: [
        "We may suspend or terminate access to our website or services if you breach these Terms or if required for legal, security, or operational reasons. Provisions that by nature should survive termination will remain in effect.",
      ],
    },
    {
      id: "governing-law",
      heading: "13. Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles, except where mandatory local consumer protections apply.",
      ],
    },
    {
      id: "contact",
      heading: "14. Contact",
      paragraphs: [
        `Questions about these Terms may be sent to ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const COOKIE_POLICY: LegalDocument = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  description:
    "How STACKREL uses cookies and similar technologies on its website.",
  lastUpdated: "July 31, 2026",
  sections: [
    {
      id: "what-are-cookies",
      heading: "1. What Are Cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, keep sessions secure, understand usage, and improve performance.",
        "We may also use similar technologies such as local storage, session storage, and pixels that function in comparable ways.",
      ],
    },
    {
      id: "how-we-use",
      heading: "2. How We Use Cookies",
      paragraphs: [
        "STACKREL uses cookies to operate the site, remember your preferences, support authentication and cart functionality, and understand how visitors interact with our pages and templates.",
      ],
    },
    {
      id: "types",
      heading: "3. Types of Cookies We Use",
      list: [
        "Strictly necessary cookies: required for core site functions such as security, session management, authentication, and checkout flows.",
        "Functional cookies: remember choices like language, form progress, or UI preferences to improve your experience.",
        "Analytics cookies: help us measure traffic, page performance, and feature usage so we can improve the website.",
        "Marketing cookies: may be used to understand campaign effectiveness or deliver relevant messaging where you have consented.",
      ],
    },
    {
      id: "third-party",
      heading: "4. Third-Party Cookies",
      paragraphs: [
        "Some cookies may be placed by third-party providers that support our website, such as analytics, authentication, payment, or embedded content services. These providers process data according to their own privacy policies.",
      ],
    },
    {
      id: "managing",
      heading: "5. Managing Cookies",
      paragraphs: [
        "You can control or delete cookies through your browser settings. Most browsers allow you to block cookies entirely or remove existing cookies.",
        "If you disable strictly necessary cookies, parts of the website — including account login, cart, or checkout — may not function properly.",
      ],
      list: [
        "Chrome: Settings → Privacy and security → Cookies and other site data",
        "Firefox: Settings → Privacy & Security → Cookies and Site Data",
        "Safari: Settings → Privacy → Manage Website Data",
        "Edge: Settings → Cookies and site permissions",
      ],
    },
    {
      id: "consent",
      heading: "6. Consent",
      paragraphs: [
        "Where required by law, we will request your consent before placing non-essential cookies. You may withdraw consent at any time by adjusting your browser settings or cookie preferences if made available on the site.",
      ],
    },
    {
      id: "updates",
      heading: "7. Updates to This Policy",
      paragraphs: [
        "We may update this Cookie Policy as our website, tools, or legal requirements change. Please review this page periodically for the latest information.",
      ],
    },
    {
      id: "contact",
      heading: "8. Contact Us",
      paragraphs: [
        `If you have questions about our use of cookies, email us at ${LEGAL_CONTACT_EMAIL}. For broader privacy questions, see our Privacy Policy.`,
      ],
    },
  ],
};

export const LEGAL_PAGES = [
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
  COOKIE_POLICY,
] as const;
