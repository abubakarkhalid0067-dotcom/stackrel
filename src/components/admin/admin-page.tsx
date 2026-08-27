"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  ExternalLink,
  LayoutTemplate,
  LogOut,
  Menu,
  Package,
  Search,
  Shield,
  ShoppingBag,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  getAdminStats,
  getRecentOrders,
  getRevenueByMonth,
  getTemplateCatalogStats,
} from "@/lib/admin";
import {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
  type DashboardOrder,
  type OrderStatus,
} from "@/lib/dashboard";
import { getAllUsers, isAdminUser, type User } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type AdminView = "overview" | "orders" | "users" | "templates" | "analytics";

const NAV_ITEMS: {
  id: AdminView;
  label: string;
  icon: typeof BarChart3;
}[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "users", label: "Users", icon: Users },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  completed: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200/80 bg-amber-50 text-amber-700",
  processing: "border-blue-200/80 bg-blue-50 text-blue-700",
};

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
  icon: typeof DollarSign;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-white/40 uppercase">
          {label}
        </p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
          <Icon className="h-3.5 w-3.5 text-orange-400" />
        </span>
      </div>
      <p
        className="mt-3 text-[1.75rem] font-semibold tracking-[-0.04em] text-white"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-[12px] text-white/45">{sub}</p>}
    </motion.div>
  );
}

