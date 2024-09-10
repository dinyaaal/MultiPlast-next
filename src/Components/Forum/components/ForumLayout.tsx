import Breadcrumbs from "@/Components/Breadcrumbs";
import SelectTabs from "@/Components/Select/SelectTabs";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

export default function ForumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("ForumLayout");

  return (
    <>
      <Breadcrumbs position={t("breadcrumbsPosition")} />
      <section className="forum">
        <div className="forum__top top-forum">
          <div className="top-forum__container">
            <div className="top-forum__title title">{t("forumTitle")}</div>
            <div className="top-forum__block">
              <SelectTabs
                options={[
                  { link: "/forum", label: t("forumTab") },
                  { link: "/forum-add", label: t("addTopicTab") },
                ]}
              />

              <div className="top-forum__search search">
                <input
                  autoComplete="off"
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="search__input"
                />
                <button className="search__icon-body">
                  <div className="search__icon">
                    <Image
                      src="/icons/search.svg"
                      alt="Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="forum__body body-forum">{children}</div>
      </section>
    </>
  );
}
