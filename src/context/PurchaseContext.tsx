"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface PurchaseContextType {
  purchased: Set<string>;
  isPurchased: (photoId: string) => boolean;
  purchase: (photoId: string) => void;
}

const PurchaseContext = createContext<PurchaseContextType | null>(null);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [purchased, setPurchased] = useState<Set<string>>(new Set());

  // Load purchases for current user
  useEffect(() => {
    if (user) {
      const key = `bf_purchases_${user.uid}`;
      const stored = localStorage.getItem(key);
      setPurchased(new Set(stored ? JSON.parse(stored) : []));
    } else {
      setPurchased(new Set());
    }
  }, [user]);

  const purchase = (photoId: string) => {
    if (!user) return;
    setPurchased((prev) => {
      const next = new Set(prev);
      next.add(photoId);
      localStorage.setItem(`bf_purchases_${user.uid}`, JSON.stringify([...next]));
      return next;
    });
  };

  const isPurchased = (photoId: string) => purchased.has(photoId);

  return (
    <PurchaseContext.Provider value={{ purchased, isPurchased, purchase }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchases() {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error("usePurchases must be used within PurchaseProvider");
  return ctx;
}
