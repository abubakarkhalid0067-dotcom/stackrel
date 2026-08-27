import { NextResponse } from "next/server";
import { getSessionUser, mapProfile } from "@/lib/supabase/server";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = await (
    await import("@/lib/supabase/server")
  ).createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, company, role, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    users: data.map((row) => mapProfile(row)),
  });
}
