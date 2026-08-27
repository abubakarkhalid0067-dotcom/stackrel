"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ArrowLeft, Lock } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/brand-logo";
import { useAuth } from "@/components/providers/auth-provider";
import { CartButton } from "@/components/cart/cart-button";

const LEFT_LINKS = NAV_LINKS.slice(0, 5);
const RIGHT_LINKS = NAV_LINKS.slice(5);

export function Navbar() {
  const pathname = usePathname();
  const isCheckoutPage = pathname.startsWith("/checkout");
  const isGetStartedPage = pathname === "/get-started";
  const isMinimalHeader = isCheckoutPage || isGetStartedPage;
  const isTemplatesPage = pathname === "/templates";
  const isProductPage = pathname.startsWith("/templates/") && !isTemplatesPage;
  const isInnerPage =
    isProductPage ||
    isTemplatesPage ||
    pathname === "/pricing" ||
    pathname === "/contact" ||
    pathname === "/about" ||
    pathname === "/careers" ||
    pathname === "/portfolio" ||
    pathname === "/blog" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms-of-service" ||
    pathname === "/cookie-policy" ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/blog/") ||
    pathname === "/cart" ||
    pathname === "/get-started" ||
    pathname === "/account" ||
    pathname === "/admin" ||
    isCheckoutPage;
  const checkoutBackHref = pathname.startsWith("/checkout/custom")
    ? "/pricing"
    : pathname.startsWith("/checkout/cart")
      ? "/cart"
      : pathname.replace(/^\/checkout\//, "/templates/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setIsHero(y < window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isHomeHeroOverlay = !isInnerPage && isHero && !isScrolled;
  const isTransparent = (isInnerPage || isHomeHeroOverlay) && !isScrolled;

  const linkClass = cn(
    "text-[13px] font-normal transition-colors duration-300",
    isHomeHeroOverlay
      ? "text-white/75 hover:text-white"
      : "text-foreground/70 hover:text-foreground"
  );

  const homeHref = isInnerPage ? "/" : "#home";
  const navHref = (href: string) => {
    if (href.startsWith("/")) return href;
    return isInnerPage ? `/${href}` : href;
  };
  const { user } = useAuth();
  const ctaHref = user ? "/account" : "/get-started";
  const ctaLabel = user ? "Dashboard" : "Get Started";

  if (pathname === "/account" || pathname === "/admin") return null;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          isMinimalHeader
            ? "border-b border-black/[0.06] bg-white py-4"
            : isTransparent
              ? "bg-transparent py-7"
              : isScrolled
                ? "glass py-3 shadow-soft"
                : "bg-background/80 py-5 backdrop-blur-md"
        )}
      >
        <nav
          className="mx-auto w-full max-w-[1440px]"
          style={{
            paddingLeft: "clamp(1.5rem, 4vw, 3.5rem)",
            paddingRight: "clamp(1.5rem, 4vw, 3.5rem)",
          }}
        >
          {isCheckoutPage ? (
            <>
              {/* Checkout — minimal header */}
              <div className="relative flex items-center justify-between">
                <Link
                  href={checkoutBackHref}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Link>
                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                  <BrandLogo
                    size={36}
                    textClassName="text-xl italic text-foreground"
                  />
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                  <Lock className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Secure Checkout</span>
                </div>
              </div>
            </>
          ) : isGetStartedPage ? (
            <>
              {/* Get Started — minimal header */}
              <div className="relative flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Link>
                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                  <BrandLogo
                    size={36}
                    textClassName="text-xl italic text-foreground"
                  />
                </Link>
                <Link
                  href="/get-started?mode=login"
                  className="text-[13px] font-medium text-zinc-500 transition-colors hover:text-foreground"
                >
                  Sign in
                </Link>
              </div>
            </>
          ) : (
          <>
          {/* Desktop — reference 3-column */}
          <div className="hidden items-center lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center gap-7 xl:gap-9">
              {LEFT_LINKS.map((link) => (
                <Link key={link.href} href={navHref(link.href)} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>

            <Link href={homeHref} className="px-4">
              <BrandLogo
                size={42}
                className={cn(isHomeHeroOverlay ? "text-white" : "text-foreground")}
                textClassName={cn(
                  "text-[clamp(1.35rem,2vw,1.75rem)] tracking-tight italic",
                  isHomeHeroOverlay ? "text-white" : "text-foreground"
                )}
              />
            </Link>

            <div className="flex items-center justify-end gap-7 xl:gap-9">
              {RIGHT_LINKS.map((link) => (
                <Link key={link.href} href={navHref(link.href)} className={linkClass}>
                  {link.label}
                </Link>
              ))}
              {isHomeHeroOverlay && (
                <button
                  type="button"
                  aria-label="Search"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  <Search className="h-[18px] w-[18px] stroke-[1.5]" />
                </button>
              )}
              <CartButton variant={isHomeHeroOverlay ? "dark" : "default"} />
              <Link
                href={ctaHref}
                className={cn(
                  "rounded-full border px-5 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-all duration-300",
                  isInnerPage
                    ? "border-black bg-black text-white hover:bg-black/90"
                    : isHomeHeroOverlay
                      ? "border-white/45 text-white hover:bg-white hover:text-black"
                      : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                )}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-between lg:hidden">
            <Link href={homeHref}>
              <BrandLogo
                size={36}
                textClassName={cn(
                  "text-xl italic",
                  isHomeHeroOverlay ? "text-white" : "text-foreground"
                )}
              />
            </Link>
            <button
              type="button"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                isHomeHeroOverlay
                  ? "border-white/30 text-white"
                  : "border-black/20 text-foreground"
              )}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
          </>
          )}
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={navHref(link.href)}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={ctaHref}
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 rounded-full border border-white/45 px-8 py-2.5 text-[11px] font-medium tracking-[0.12em] text-white uppercase"
              >
                {ctaLabel}
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
