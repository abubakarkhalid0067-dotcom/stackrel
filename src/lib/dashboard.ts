export type OrderStatus = "completed" | "pending" | "processing";

export type DashboardOrder = {
  id: string;
  userId: string;
  title: string;
  slug?: string;
  image?: string;
  category?: string;
  price: number | null;
  type: "template" | "custom";
  status: OrderStatus;
  createdAt: string;
};

async function fetchOrders(): Promise<DashboardOrder[]> {
  const res = await fetch("/api/orders");
  if (!res.ok) return [];
  const data = await res.json();
  return data.orders ?? [];
}

export async function getAllOrders(): Promise<DashboardOrder[]> {
  return fetchOrders();
}

export async function getOrdersForUser(_userId: string): Promise<DashboardOrder[]> {
  return fetchOrders();
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<DashboardOrder | null> {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return null;
  return null;
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
  return res.ok;
}

export async function saveOrder(
  data: Omit<DashboardOrder, "id" | "createdAt"> & { id?: string }
): Promise<DashboardOrder | null> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.order ?? null;
}

export function getDashboardStats(orders: DashboardOrder[]) {
  const templates = orders.filter((o) => o.type === "template" && o.status === "completed");
  const custom = orders.filter((o) => o.type === "custom");
  const totalSpent = orders
    .filter((o) => o.status === "completed" && o.price !== null)
    .reduce((sum, o) => sum + (o.price ?? 0), 0);

  return {
    totalOrders: orders.length,
    templatesOwned: templates.length,
    activeProjects: custom.filter((o) => o.status !== "completed").length,
    totalSpent,
  };
}
