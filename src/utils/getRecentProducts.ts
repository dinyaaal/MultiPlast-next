// utils/getRecentProducts.ts
import { MinimalProduct } from "@/types/types";

const STORAGE_KEY = "recentProducts";

export function getRecentProducts(): MinimalProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
