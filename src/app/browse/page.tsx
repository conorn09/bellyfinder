"use client";
import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import PhotoCard from "@/components/PhotoCard";
import { photos, categories } from "@/lib/data";

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  let filtered = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  if (sortBy === "popular") filtered = [...filtered].sort((a, b) => b.likes - a.likes);
  else if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "newest") filtered = [...filtered].reverse();

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Browse</h1>
        <p className="text-[var(--text-muted)] mb-8">Explore belly content by category</p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                activeCategory === "all"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)]/40"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  activeCategory === cat.id
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)]/40"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm"
            aria-label="Sort photos"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--text-muted)] py-20">No photos found in this category.</p>
        )}
      </div>
    </AuthGuard>
  );
}
