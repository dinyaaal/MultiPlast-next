import { MinimalProduct } from "@/types/types";

const STORAGE_KEY = "recentProducts";
const MAX_ITEMS = 8;

export function saveToRecentProducts(product: MinimalProduct) {
  // Важно для Next.js
  if (typeof window === "undefined") return;

  let recentProducts: MinimalProduct[] = [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      recentProducts = JSON.parse(stored);
    }
  } catch {
    recentProducts = [];
  }

  // Удаляем дубликаты
  recentProducts = recentProducts.filter((p) => p.id !== product.id);

  // Добавляем в начало
  recentProducts.unshift(product);

  // Ограничиваем количество
  if (recentProducts.length > MAX_ITEMS) {
    recentProducts = recentProducts.slice(0, MAX_ITEMS);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentProducts));
}
