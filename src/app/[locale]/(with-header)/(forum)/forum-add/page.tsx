import ModalContact from "@/Components/Modals/ModalContact";
import React from "react";

import ForumLayout from "../forum/components/ForumLayout";
import { getTranslations } from "next-intl/server";
import ForumBody from "./components/ForumBody";
import { ForumCategory, ForumCategoryMinimal } from "@/types/types";

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

export default async function ForumAdd() {
  const t = await getTranslations("Forum");
  const categories = await fetchForumCategories();

  if (!categories) {
    return null;
  }

  return (
    <ForumLayout>
      <div className="add-forum">
        <div className="add-forum__container main-container">
          <ForumBody categories={categories} />
          <div className="add-forum__info info-contact">
            <div className="info-contact__body">
              <p className="info-contact__text">{t("contactAdmin")}</p>
              <ModalContact />
            </div>
          </div>
        </div>
      </div>
    </ForumLayout>
  );
}
