import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/20 blur-[140px] animate-[drift_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-[drift_25s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] right-[25%] w-[350px] h-[350px] rounded-full bg-pink-500/15 blur-[100px] animate-[drift_30s_ease-in-out_infinite]" />
        <div className="absolute bottom-[30%] left-[20%] w-[250px] h-[250px] rounded-full bg-rose-400/10 blur-[80px] animate-[drift_22s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Hero */}
      <div className="max-w-xl text-center animate-[fadeUp_0.6s_ease-out]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-sm mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          Now open for creators & subscribers
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          The Home for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-pink-400 to-purple-500 animate-[fadeUp_0.8s_ease-out]">
            Belly
          </span>{" "}
          Content
        </h1>

        <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed animate-[fadeUp_1s_ease-out]">
          Subscribe to your favorite belly creators. Share exclusive content.
          Join the community.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-[fadeUp_1.2s_ease-out]">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-600 hover:from-[var(--accent-hover)] hover:to-purple-700 text-white font-medium transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 hover:scale-[1.03] active:scale-[0.98] text-center"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)]/50 bg-[var(--bg-card)]/50 backdrop-blur-sm transition-all hover:scale-[1.03] active:scale-[0.98] text-center"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-20 flex items-center gap-8 md:gap-14 text-center animate-[fadeUp_1.4s_ease-out]">
        {[
          ["2.5K+", "Creators"],
          ["50K+", "Subscribers"],
          ["12", "Categories"],
        ].map(([value, label]) => (
          <div key={label} className="group">
            <p className="text-2xl font-bold group-hover:text-[var(--accent)] transition-colors">{value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-6 animate-[fadeUp_1.6s_ease-out]">
        {[
          ["🆓", "Free to join"],
          ["🔒", "Secure payments"],
          ["❌", "Cancel anytime"],
        ].map(([icon, text]) => (
          <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)]/50 border border-[var(--border)] backdrop-blur-sm text-sm text-[var(--text-muted)]">
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
    </div>
  );
}
