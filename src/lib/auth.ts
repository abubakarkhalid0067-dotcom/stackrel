export type UserRole = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: UserRole;
  createdAt: string;
};

export const ADMIN_EMAIL = "admin@stackrel.com";

export function isAdminUser(user: User | null | undefined): boolean {
  return user?.role === "admin";
}

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

async function parseAuthResponse(res: Response): Promise<AuthResult> {
  const data = await res.json();
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error ?? "Request failed" };
  }
  return { ok: true, user: data.user as User };
}

export async function registerAccount(data: {
  name: string;
  email: string;
  password: string;
  company?: string;
}): Promise<AuthResult> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseAuthResponse(res);
}

export async function loginAccount(data: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseAuthResponse(res);
}

export async function logoutAccount(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function getCurrentUser(): Promise<User | null> {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  if (!res.ok) return [];
  const data = await res.json();
  return data.users ?? [];
}

/** @deprecated Use getCurrentUser — kept for compatibility */
export async function fetchUserProfile(_userId: string): Promise<User | null> {
  return getCurrentUser();
}
