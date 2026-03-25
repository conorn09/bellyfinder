"use client";
import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";

interface UploadedPhoto {
  id: string;
  title: string;
  price: number;
  timestamp: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [uploads, setUploads] = useState<UploadedPhoto[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(`bf_uploads_${user?.uid}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [success, setSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !user) return;
    const newPhoto: UploadedPhoto = {
      id: Date.now().toString(),
      title,
      price: parseFloat(price),
      timestamp: Date.now(),
    };
    const updated = [newPhoto, ...uploads];
    setUploads(updated);
    localStorage.setItem(`bf_uploads_${user.uid}`, JSON.stringify(updated));
    setTitle("");
    setPrice("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (user?.role !== "creator") {
    return (
      <AuthGuard>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <p className="text-4xl mb-3">🚫</p>
          <h2 className="text-2xl font-bold mb-2">Creator Access Only</h2>
          <p className="text-[var(--text-muted)]">This dashboard is for creator accounts only.</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-[var(--text-muted)] mb-8">Upload content and manage your profile</p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            ["📸", "Uploads", uploads.length.toString()],
            ["💰", "Earnings", "$0.00"],
            ["👥", "Subscribers", "0"],
          ].map(([icon, label, value]) => (
            <div key={label} className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-5">
              <span className="text-2xl">{icon}</span>
              <p className="text-2xl font-bold mt-2">{value}</p>
              <p className="text-sm text-[var(--text-muted)]">{label}</p>
            </div>
          ))}
        </div>

        {/* Upload Form */}
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Upload New Content</h2>
          {success && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
              Content uploaded successfully!
            </div>
          )}
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="group">
              <label htmlFor="title" className="block text-sm mb-1.5 text-[var(--text-muted)]">Title</label>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all" placeholder="Give your content a title" />
            </div>
            <div className="group">
              <label htmlFor="file" className="block text-sm mb-1.5 text-[var(--text-muted)]">Photo / Video</label>
              <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--accent)]/40 transition cursor-pointer">
                <input id="file" type="file" accept="image/*,video/*" className="hidden" />
                <label htmlFor="file" className="cursor-pointer">
                  <span className="text-3xl block mb-2">📁</span>
                  <p className="text-sm text-[var(--text-muted)]">Click to upload or drag and drop</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">PNG, JPG, MP4 up to 50MB</p>
                </label>
              </div>
            </div>
            <div className="group">
              <label htmlFor="price" className="block text-sm mb-1.5 text-[var(--text-muted)]">Price ($)</label>
              <input id="price" type="number" min="1" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all" placeholder="9.99" />
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-purple-600 hover:from-[var(--accent-hover)] hover:to-purple-700 text-white font-medium transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 hover:scale-[1.02] active:scale-[0.98]">
              Upload Content
            </button>
          </form>
        </div>

        {/* Uploads List */}
        {uploads.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Uploads</h2>
            <div className="space-y-3">
              {uploads.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4">
                  <div>
                    <p className="font-medium">{u.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{new Date(u.timestamp).toLocaleDateString()}</p>
                  </div>
                  <span className="text-sm font-medium text-[var(--accent)]">${u.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
