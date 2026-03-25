"use client";
import Link from "next/link";
import Image from "next/image";
import type { Photo } from "@/lib/data";
import { usePurchases } from "@/context/PurchaseContext";

export default function PhotoCard({ photo }: { photo: Photo }) {
  const { isPurchased } = usePurchases();
  const owned = isPurchased(photo.id);

  return (
    <Link
      href={`/photo/${photo.id}`}
      className="group block rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${owned ? "" : "blur-xl scale-110"}`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {!owned && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
            <span className="text-2xl mb-1">🔒</span>
            <span className="text-white text-xs font-medium">${photo.price} to unlock</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm font-medium truncate">{photo.title}</p>
          <p className="text-white/70 text-xs">{photo.photographerName}</p>
        </div>
        {photo.price > 0 && (
          <span className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
            ${photo.price}
          </span>
        )}
      </div>
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src={photo.photographerAvatar}
            alt={photo.photographerName}
            width={24}
            height={24}
            className="rounded-full shrink-0"
          />
          <span className="text-xs text-[var(--text-muted)] truncate">{photo.photographerName}</span>
        </div>
        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 shrink-0">
          ♥ {photo.likes}
        </span>
      </div>
    </Link>
  );
}
