"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "@/lib/schemas";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

type Mode = "signup" | "login";

const fieldClass =
  "flex h-12 w-full rounded-full border border-black/[0.1] bg-white px-5 text-[15px] text-foreground placeholder:text-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10";

const labelClass = "mb-2 block text-[13px] font-medium text-foreground";

function PasswordInput({
  id,
  placeholder,
  error,
  registration,
}: {
  id: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className={cn(fieldClass, "pr-12")}
          {...registration}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400 transition-colors hover:text-foreground"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function getRedirectPath(searchParams: URLSearchParams) {
  const redirect = searchParams.get("redirect");
  if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
    return redirect;
  }
  return "/account";
}

function SignupForm({
  onSwitch,
  redirectTo,
}: {
  onSwitch: () => void;
  redirectTo: string;
}) {
  const router = useRouter();
  const { signup } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { terms: undefined },
  });

  const onSubmit = async (data: SignupFormData) => {
    setFormError(null);
    const result = await signup({
      name: data.name,
      email: data.email,
      password: data.password,
      company: data.company,
    });

    if (result.ok) {
      router.push(redirectTo);
      return;
    }
    setFormError(result.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="signup-name" className={labelClass}>
            Full name
          </label>
          <input
            id="signup-name"
            placeholder="John Doe"
            className={fieldClass}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="signup-email" className={labelClass}>
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@company.com"
            className={fieldClass}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="signup-password" className={labelClass}>
            Password
          </label>
          <PasswordInput
            id="signup-password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            registration={register("password")}
          />
        </div>

        <div>
          <label htmlFor="signup-confirm" className={labelClass}>
            Confirm password
          </label>
          <PasswordInput
            id="signup-confirm"
            placeholder="Repeat password"
            error={errors.confirmPassword?.message}
            registration={register("confirmPassword")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="signup-company" className={labelClass}>
            Company <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <input
            id="signup-company"
            placeholder="Your company name"
            className={fieldClass}
            {...register("company")}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 pt-1">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-black/20 accent-black"
          {...register("terms")}
        />
        <span className="text-[13px] leading-[1.6] text-zinc-500">
          I agree to the{" "}
          <Link href="/terms-of-service" className="text-foreground underline-offset-2 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-foreground underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors.terms && (
        <p className="text-xs text-red-500">{errors.terms.message}</p>
      )}

      {formError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-[13px] font-semibold tracking-[0.06em] text-white uppercase transition-all hover:bg-black/90 disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-[14px] text-zinc-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-foreground underline-offset-2 hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

function LoginForm({
  onSwitch,
  redirectTo,
}: {
  onSwitch: () => void;
  redirectTo: string;
}) {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError(null);
    const result = await login(data);

    if (result.ok) {
      router.push(redirectTo);
      return;
    }
    setFormError(result.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="login-email" className={labelClass}>
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="you@company.com"
          className={fieldClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className={labelClass}>
          Password
        </label>
        <PasswordInput
          id="login-password"
          placeholder="Your password"
          error={errors.password?.message}
          registration={register("password")}
        />
      </div>

      {formError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-[13px] font-semibold tracking-[0.06em] text-white uppercase transition-all hover:bg-black/90 disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-[14px] text-zinc-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-foreground underline-offset-2 hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  );
}

export function GetStartedPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("signup");
  const redirectTo = getRedirectPath(searchParams);
  const isAdminRedirect = redirectTo === "/admin";

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "login") setMode("login");
    else if (modeParam === "signup") setMode("signup");
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-black" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left — image only, minimal text */}
      <div className="relative hidden min-h-[100dvh] overflow-hidden lg:block">
        <Image
          src="/get-started/hero.jpg"
          alt="Premium workspace"
          fill
          className="object-cover object-center"
          sizes="55vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        <div className="absolute inset-x-0 bottom-0 z-10 p-12 xl:p-16">
          <p
            className="max-w-xs text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Build something premium.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex min-h-[100dvh] flex-col justify-center px-6 pt-[4.5rem] pb-12 sm:px-10 lg:px-14 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-[15px] leading-[1.7] text-zinc-500">
              {mode === "signup"
                ? "Free account — templates, orders, and projects in one place."
                : "Sign in to access your templates, orders, and projects."}
            </p>
          </motion.div>

          {/* Mode tabs */}
          <div className="mt-8 flex rounded-full border border-black/[0.08] bg-[#fafafa] p-1">
            {(["signup", "login"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMode(tab)}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase transition-all",
                  mode === tab
                    ? "bg-white text-foreground shadow-sm"
                    : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {tab === "signup" ? "Sign Up" : "Sign In"}
              </button>
            ))}
          </div>

          {isAdminRedirect && (
            <p className="mt-4 rounded-xl border border-orange-200/80 bg-orange-50 px-4 py-3 text-[12px] leading-relaxed text-orange-800">
              Admin sign-in required. Use your administrator credentials to access the control panel.
            </p>
          )}

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "signup" ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "signup" ? -12 : 12 }}
                transition={{ duration: 0.25 }}
              >
                {mode === "signup" ? (
                  <SignupForm
                    onSwitch={() => setMode("login")}
                    redirectTo={redirectTo}
                  />
                ) : (
                  <LoginForm
                    onSwitch={() => setMode("signup")}
                    redirectTo={redirectTo}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Social divider — visual only for now */}
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-black/[0.08]" />
              <span className="text-[11px] font-medium tracking-[0.1em] text-zinc-400 uppercase">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-black/[0.08]" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {(
                [
                  { name: "Google", logo: "/auth/google.png" },
                  { name: "GitHub", logo: "/auth/github.png" },
                ] as const
              ).map(({ name, logo }) => (
                <button
                  key={name}
                  type="button"
                  disabled
                  title="Coming soon"
                  className="flex items-center justify-center gap-2.5 rounded-full border border-black/[0.1] bg-white py-3 text-[13px] font-medium text-zinc-500 transition-colors hover:border-black/[0.15] disabled:cursor-not-allowed"
                >
                  <Image
                    src={logo}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                    aria-hidden
                  />
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
