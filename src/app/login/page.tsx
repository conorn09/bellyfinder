"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) router.push("/creators");
    else setError(result.error ?? "Invalid email or password.");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/20 blur-[120px] animate-[drift_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px] animate-[drift_26s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px] animate-[drift_30s_ease-in-out_infinite]" />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm animate-[fadeUp_0.6s_ease-out]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 shadow-2xl shadow-[var(--accent)]/5">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-600 mb-4 animate-[pulse_3s_ease-in-out_infinite]">
              <span className="text-2xl">🔥</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-[var(--text-muted)] text-sm mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-[shake_0.4s_ease-in-out]">
                {error}
              </div>
            )}
            <div className="group">
              <label htmlFor="email" className="block text-sm mb-1.5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div className="group">
              <label htmlFor="password" className="block text-sm mb-1.5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-purple-600 hover:from-[var(--accent-hover)] hover:to-purple-700 disabled:opacity-50 text-white font-medium transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <p className="text-sm text-[var(--text-muted)] text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--accent)] hover:underline font-medium">Create one</Link>
          </p>
        </div>

        {/* Bottom glow */}
        <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent mt-6" />
      </div>
    </div>
  );
}
