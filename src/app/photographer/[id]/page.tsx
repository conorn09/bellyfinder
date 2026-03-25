"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import PhotoCard from "@/components/PhotoCard";
import { getPhotographer, getPhotosByPhotographer } from "@/lib/data";

export default function PhotographerPage() {
  const { id } = useParams<{ id: string }>();
  const photographer = getPhotographer(id);

  if (!photographer) {
    return <div className="text-center py-20 text-[var(--text-muted)]">Creator not found.</div>;
  }

  const photos = getPhotosByPhotographer(id);

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
          <Image src={photographer.avatar} alt={photographer.name} width={120} height={120} className="rounded-full" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{photographer.name}</h1>
              {photographer.verified && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">Verified</span>
              )}
            </div>
            <p className="text-[var(--text-muted)] mt-1">@{photographer.username} · Joined {photographer.joined}</p>
            <p className="mt-3 max-w-lg text-[var(--text-muted)]">{photographer.bio}</p>
            <div className="mt-4 flex gap-6 text-sm">
              <span>⭐ {photographer.rating} ({photographer.reviewCount} reviews)</span>
              <span>📷 {photographer.photoCount} photos</span>
            </div>
            <button className="mt-4 px-6 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium text-sm transition">
              Subscribe
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">Content by {photographer.name}</h2>
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--text-muted)] py-10 text-center">No content yet.</p>
        )}
      </div>
    </AuthGuard>
  );
}
