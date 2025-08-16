import Image from "next/image";
import React from "react";
import Swiper from "swiper";
import HeroSwiper from "./components/HeroSwiper";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Hero() {
  const t = useTranslations("Hero");
  const tNavigation = useTranslations("Navigation");

  return (
    <section className="hero">
      <div className="hero__bg">
        <Image src="/hero/bg.jpg" alt="Image" width={1920} height={100} />
      </div>
      <div className="hero__top top-hero">
        <div className="top-hero__container main-container">
          <div className="top-hero__block">
            <h1 className="top-hero__title">multi Plast</h1>
            <div className="top-hero__text">{t("text")}</div>
          </div>
          <Link href="/about" className="top-hero__button button">
            {tNavigation("aboutProject")}
          </Link>
        </div>
      </div>
      <div className="hero__body body-hero">
        <div className="body-hero__container main-container">
          <HeroSwiper />
        </div>
      </div>
    </section>
  );
}
