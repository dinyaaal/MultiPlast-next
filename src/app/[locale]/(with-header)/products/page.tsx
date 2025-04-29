import React from "react";
import { ProductsBody } from "./components/ProductsBody";
import { getTranslations } from "next-intl/server";

const fetchCategories = async () => {
  const res = await fetch(`https://multiplast.web-hub.online/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

interface ProductsPageProps {
  searchParams: { search?: string };
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const categories = await fetchCategories();
  const t = await getTranslations("Products");

  return (
    <>
      <section className="trade">
        <div className="trade__container">
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

      {/* <Adverts /> */}
    </>
  );
}
