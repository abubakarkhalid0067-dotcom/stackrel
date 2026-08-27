import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { LoadingScreen } from "@/components/providers/loading-screen";

const CustomCursor = dynamic(
  () =>
    import("@/components/effects/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const PremiumEffects = dynamic(
  () =>
    import("@/components/effects/premium-effects").then((m) => m.PremiumEffects),
  { ssr: false }
);

const CartDrawer = dynamic(
  () => import("@/components/cart/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stackrel.com"),
  title: {
    default: "STACKREL — Premium Web Development Agency",
    template: "%s | STACKREL",
  },
  description:
    "STACKREL builds premium websites, ecommerce stores, SaaS platforms, and AI-powered digital experiences that help businesses grow faster.",
  keywords: [
    "web development agency",
    "premium websites",
    "Next.js development",
    "SaaS development",
    "ecommerce development",
    "UI/UX design",
    "AI development",
    "GPT apps",
    "OpenAI integration",
  ],
  authors: [{ name: "STACKREL" }],
  creator: "STACKREL",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stackrel.com",
    siteName: "STACKREL",
    title: "STACKREL — Premium Web Development Agency",
    description:
      "Building premium websites that grow businesses. High-performance web development, design, and digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "STACKREL — Premium Web Development Agency",
    description:
      "Building premium websites that grow businesses.",
    creator: "@stackrel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "STACKREL",
  description:
    "Premium web development agency specializing in high-performance websites, ecommerce, SaaS, and AI solutions.",
  url: "https://stackrel.com",
  logo: "https://stackrel.com/logo.png",
  priceRange: "$$$$",
  areaServed: "Worldwide",
  serviceType: [
    "Web Development",
    "UI/UX Design",
    "Ecommerce Development",
    "SaaS Development",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}>
      <head>
        <link rel="preload" as="image" href="/hero/stackrel.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <LoadingScreen />
        <CustomCursor />
        <PremiumEffects />
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScrollProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
