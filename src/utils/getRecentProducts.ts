const COOKIE_NAME = "recentProducts";

export function getRecentProducts(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));

    if (!cookie) return [];

    const parsed = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === "number")
      : [];
  } catch {
    return [];
  }
}
