import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/dashboard";

type OrderRow = {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  image: string | null;
  category: string | null;
  price: number | null;
  type: "template" | "custom";
  status: OrderStatus;
  created_at: string;
};

function mapOrder(row: OrderRow) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    slug: row.slug ?? undefined,
    image: row.image ?? undefined,
    category: row.category ?? undefined,
    price: row.price !== null ? Number(row.price) : null,
    type: row.type,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await (
    await import("@/lib/supabase/server")
  ).createServerSupabaseClient();

  let query = supabase.from("orders").select("*").order("created_at", { ascending: false });

  if (user.role !== "admin") {
    query = query.eq("user_id", user.id);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: (data as OrderRow[]).map(mapOrder) });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = await (
    await import("@/lib/supabase/server")
  ).createServerSupabaseClient();

  const id = body.id ?? `SR-${Date.now().toString(36).toUpperCase()}`;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      id,
      user_id: user.id,
      title: body.title,
      slug: body.slug ?? null,
      image: body.image ?? null,
      category: body.category ?? null,
      price: body.price,
      type: body.type,
      status: body.status,
    })
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to save order" }, { status: 500 });
  }

  return NextResponse.json({ order: mapOrder(data as OrderRow) });
}
