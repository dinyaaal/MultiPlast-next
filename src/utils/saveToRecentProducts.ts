const COOKIE_NAME = "recentProducts";
const MAX_ITEMS = 8;
const MAX_AGE = 365 * 24 * 60 * 60;

export function saveToRecentProducts(productId: number) {
  if (typeof window === "undefined") return;

  let recentIds: number[] = [];

  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));

    if (cookie) {
      const parsed = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
      if (Array.isArray(parsed)) {
        recentIds = parsed.filter((id): id is number => typeof id === "number");
      }
    }
  } catch {
    recentIds = [];
  }

  recentIds = recentIds.filter((id) => id !== productId);
  recentIds.unshift(productId);

  if (recentIds.length > MAX_ITEMS) {
    recentIds = recentIds.slice(0, MAX_ITEMS);
  }

  const encoded = encodeURIComponent(JSON.stringify(recentIds));
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${MAX_AGE}`;
}
