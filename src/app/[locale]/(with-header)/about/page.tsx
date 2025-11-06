"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StaticData } from "@/types/types";

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    async function fetchStaticData() {
      const res = await fetch("/api/static", {
        headers: {
          "id": "1",
        },
      });
      const data = await res.json();
      setStaticData(data);
    }
    fetchStaticData();
  }, []);

  const localizedHtml = useMemo(() => {
    if (!staticData) return "";
    const anyData = staticData as any;
    const translations = anyData?.translations as Array<{
      locale: string;
      value: string;
    }> | undefined;

    if (!translations || translations.length === 0) {
      return staticData.value || "";
    }

    // попытка найти перевод по текущему locale, затем fallback на en, затем первый доступный
    const byLocale = translations.find((t) => t.locale === locale);
    const byEn = translations.find((t) => t.locale === "en");
    return (byLocale?.value || byEn?.value || translations[0]?.value || staticData.value || "");
  }, [staticData, locale]);

  return (
    <>
      {/* <Hero /> */}
      <section className="about">
        <div className="about__container main-container text-[#0E274D]">
          <div className="about__decor about__decor--01">
            <Image
              src="/decor/molecules-01.png"
              alt={t("title")}
              width={1000}
              height={1000}
            />
          </div>
          
          <div className="about__body" dangerouslySetInnerHTML={{ __html: localizedHtml }} />

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
