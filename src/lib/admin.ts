import type { User } from "@/lib/auth";
import type { DashboardOrder, OrderStatus } from "@/lib/dashboard";
import { PRODUCTS } from "@/lib/products";

export type AdminStats = {
  totalUsers: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  templateSales: number;
  customProjects: number;
  avgOrderValue: number;
};

export function getAdminStats(
  orders: DashboardOrder[],
  users: User[]
): AdminStats {
  const completed = orders.filter((order) => order.status === "completed");
  const pending = orders.filter(
    (order) => order.status === "pending" || order.status === "processing"
  );
  const totalRevenue = completed.reduce((sum, order) => sum + (order.price ?? 0), 0);

  return {
    totalUsers: users.length,
    totalOrders: orders.length,
    completedOrders: completed.length,
    pendingOrders: pending.length,
    totalRevenue,
    templateSales: orders.filter((order) => order.type === "template").length,
    customProjects: orders.filter((order) => order.type === "custom").length,
    avgOrderValue:
      completed.length > 0 ? Math.round(totalRevenue / completed.length) : 0,
  };
}

export function getRecentOrders(orders: DashboardOrder[], limit = 6) {
  return orders.slice(0, limit);
}

export function getOrdersByStatus(
  orders: DashboardOrder[],
  status: OrderStatus | "all"
) {
  if (status === "all") return orders;
  return orders.filter((order) => order.status === status);
}

export function getTemplateCatalogStats(orders: DashboardOrder[]) {
  return PRODUCTS.map((product) => {
    const sales = orders.filter(
      (order) => order.slug === product.slug && order.status === "completed"
    );

    return {
      slug: product.slug,
      title: product.title,
      category: product.category,
      price: product.price,
      image: product.image,
      sales: sales.length,
      revenue: sales.reduce((sum, order) => sum + (order.price ?? 0), 0),
    };
  });
}

export function getRevenueByMonth(orders: DashboardOrder[]) {
  const completed = orders.filter(
    (order) => order.status === "completed" && order.price !== null
  );
  const buckets = new Map<string, number>();

  for (const order of completed) {
    const date = new Date(order.createdAt);
    const key = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    buckets.set(key, (buckets.get(key) ?? 0) + (order.price ?? 0));
  }

  return Array.from(buckets.entries())
    .slice(0, 6)
    .map(([month, revenue]) => ({ month, revenue }));
}
