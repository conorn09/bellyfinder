"use client";
import AuthGuard from "@/components/AuthGuard";
import PhotographerCard from "@/components/PhotographerCard";
import { photographers } from "@/lib/data";

export default function CreatorsPage() {
  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Creators</h1>
        <p className="text-[var(--text-muted)] mb-8">Find and subscribe to your favorite belly creators</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photographers.map((p) => (
            <PhotographerCard key={p.id} photographer={p} />
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
