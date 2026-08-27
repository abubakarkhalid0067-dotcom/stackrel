import { createServerClient } from "@supabase/ssr";
import { supabaseFetch } from "@/lib/supabase/fetch";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { User } from "@/lib/auth";

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  return url;
}

function getServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return key;
}

/** Server-only admin client — never import in client components */
export function createAdminClient() {
  return createSupabaseClient(getSupabaseUrl(), getServiceRoleKey(), {
    global: { fetch: supabaseFetch },
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Cookie-aware server client for auth session read/write (server routes only) */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getServiceRoleKey(), {
    global: { fetch: supabaseFetch },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component — safe to ignore.
        }
      },
    },
  });
}

type ProfileRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  role: "user" | "admin";
  created_at: string;
};

export function mapProfile(row: ProfileRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company ?? undefined,
    role: row.role,
    createdAt: row.created_at,
  };
}

export async function signInWithPasswordSession(email: string, password: string) {
  const url = getSupabaseUrl();
  const key = getServiceRoleKey();

  let response: Response;
  try {
    response = await supabaseFetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "fetch failed";
    return { ok: false as const, reason: message };
  }

  const payload = await response.json();
  if (!response.ok) {
    return {
      ok: false as const,
      reason: payload.error_description ?? payload.msg ?? "auth failed",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.setSession({
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
  });

  if (error) {
    return { ok: false as const, reason: error.message };
  }

  return { ok: true as const, userId: payload.user.id as string };
}

export async function getSessionUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, email, company, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) return null;
  return mapProfile(profile as ProfileRow);
}
