"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CreditCard,
  Download,
  ExternalLink,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Mail,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  getDashboardStats,
  getOrdersForUser,
  type DashboardOrder,
} from "@/lib/dashboard";
import { TEMPLATE_LIST } from "@/lib/products";
import { CartPageContent } from "@/components/cart/cart-page-content";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { User as AuthUser } from "@/lib/auth";

type DashboardView = "overview" | "orders" | "cart" | "templates" | "settings";

const NAV_ITEMS: { id: DashboardView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "settings", label: "Settings", icon: Settings },
];

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
      }}
    />
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: typeof TrendingUp;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.1)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
          {label}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] bg-[#fafafa]">
          <Icon className="h-4 w-4 text-foreground" />
        </span>
      </div>
      <p
        className="mt-4 text-[2rem] font-semibold tracking-[-0.04em]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-[13px] text-zinc-500">{sub}</p>}
    </motion.div>
  );
}

function OrderRow({ order }: { order: DashboardOrder }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const statusStyles = {
    completed: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
    pending: "border-amber-200/80 bg-amber-50 text-amber-700",
    processing: "border-blue-200/80 bg-blue-50 text-blue-700",
  };

  return (
    <div className="flex flex-col gap-4 border-b border-black/[0.06] py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
          {order.image ? (
            <Image
              src={order.image}
              alt={order.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-5 w-5 text-zinc-400" />
            </div>
          )}
        </div>
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em]">{order.title}</p>
          <p className="mt-0.5 text-[12px] text-zinc-500">
            {order.id} · {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase",
            statusStyles[order.status]
          )}
        >
          {order.status}
        </span>
        <p className="min-w-[4rem] text-right text-[15px] font-semibold">
          {order.price !== null ? formatPrice(order.price) : "Custom"}
        </p>
        {order.type === "template" && order.status === "completed" && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] px-4 py-2 text-[11px] font-semibold tracking-[0.06em] uppercase transition-colors hover:bg-zinc-50"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        )}
      </div>
    </div>
  );
}