function OrderAdminRow({
  order,
  usersById,
  onStatusChange,
  onDelete,
}: {
  order: DashboardOrder;
  usersById: Map<string, User>;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
}) {
  const user = usersById.get(order.userId);
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 border-b border-black/[0.06] py-5 last:border-0 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
          {order.image ? (
            <Image src={order.image} alt={order.title} fill className="object-cover" sizes="48px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-4 w-4 text-zinc-400" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold tracking-[-0.02em]">{order.title}</p>
          <p className="mt-0.5 truncate text-[11px] text-zinc-500">
            {order.id} · {date}
            {user ? ` · ${user.name}` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase focus:outline-none focus:ring-2 focus:ring-black/10",
            STATUS_STYLES[order.status]
          )}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
        <p className="min-w-[4.5rem] text-right text-[14px] font-semibold">
          {order.price !== null ? formatPrice(order.price) : "Custom"}
        </p>
        <button
          type="button"
          onClick={() => onDelete(order.id)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-500 transition-colors hover:bg-red-50"
          aria-label="Delete order"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
      <div className="max-w-md rounded-[1.5rem] border border-black/[0.08] bg-white p-10 text-center shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <Shield className="h-6 w-6 text-red-500" />
        </div>
        <h1
          className="mt-6 text-2xl font-semibold tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Admin access required
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">
          This area is restricted to STACKREL administrators only.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/account"
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-[11px] font-bold tracking-[0.12em] text-white uppercase"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black/[0.1] px-6 py-3 text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminPageContent() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [view, setView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const refreshData = useCallback(async () => {
    const [ordersData, usersData] = await Promise.all([
      getAllOrders(),
      getAllUsers(),
    ]);
    setOrders(ordersData);
    setUsers(usersData);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/get-started?mode=login&redirect=/admin");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && isAdminUser(user)) {
      refreshData();
    }
  }, [user, refreshData]);

  useEffect(() => {
    const onFocus = () => refreshData();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refreshData]);

  const stats = useMemo(() => getAdminStats(orders, users), [orders, users]);
  const templateStats = useMemo(() => getTemplateCatalogStats(orders), [orders]);
  const revenueByMonth = useMemo(() => getRevenueByMonth(orders), [orders]);
  const usersById = useMemo(
    () => new Map(users.map((entry) => [entry.id, entry])),
    [users]
  );

  const filteredOrders = useMemo(() => {
    const query = orderSearch.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter(
      (order) =>
        order.title.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query) ||
        usersById.get(order.userId)?.name.toLowerCase().includes(query) ||
        usersById.get(order.userId)?.email.toLowerCase().includes(query)
    );
  }, [orders, orderSearch, usersById]);

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.email.toLowerCase().includes(query) ||
        entry.company?.toLowerCase().includes(query)
    );
  }, [users, userSearch]);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    await updateOrderStatus(orderId, status);
    await refreshData();
  };

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    await refreshData();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/get-started?mode=login");
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />
      </div>
    );
  }

  if (!isAdminUser(user)) {
    return <AccessDenied />;
  }

  const recentOrders = getRecentOrders(orders, 5);

  const sidebarContent = (
    <>
      <div className="px-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-[11px] font-bold text-white">
            SR
          </span>
          <div>
            <p className="text-[13px] font-semibold text-white">Admin Panel</p>
            <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
              STACKREL
            </p>
          </div>
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
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
              view === id
                ? "bg-white text-black"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-white/[0.08] pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <Link
          href="/account"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <Users className="h-4 w-4" />
          User dashboard
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/55 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#0a0a0a] p-5 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="mb-4 flex h-9 w-9 items-center justify-center self-end rounded-full border border-white/10 text-white"
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
        <aside className="fixed bottom-0 left-0 top-0 z-30 hidden w-[250px] flex-col bg-[#0a0a0a] p-5 lg:flex xl:w-[270px]">
          {sidebarContent}
        </aside>

        <div className="flex min-h-screen flex-1 flex-col lg:ml-[250px] xl:ml-[270px]">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/[0.06] bg-white/90 px-5 py-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  Admin
                </p>
                <p className="text-[15px] font-semibold capitalize">{view}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-700">Live data</span>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-[13px] font-medium">{user.name}</p>
                <p className="text-[11px] text-zinc-500">{user.email}</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {view === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-8"
                >
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#0a0a0a] p-6 sm:p-8">
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-orange-400 uppercase">
                      Control center
                    </p>
                    <h1
                      className="mt-3 text-[clamp(1.75rem,4vw,2.35rem)] font-semibold tracking-[-0.04em] text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Welcome back, {user.name.split(" ")[0]}
                    </h1>
                    <p className="mt-2 max-w-xl text-[14px] text-white/50">
                      Monitor users, orders, template sales, and revenue from one place.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <StatCard
                        label="Total Revenue"
                        value={formatPrice(stats.totalRevenue)}
                        sub={`${stats.completedOrders} completed orders`}
                        icon={DollarSign}
                        delay={0.05}
                      />
                      <StatCard
                        label="Users"
                        value={String(stats.totalUsers)}
                        sub="Registered accounts"
                        icon={Users}
                        delay={0.1}
                      />
                      <StatCard
                        label="Orders"
                        value={String(stats.totalOrders)}
                        sub={`${stats.pendingOrders} pending`}
                        icon={ShoppingBag}
                        delay={0.15}
                      />
                      <StatCard
                        label="Avg Order"
                        value={formatPrice(stats.avgOrderValue)}
                        sub="Completed sales"
                        icon={TrendingUp}
                        delay={0.2}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.08)]">
                      <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-[16px] font-semibold">Recent orders</h2>
                        <button
                          type="button"
                          onClick={() => setView("orders")}
                          className="text-[12px] font-medium text-zinc-500 hover:text-foreground"
                        >
                          View all
                        </button>
                      </div>
                      {recentOrders.length === 0 ? (
                        <p className="py-8 text-center text-[14px] text-zinc-500">
                          No orders yet.
                        </p>
                      ) : (
                        recentOrders.map((order) => (
                          <OrderAdminRow
                            key={order.id}
                            order={order}
                            usersById={usersById}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDeleteOrder}
                          />
                        ))
                      )}
                    </div>

                    <div className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.08)]">
                      <h2 className="text-[16px] font-semibold">Quick stats</h2>
                      <div className="mt-5 space-y-4">
                        {[
                          { label: "Template sales", value: stats.templateSales },
                          { label: "Custom projects", value: stats.customProjects },
                          { label: "Pending orders", value: stats.pendingOrders },
                          { label: "Catalog templates", value: templateStats.length },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-xl border border-black/[0.05] bg-[#fafafa] px-4 py-3"
                          >
                            <span className="text-[13px] text-zinc-600">{item.label}</span>
                            <span className="text-[15px] font-semibold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h1
                        className="text-[1.75rem] font-semibold tracking-[-0.03em]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        All orders
                      </h1>
                      <p className="mt-1 text-[14px] text-zinc-500">
                        {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="search"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Search orders..."
                        className="h-10 w-full rounded-full border border-black/[0.08] bg-white pr-4 pl-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>

                  <div className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.08)]">
                    {filteredOrders.length === 0 ? (
                      <p className="py-12 text-center text-[14px] text-zinc-500">
                        No orders found.
                      </p>
                    ) : (
                      filteredOrders.map((order) => (
                        <OrderAdminRow
                          key={order.id}
                          order={order}
                          usersById={usersById}
                          onStatusChange={handleStatusChange}
                          onDelete={handleDeleteOrder}
                        />
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {view === "users" && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h1
                        className="text-[1.75rem] font-semibold tracking-[-0.03em]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Users
                      </h1>
                      <p className="mt-1 text-[14px] text-zinc-500">
                        {filteredUsers.length} registered user{filteredUsers.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="search"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Search users..."
                        className="h-10 w-full rounded-full border border-black/[0.08] bg-white pr-4 pl-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.375rem] border border-black/[0.07] bg-white shadow-[0_20px_48px_-28px_rgba(0,0,0,0.08)]">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] text-left">
                        <thead>
                          <tr className="border-b border-black/[0.06] text-[11px] tracking-[0.12em] text-zinc-400 uppercase">
                            <th className="px-6 py-4 font-semibold">User</th>
                            <th className="px-6 py-4 font-semibold">Company</th>
                            <th className="px-6 py-4 font-semibold">Role</th>
                            <th className="px-6 py-4 font-semibold">Joined</th>
                            <th className="px-6 py-4 font-semibold">Orders</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((entry) => {
                            const userOrders = orders.filter((order) => order.userId === entry.id);
                            return (
                              <tr key={entry.id} className="border-b border-black/[0.04] last:border-0">
                                <td className="px-6 py-4">
                                  <p className="text-[14px] font-medium">{entry.name}</p>
                                  <p className="text-[12px] text-zinc-500">{entry.email}</p>
                                </td>
                                <td className="px-6 py-4 text-[13px] text-zinc-600">
                                  {entry.company || "—"}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={cn(
                                      "rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase",
                                      entry.role === "admin"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-zinc-100 text-zinc-600"
                                    )}
                                  >
                                    {entry.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-[13px] text-zinc-600">
                                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </td>
                                <td className="px-6 py-4 text-[13px] font-semibold">
                                  {userOrders.length}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "templates" && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div>
                    <h1
                      className="text-[1.75rem] font-semibold tracking-[-0.03em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Template catalog
                    </h1>
                    <p className="mt-1 text-[14px] text-zinc-500">
                      Sales performance across your template store.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {templateStats.map((template) => (
                      <div
                        key={template.slug}
                        className="overflow-hidden rounded-[1.25rem] border border-black/[0.07] bg-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.1)]"
                      >
                        <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100">
                          <Image
                            src={template.image}
                            alt={template.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="px-5 pb-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[15px] font-semibold">{template.title}</p>
                              <p className="text-[11px] tracking-[0.12em] text-zinc-400 uppercase">
                                {template.category}
                              </p>
                            </div>
                            <p className="text-[14px] font-semibold">
                              {formatPrice(template.price)}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#fafafa] px-3 py-2.5 text-[12px]">
                            <span className="text-zinc-500">{template.sales} sales</span>
                            <span className="font-semibold">{formatPrice(template.revenue)}</span>
                          </div>
                          <Link
                            href={`/templates/${template.slug}`}
                            className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.08em] uppercase"
                          >
                            View template
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {view === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div>
                    <h1
                      className="text-[1.75rem] font-semibold tracking-[-0.03em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Analytics
                    </h1>
                    <p className="mt-1 text-[14px] text-zinc-500">
                      Revenue trends and store performance.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { label: "Revenue", value: formatPrice(stats.totalRevenue) },
                      { label: "Template sales", value: String(stats.templateSales) },
                      { label: "Custom projects", value: String(stats.customProjects) },
                      { label: "Conversion base", value: `${stats.totalUsers} users` },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[1.25rem] border border-black/[0.07] bg-white p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.08)]"
                      >
                        <p className="text-[11px] tracking-[0.12em] text-zinc-400 uppercase">
                          {item.label}
                        </p>
                        <p
                          className="mt-2 text-[1.5rem] font-semibold tracking-[-0.03em]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[1.375rem] border border-black/[0.07] bg-white p-6 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[16px] font-semibold">Revenue by month</h2>
                    {revenueByMonth.length === 0 ? (
                      <p className="mt-8 py-8 text-center text-[14px] text-zinc-500">
                        No revenue data yet. Complete a checkout while logged in to populate analytics.
                      </p>
                    ) : (
                      <div className="mt-6 space-y-4">
                        {revenueByMonth.map((entry) => {
                          const max = Math.max(...revenueByMonth.map((item) => item.revenue), 1);
                          const width = `${Math.max((entry.revenue / max) * 100, 8)}%`;
                          return (
                            <div key={entry.month}>
                              <div className="mb-2 flex items-center justify-between text-[13px]">
                                <span className="text-zinc-600">{entry.month}</span>
                                <span className="font-semibold">{formatPrice(entry.revenue)}</span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-[#fafafa]">
                                <div
                                  className="h-full rounded-full bg-black transition-all"
                                  style={{ width }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
