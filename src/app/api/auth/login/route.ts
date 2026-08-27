import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  mapProfile,
  signInWithPasswordSession,
} from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = email.toLowerCase().trim();

    const signIn = await signInWithPasswordSession(normalizedEmail, password);
    if (!signIn.ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, name, email, company, role, created_at")
      .eq("id", signIn.userId)
      .maybeSingle();

    if (!profile) {
      return NextResponse.json(
        { ok: false, error: "Profile not found" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, user: mapProfile(profile) });
  } catch {
    return NextResponse.json({ ok: false, error: "Login failed" }, { status: 500 });
  }
}
