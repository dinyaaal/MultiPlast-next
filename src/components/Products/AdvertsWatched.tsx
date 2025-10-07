"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import { MinimalProduct } from "@/types/types";
import { getRecentProducts } from "@/utils/getRecentProducts";
import { useTranslations } from "next-intl";

import AdvertsSwiper from "./components/AdvertsSwiper";

export default function AdvertsWatched() {
  const [recent, setRecent] = useState<MinimalProduct[]>([]);
  const t = useTranslations("Adverts.recentlyWatched");

  useEffect(() => {
    const data = getRecentProducts();
    setRecent(data);
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="adverts">
      <div className="adverts__container main-container">
        <div className="adverts__top">
          <h2 className="adverts__title title">{t("title")}</h2>
        </div>
        <AdvertsSwiper adverts={recent} />
      </div>
    </section>
  );
}
