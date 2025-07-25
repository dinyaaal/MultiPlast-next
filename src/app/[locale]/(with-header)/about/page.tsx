import Hero from "@/Components/Hero/Hero";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return (
    <>
      {/* <Hero /> */}
      <section className="about">
        <div className="about__container">
          <div className="about__decor about__decor--01">
            <Image
              src="/decor/molecules-01.png"
              alt={t("title")}
              width={1000}
              height={1000}
            />
          </div>
          <h2 className="about__title title">{t("title")}</h2>
          <div className="about__body">
            <div className="about__block">
              <p>
                <strong>Multi Plast</strong> - {t("introText")}
              </p>
            </div>
            <div className="about__block">
              <ol>
                <li>{t("listItem1")}</li>
                <li>{t("listItem2")}</li>
                <li>{t("listItem3")}</li>
              </ol>
            </div>
            <div className="about__block">
              <p>{t("services")}</p>
              <ol>
                <li>{t("servicesItem1")}</li>
                <li>{t("servicesItem2")}</li>
                <li>{t("servicesItem3")}</li>
                <li>{t("servicesItem4")}</li>
              </ol>
              <p>{t("freeServices")}</p>
            </div>
          </div>
          <div className="about__decor about__decor--02">
            <Image
              src="/decor/molecules-02.png"
              alt={t("title")}
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>
    </>
  );
}
