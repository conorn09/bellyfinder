"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setError("");
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setSubmitting(true);
    const result = await signup(name, email, password, role);
    setSubmitting(false);
    if (result.ok) router.push(role === "creator" ? "/dashboard" : "/creators");
    else setError(result.error ?? "Signup failed.");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/20 blur-[120px] animate-[drift_22s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px] animate-[drift_28s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] left-[15%] w-[250px] h-[250px] rounded-full bg-pink-500/10 blur-[80px] animate-[drift_32s_ease-in-out_infinite]" />
      </div>

      <div className="w-full max-w-2xl animate-[fadeUp_0.6s_ease-out]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-600 mb-4 animate-[pulse_3s_ease-in-out_infinite]">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold">Join BellyFinder</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Choose how you want to use BellyFinder</p>
        </div>

        {/* Role Selection */}
        {!role ? (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Creator Card */}
            <button
              onClick={() => setRole("creator")}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-6 text-left hover:border-[var(--accent)]/50 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center mb-4">
                <span className="text-xl">📸</span>
              </div>
              <h3 className="text-lg font-bold mb-1">I&apos;m a Creator</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">Share your belly content and earn money from subscribers</p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Upload photos & videos</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Set your own prices</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Message your subscribers</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Track your earnings</li>
              </ul>
              <div className="mt-5 py-2 rounded-full border border-[var(--accent)]/30 text-center text-sm text-[var(--accent)] font-medium group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                Sign up as Creator →
              </div>
            </button>

            {/* User Card */}
            <button
              onClick={() => setRole("user")}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-6 text-left hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4">
                <span className="text-xl">👀</span>
              </div>
              <h3 className="text-lg font-bold mb-1">I&apos;m a Subscriber</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">Discover and support your favorite belly creators</p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Browse all creators</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Purchase exclusive content</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Message creators directly</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Save favorites</li>
              </ul>
              <div className="mt-5 py-2 rounded-full border border-purple-500/30 text-center text-sm text-purple-400 font-medium group-hover:bg-purple-500 group-hover:text-white transition-all">
                Sign up as Subscriber →
              </div>
            </button>
          </div>
        ) : (
          /* Registration Form */
          <div className="max-w-sm mx-auto">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 shadow-2xl shadow-[var(--accent)]/5">
              {/* Role badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${role === "creator" ? "bg-gradient-to-br from-[var(--accent)] to-purple-600" : "bg-gradient-to-br from-purple-500 to-blue-600"}`}>
                    {role === "creator" ? "📸" : "👀"}
                  </span>
                  <span className="text-sm font-medium capitalize">{role} Account</span>
                </div>
                <button onClick={() => setRole(null)} className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition">
                  Change →
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-[shake_0.4s_ease-in-out]">
                    {error}
                  </div>
                )}
                <div className="group">
                  <label htmlFor="name" className="block text-sm mb-1.5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition">
                    {role === "creator" ? "Display Name" : "Full Name"}
                  </label>
                  <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all" placeholder={role === "creator" ? "Your creator name" : "Your name"} />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm mb-1.5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition">Email</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all" placeholder="you@example.com" />
                </div>
                <div className="group">
                  <label htmlFor="password" className="block text-sm mb-1.5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition">Password (min 6 characters)</label>
                  <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all" placeholder="••••••••" />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 rounded-xl text-white font-medium transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${
                    role === "creator"
                      ? "bg-gradient-to-r from-[var(--accent)] to-purple-600 hover:from-[var(--accent-hover)] hover:to-purple-700 shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40"
                      : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-purple-500/25 hover:shadow-purple-500/40"
                  }`}
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : `Create ${role === "creator" ? "Creator" : "Subscriber"} Account`}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-xs text-[var(--text-muted)]">or</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <p className="text-sm text-[var(--text-muted)] text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-[var(--accent)] hover:underline font-medium">Sign in</Link>
              </p>
            </div>
            <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent mt-6" />
          </div>
        )}

        {!role && (
          <p className="text-sm text-[var(--text-muted)] text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent)] hover:underline font-medium">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}