function OverviewView({
  user,
  orders,
  stats,
}: {
  user: AuthUser;
  orders: DashboardOrder[];
  stats: ReturnType<typeof getDashboardStats>;
}) {
  const firstName = user.name.split(" ")[0];

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Good to see you, {firstName}
        </h1>
        <p className="mt-2 text-[15px] text-zinc-500">
          Here&apos;s what&apos;s happening with your STACKREL workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={String(stats.totalOrders)}
          sub="All time"
          icon={ShoppingBag}
          delay={0.05}
        />
        <StatCard
          label="Templates"
          value={String(stats.templatesOwned)}
          sub="Ready to download"
          icon={LayoutTemplate}
          delay={0.1}
        />
        <StatCard
          label="Active Projects"
          value={String(stats.activeProjects)}
          sub="Custom builds"
          icon={Sparkles}
          delay={0.15}
        />
        <StatCard
          label="Total Spent"
          value={formatPrice(stats.totalSpent)}
          sub="Lifetime value"
          icon={TrendingUp}
          delay={0.2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent orders */}
        <div className="rounded-[1.625rem] border border-black/[0.07] bg-white p-6 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] lg:col-span-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold tracking-[-0.02em]">Recent Orders</h2>
            {orders.length > 0 && (
              <span className="text-[12px] text-zinc-400">{orders.length} total</span>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#fafafa]">
                <ShoppingBag className="h-6 w-6 text-zinc-400" />
              </div>
              <p className="mt-4 text-[15px] font-medium">No orders yet</p>
              <p className="mt-1 max-w-xs text-[13px] text-zinc-500">
                Purchase a premium template or start a custom project to see it here.
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-all hover:bg-black/90"
              >
                Browse Pricing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div>
              {orders.slice(0, 4).map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4 lg:col-span-2">
          {[
            {
              icon: LayoutTemplate,
              title: "Browse Templates",
              desc: "Premium Framer & React kits",
              href: "/templates",
            },
            {
              icon: CreditCard,
              title: "Custom Pricing",
              desc: "Website development plans",
              href: "/pricing",
            },
            {
              icon: Mail,
              title: "Get Support",
              desc: "We respond within 24h",
              href: "/contact",
            },
          ].map(({ icon: Icon, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex items-center gap-4 rounded-[1.25rem] border border-black/[0.07] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.12)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-[#fafafa]">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold">{title}</p>
                <p className="text-[12px] text-zinc-500">{desc}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-foreground" />
            </Link>
          ))}

          <div className="rounded-[1.25rem] border border-black/[0.07] bg-[#080808] p-6 text-white">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-white/50 uppercase">
              Pro Tip
            </p>
            <p
              className="mt-3 text-[15px] font-semibold leading-snug tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Link your checkout email to track all purchases automatically.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/70 transition-colors hover:text-white"
            >
              Need help?
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersView({ orders }: { orders: DashboardOrder[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          My Orders
        </h1>
        <p className="mt-2 text-[15px] text-zinc-500">
          All your template purchases and custom project requests.
        </p>
      </div>

      <div className="rounded-[1.625rem] border border-black/[0.07] bg-white p-6 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:p-8">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Package className="h-10 w-10 text-zinc-300" />
            <p className="mt-4 text-[15px] font-medium">No orders to show</p>
            <Link
              href="/pricing"
              className="mt-4 text-[13px] font-medium text-foreground underline-offset-2 hover:underline"
            >
              Explore products →
            </Link>
          </div>
        ) : (
          orders.map((order) => <OrderRow key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}

function TemplatesView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Template Library
          </h1>
          <p className="mt-2 text-[15px] text-zinc-500">
            Premium templates — buy once, launch instantly.
          </p>
        </div>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground"
        >
          View all on site
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {TEMPLATE_LIST.map((template, i) => (
          <motion.div
            key={template.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              href={`/templates/${template.slug}`}
              className="group block overflow-hidden rounded-[1.375rem] border border-black/[0.07] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_24px_56px_-24px_rgba(0,0,0,0.14)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-[15px] font-semibold">{template.title}</p>
                  <p className="text-[12px] text-zinc-500">{template.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-semibold">{formatPrice(template.price)}</p>
                  <p className="text-[11px] text-zinc-400">One-time</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SettingsView({ user }: { user: AuthUser }) {
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Account Settings
        </h1>
        <p className="mt-2 text-[15px] text-zinc-500">
          Manage your profile and account preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.625rem] border border-black/[0.07] bg-white p-7 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-semibold text-white">
              {initials}
            </div>
            <div>
              <p className="text-[17px] font-semibold">{user.name}</p>
              <p className="text-[13px] text-zinc-500">{user.email}</p>
              {user.company && (
                <p className="mt-0.5 text-[13px] text-zinc-400">{user.company}</p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-black/[0.06] pt-6">
            {[
              { label: "Full name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Company", value: user.company ?? "—" },
              { label: "Member since", value: memberSince },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-[13px] text-zinc-500">{label}</span>
                <span className="text-[14px] font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-zinc-400" />
              <p className="text-[14px] font-semibold">Profile</p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              Profile editing will be available when backend auth is connected.
              Contact support to update your details.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-[13px] font-medium text-foreground underline-offset-2 hover:underline"
            >
              Contact support
            </Link>
          </div>

          <div className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-zinc-400" />
              <p className="text-[14px] font-semibold">Security</p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              Password change and two-factor authentication coming soon.
            </p>
          </div>

          <div className="rounded-[1.375rem] border border-emerald-200/60 bg-emerald-50/50 p-6">
            <p className="text-[13px] font-semibold text-emerald-800">Account active</p>
            <p className="mt-1 text-[12px] text-emerald-700/80">
              Your STACKREL workspace is fully set up and ready to use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPageContent() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const { itemCount } = useCart();
  const [view, setView] = useState<DashboardView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/get-started");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    getOrdersForUser(user.id).then(setOrders);
  }, [user]);

  useEffect(() => {
    const refresh = () => {
      if (user) getOrdersForUser(user.id).then(setOrders);
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-black" />
      </div>
    );
  }

  const stats = getDashboardStats(orders);
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.push("/get-started");
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-[13px] font-semibold text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold">{user.name.split(" ")[0]}</p>
          <p className="truncate text-[11px] text-zinc-500">{user.email}</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setView(id);
              setSidebarOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
              view === id
                ? "bg-black text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
            {id === "cart" && itemCount > 0 && (
              <span
                className={cn(
                  "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                  view === id ? "bg-white text-black" : "bg-black text-white"
                )}
              >
                {itemCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-black/[0.06] pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
        >
          <ExternalLink className="h-4 w-4" />
          Back to site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      <GridBackground />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-black/[0.08] bg-white p-5 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="mb-4 flex h-9 w-9 items-center justify-center self-end rounded-full border border-black/[0.08]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="fixed bottom-0 left-0 top-0 z-30 hidden w-[260px] flex-col border-r border-black/[0.06] bg-white/80 p-5 backdrop-blur-xl lg:flex xl:w-[280px]">
          {sidebarContent}
        </aside>

        {/* Main */}
        <div className="flex min-h-[calc(100dvh-4.5rem)] flex-1 flex-col lg:ml-[260px] xl:ml-[280px]">
          {/* Dashboard top bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/[0.06] bg-white/80 px-5 py-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="search"
                  placeholder="Search orders, templates..."
                  className="h-10 w-56 rounded-full border border-black/[0.08] bg-[#fafafa] pr-4 pl-10 text-[13px] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 xl:w-72"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView("cart")}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white transition-colors hover:bg-zinc-50 lg:hidden"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4 text-zinc-500" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white transition-colors hover:bg-zinc-50"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 text-zinc-500" />
                {orders.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-orange-500" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setView("cart")}
                className="relative hidden items-center gap-2 rounded-full border border-black/[0.08] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-zinc-50 sm:inline-flex"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Cart
                {itemCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link
                href="/pricing"
                className="hidden rounded-full bg-black px-4 py-2 text-[11px] font-semibold tracking-[0.08em] text-white uppercase transition-all hover:bg-black/90 sm:inline-flex"
              >
                New Purchase
              </Link>
            </div>
          </div>

          <main className="flex-1 p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {view === "overview" && (
                  <OverviewView user={user} orders={orders} stats={stats} />
                )}
                {view === "orders" && <OrdersView orders={orders} />}
                {view === "cart" && <CartPageContent embedded />}
                {view === "templates" && <TemplatesView />}
                {view === "settings" && <SettingsView user={user} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
