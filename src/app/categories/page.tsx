"use client";
import Image from "next/image";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-[var(--text-muted)] mb-8">Explore belly content by type</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/browse?category=${cat.id}`}
              className="group relative rounded-xl overflow-hidden aspect-video"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white text-xl font-bold">{cat.name}</p>
                <p className="text-white/60 text-sm mt-1">{cat.description}</p>
                <p className="text-white/50 text-xs mt-2">{cat.count} photos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
