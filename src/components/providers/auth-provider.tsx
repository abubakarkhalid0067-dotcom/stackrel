"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getCurrentUser,
  isAdminUser,
  loginAccount,
  logoutAccount,
  registerAccount,
  type User,
} from "@/lib/auth";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    company?: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (data: {
    email: string;
    password: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      company?: string;
    }) => {
      const result = await registerAccount(data);
      if (result.ok) {
        setUser(result.user);
        return { ok: true as const };
      }
      return { ok: false as const, error: result.error };
    },
    []
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      const result = await loginAccount(data);
      if (result.ok) {
        setUser(result.user);
        return { ok: true as const };
      }
      return { ok: false as const, error: result.error };
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutAccount();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAdmin: isAdminUser(user),
      signup,
      login,
      logout,
    }),
    [user, isLoading, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
