"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">Belly</span>Finder
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link href="/browse" className="hover:text-[var(--accent)] transition">Browse</Link>
              <Link href="/creators" className="hover:text-[var(--accent)] transition">Creators</Link>
              <Link href="/categories" className="hover:text-[var(--accent)] transition">Categories</Link>
              <span className="text-[var(--text-muted)]">Hi, {user.name.split(" ")[0]}</span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-sm transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[var(--accent)] transition">Sign In</Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3 text-sm">
          {user ? (
            <>
              <Link href="/browse" onClick={() => setMenuOpen(false)}>Browse</Link>
              <Link href="/creators" onClick={() => setMenuOpen(false)}>Creators</Link>
              <Link href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left text-[var(--text-muted)]">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-full bg-[var(--accent)] text-white text-center font-medium">Create Account</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
