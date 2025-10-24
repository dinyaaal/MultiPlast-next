"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { StaticData } from "@/types/types";

export default function About() {
  const t = useTranslations("About");
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
          
          <div className="about__body" dangerouslySetInnerHTML={{ __html: staticData?.value || "" }} />

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
