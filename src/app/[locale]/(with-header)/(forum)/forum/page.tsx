import { ForumCategoryMinimal } from "@/types/types";
import ForumTabs from "./components/ForumTabs";

async function fetchForumCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/forum/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // cache: "force-cache",
        next: { revalidate: 86400 },
        // кеш оставляем (по умолчанию cache: 'force-cache')
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    const sorted = [...data.data].sort(
      (a: ForumCategoryMinimal, b: ForumCategoryMinimal) =>
        a.position - b.position
    );

    return sorted;
  } catch (error) {
    console.error("Error fetching forum categories:", error);
    return null;
  }
}

export default async function Page() {
  const categories = await fetchForumCategories();

  return (
    <div className="main-container">
      <ForumTabs categories={categories || []} />
    </div>
  );
}
