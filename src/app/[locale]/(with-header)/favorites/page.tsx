import React from "react";
import FavoritesBody from "./components/FavoritesBody";
import AdvertsWatched from "@/Components/Products/AdvertsWatched";
import { getTranslations } from "next-intl/server";

export default async function Favorite() {
  const t = await getTranslations("Favorites");
  return (
    <>
      <section className="favorite">
        <div className="favorite__container main-container">
          <div className="favorite__top">
            <h1 className="favorite__title title">{t("title")}</h1>
          </div>
          <FavoritesBody />
        </div>
      </section>
      <AdvertsWatched />
      {/* <Adverts /> */}
    </>
  );
}
