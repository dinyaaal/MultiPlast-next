import React from "react";
import { ProductsBody } from "./components/ProductsBody";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsClient } from "@/Components/Breadcrumbs";
import AdvertsWatched from "@/Components/Products/AdvertsWatched";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const fetchCategories = async () => {
  const res = await fetch(
    `https://multiplast-api.web-hub.online/api/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

interface ProductsPageProps {
  searchParams: { search?: string };
}

export default async function Products(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const categories = await fetchCategories();
  const t = await getTranslations("Products");
  const tb = await getTranslations("Breadcrumbs");

  const crumbs = [{ label: tb("home"), href: "/" }, { label: tb("products") }];
  return (
    <>
      <BreadcrumbsClient items={crumbs} />

      <section className="trade">
        <div className="trade__container main-container">
          <div className="trade__top">
            <h1 className="trade__title title">
              {searchParams?.search
                ? "Поиск по: " + searchParams.search
                : t("title")}
            </h1>
          </div>
          <ProductsBody categories={categories} />
        </div>
      </section>
      <AdvertsWatched />
    </>
  );
}
