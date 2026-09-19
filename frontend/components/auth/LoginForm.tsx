"use client";

import Link from "next/link";
import {
  Building2,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { saveAuthUser } from "@/lib/auth-client";

interface CsrfResponse {
  csrfToken: string;
}

interface LoginResponse {
  ok?: boolean;
  url?: string;
  error?: string;
  status?: number;
  message?: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [workspace, setWorkspace] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (
        !workspace.trim() ||
        !email.trim() ||
        !password
      ) {
        setError("Please fill all fields.");
        return;
      }

      // 1. Get CSRF token from backend NextAuth
      const csrfResponse = await fetch(
        "/backend/api/auth/csrf",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!csrfResponse.ok) {
        throw new Error(
          "Unable to connect to the authentication server."
        );
      }

      const csrfData =
        (await csrfResponse.json()) as CsrfResponse;

      if (!csrfData.csrfToken) {
        throw new Error(
          "Authentication server did not return a CSRF token."
        );
      }

      // 2. Submit credentials to backend NextAuth
      const formData = new URLSearchParams();

      formData.append(
        "csrfToken",
        csrfData.csrfToken
      );

      formData.append(
        "workspace",
        workspace.trim()
      );

      formData.append(
        "email",
        email.trim()
      );

      formData.append(
        "password",
        password
      );

      formData.append(
        "json",
        "true"
      );

      const loginResponse = await fetch(
        "/backend/api/auth/callback/credentials",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          credentials: "include",
          redirect: "manual",
        }
      );

      let loginData: LoginResponse = {};

      try {
        loginData =
          (await loginResponse.json()) as LoginResponse;
      } catch {
        // NextAuth may return a redirect response.
      }

      // 3. Check the NextAuth session
      const sessionResponse = await fetch(
        "/backend/api/auth/session",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!sessionResponse.ok) {
        setError(
          "Login failed. Please check your workspace, email and password."
        );
        return;
      }

      const sessionData =
        await sessionResponse.json();

      if (!sessionData?.user?.id) {
        setError(
          loginData.error === "CredentialsSignin"
            ? "Invalid workspace, email or password."
            : "Login failed. Please check your workspace, email and password."
        );
        return;
      }

      // 4. Save user information for the existing UI.
      // NextAuth remains the actual authentication authority.
      saveAuthUser({
        id: sessionData.user.id,
        name: sessionData.user.name || "",
        email: sessionData.user.email || "",
        role: sessionData.user.role || "",
        workspaceId:
          sessionData.user.workspaceId || "",
        workspaceSlug:
          sessionData.user.workspaceSlug || "",
      });

      // 5. Go to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(
        "Frontend login error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the backend. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Workspace */}
      <div>
        <label className="mb-2 block font-semibold">
          Workspace
        </label>

        <div className="relative">
          <Building2
            className="absolute left-4 top-4 text-slate-400"
            size={20}
          />

          <input
            type="text"
            value={workspace}
            onChange={(e) =>
              setWorkspace(e.target.value)
            }
            placeholder="your-workspace-slug"
            required
            className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block font-semibold">
          Email
        </label>

        <div className="relative">
          <Mail
            className="absolute left-4 top-4 text-slate-400"
            size={20}
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block font-semibold">
          Password
        </label>

        <div className="relative">
          <Lock
            className="absolute left-4 top-4 text-slate-400"
            size={20}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            required
            className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-12 outline-none transition focus:border-blue-600"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-4 text-slate-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Remember / Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span className="text-sm">
            Remember Me
          </span>
        </label>

        <Link
          href="/forget-password"
          className="text-sm font-semibold text-blue-600"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
      >
        {loading
          ? "Signing in..."
          : "Sign In"}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-500">
            OR
          </span>
        </div>
      </div>

      {/* Google */}
      <button
        type="button"
        className="w-full rounded-xl border py-4 font-semibold transition hover:bg-slate-50"
      >
        Continue with Google
      </button>

      {/* Register */}
      <p className="text-center text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}
