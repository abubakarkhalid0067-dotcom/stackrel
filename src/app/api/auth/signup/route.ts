import { NextResponse } from "next/server";
import {
  createAdminClient,
  createServerSupabaseClient,
  mapProfile,
  signInWithPasswordSession,
} from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, company } = await request.json();
    const normalizedEmail = email.toLowerCase().trim();
    const admin = createAdminClient();

    const { data: authData, error } = await admin.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        name: name.trim(),
        company: company?.trim() || null,
      },
    });

    if (error) {
      const message =
        error.message.includes("already") || error.message.includes("exists")
          ? "An account with this email already exists"
          : error.message || "Could not create account. Please try again.";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { ok: false, error: "Could not create account" },
        { status: 500 }
      );
    }

    const signIn = await signInWithPasswordSession(normalizedEmail, password);
    if (!signIn.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: signIn.reason || "Account created. Please sign in.",
        },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, name, email, company, role, created_at")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (!profile) {
      return NextResponse.json(
        { ok: false, error: "Account created but profile setup failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, user: mapProfile(profile) });
  } catch {
    return NextResponse.json({ ok: false, error: "Signup failed" }, { status: 500 });
  }
}
