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

export default async function Products() {
  const categories = await fetchCategories();
  const t = await getTranslations("Products");
  return (
    <>
      <section className="trade">
        <div className="trade__container">
          <div className="trade__top">
            <h1 className="trade__title title">{t("title")}</h1>
          </div>
          <ProductsBody categories={categories} />
        </div>
      </section>

      {/* <Adverts /> */}
    </>
  );
}
