"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import PhotoCard from "@/components/PhotoCard";
import { usePurchases } from "@/context/PurchaseContext";
import { getPhoto, getPhotosByPhotographer, getPhotographer } from "@/lib/data";

export default function PhotoPage() {
  const { id } = useParams<{ id: string }>();
  const { isPurchased, purchase } = usePurchases();
  const photo = getPhoto(id);

  if (!photo) {
    return <div className="text-center py-20 text-[var(--text-muted)]">Photo not found.</div>;
  }

  const owned = isPurchased(photo.id);
  const photographer = getPhotographer(photo.photographerId);
  const morePhotos = getPhotosByPhotographer(photo.photographerId).filter((p) => p.id !== id).slice(0, 4);

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image — blurred until purchased */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-card)]">
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              className={`object-cover transition-all duration-500 ${owned ? "" : "blur-2xl scale-110"}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {!owned && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                <span className="text-5xl mb-3">🔒</span>
                <p className="text-white font-semibold text-lg">Content Locked</p>
                <p className="text-white/60 text-sm mt-1">Purchase to view full image</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-[var(--accent)] font-medium mb-2 capitalize">{photo.category.replace("-", " ")}</p>
            <h1 className="text-3xl font-bold">{photo.title}</h1>
            <p className="mt-3 text-[var(--text-muted)]">{photo.description}</p>

            {photographer && (
              <Link href={`/photographer/${photographer.id}`} className="mt-6 flex items-center gap-3 group">
                <Image src={photographer.avatar} alt={photographer.name} width={44} height={44} className="rounded-full" />
                <div>
                  <p className="font-medium group-hover:text-[var(--accent)] transition">
                    {photographer.name}
                    {photographer.verified && <span className="text-[var(--accent)] ml-1 text-xs">✓</span>}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">⭐ {photographer.rating} · {photographer.reviewCount} reviews</p>
                </div>
              </Link>
            )}

            <div className="mt-8 p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
              {owned ? (
                <div className="text-center py-2">
                  <span className="text-green-400 font-medium">✓ Purchased</span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">You own this photo</p>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">${photo.price}</span>
                    <span className="text-sm text-[var(--text-muted)]">one-time purchase</span>
                  </div>
                  <button
                    onClick={() => purchase(photo.id)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-600 hover:from-[var(--accent-hover)] hover:to-purple-700 text-white font-medium transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Purchase Photo — ${photo.price}
                  </button>
                </>
              )}
              <button className="w-full mt-3 py-3 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition text-sm">
                ♥ Add to Favorites
              </button>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-[var(--text-muted)]">
              <span>♥ {photo.likes} likes</span>
            </div>
          </div>
        </div>

        {morePhotos.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6">More from {photo.photographerName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {morePhotos.map((p) => (
                <PhotoCard key={p.id} photo={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AuthGuard>
  );
}
