"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-4xl mb-3">🔒</p>
        <h2 className="text-2xl font-bold mb-2">Sign in to continue</h2>
        <p className="text-[var(--text-muted)] mb-6 max-w-sm">
          Create an account or sign in to browse creators and subscribe to exclusive content.
        </p>
        <div className="flex gap-3">
          <Link href="/signup" className="px-6 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition">
            Create Account
          </Link>
          <Link href="/login" className="px-6 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)]/50 transition">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
