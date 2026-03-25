import Link from "next/link";
import Image from "next/image";
import type { Photographer } from "@/lib/data";

export default function PhotographerCard({ photographer }: { photographer: Photographer }) {
  return (
    <Link
      href={`/photographer/${photographer.id}`}
      className="group block rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)]/40 p-5 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5"
    >
      <div className="flex items-center gap-4">
        <Image
          src={photographer.avatar}
          alt={photographer.name}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium truncate">{photographer.name}</p>
            {photographer.verified && (
              <span className="text-[var(--accent)] text-xs" title="Verified">✓</span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">@{photographer.username}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-[var(--text-muted)] line-clamp-2">{photographer.bio}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-[var(--text-muted)]">
        <span>⭐ {photographer.rating}</span>
        <span>{photographer.reviewCount} reviews</span>
        <span>{photographer.photoCount} photos</span>
      </div>
    </Link>
  );
}
