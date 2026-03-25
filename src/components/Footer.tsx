import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-[var(--text-muted)]">
        <div>
          <p className="text-[var(--text)] font-semibold mb-3">
            <span className="text-[var(--accent)]">Belly</span>Finder
          </p>
          <p>The premier marketplace for belly photography art.</p>
        </div>
        <div>
          <p className="text-[var(--text)] font-semibold mb-3">Explore</p>
          <ul className="space-y-2">
            <li><Link href="/browse" className="hover:text-[var(--text)] transition">Browse</Link></li>
            <li><Link href="/photographers" className="hover:text-[var(--text)] transition">Photographers</Link></li>
            <li><Link href="/categories" className="hover:text-[var(--text)] transition">Categories</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--text)] font-semibold mb-3">Company</p>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-[var(--text)] transition">About</Link></li>
            <li><Link href="#" className="hover:text-[var(--text)] transition">Blog</Link></li>
            <li><Link href="#" className="hover:text-[var(--text)] transition">Careers</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--text)] font-semibold mb-3">Legal</p>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-[var(--text)] transition">Terms</Link></li>
            <li><Link href="#" className="hover:text-[var(--text)] transition">Privacy</Link></li>
            <li><Link href="#" className="hover:text-[var(--text)] transition">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] text-center text-xs text-[var(--text-muted)] py-6">
        © {new Date().getFullYear()} BellyFinder. All rights reserved.
      </div>
    </footer>
  );
}
