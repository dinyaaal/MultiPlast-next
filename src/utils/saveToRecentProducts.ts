import { MinimalProduct } from "@/types/types";

const COOKIE_NAME = "recentProducts";
const MAX_ITEMS = 8;

export function saveToRecentProducts(product: MinimalProduct) {
  if (typeof document === "undefined") return;

  const cookieValue = getCookie(COOKIE_NAME);
  let recentProducts: MinimalProduct[] = [];

  if (cookieValue) {
    try {
      recentProducts = JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      recentProducts = [];
    }
  }

  // Удаляем дубликаты
  recentProducts = recentProducts.filter((p) => p.id !== product.id);
  recentProducts.unshift(product);

  // Обрезаем до MAX_ITEMS
  if (recentProducts.length > MAX_ITEMS) {
    recentProducts = recentProducts.slice(0, MAX_ITEMS);
  }

  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(recentProducts)
  )}; path=/; expires=${expires.toUTCString()}`;
}

function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}\]\\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}
