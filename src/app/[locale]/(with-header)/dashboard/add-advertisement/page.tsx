import React from "react";
import Advertisement from "./components/advertisement";

const fetchCategories = async () => {
  const res = await fetch(`https://multiplast.web-hub.online/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    // next: { revalidate: 86400  },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

export default async function SellPage() {
  const categories = await fetchCategories();
  return (
    <>
      <Advertisement categories={categories} />
    </>
  );
}
