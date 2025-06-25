import { MinimalProduct } from "@/types/types";

export function getRecentProducts(): MinimalProduct[] {
  if (typeof document === "undefined") return [];

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("recentProducts="));

  if (!cookie) return [];

  try {
    const value = decodeURIComponent(cookie.split("=")[1]);
    return JSON.parse(value);
  } catch (err) {
    console.error("Ошибка парсинга куки:", err);
    return [];
  }
}
