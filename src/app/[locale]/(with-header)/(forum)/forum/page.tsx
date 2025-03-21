"use client";
import ForumLayout from "@/Components/Forum/components/ForumLayout";
import Sections from "@/Components/Forum/components/Sections";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SelectTabs from "@/Components/Select/SelectTabs";
import Image from "next/image";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { ForumPost, Page } from "@/types/types";
import { ForumCard } from "@/Components/Forum/components/ForumCard";
import ForumItems from "./components/ForumItems";

export default function Forum() {
  const t = useTranslations("Forum");

  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Breadcrumbs position="Форум" />
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
                  onChange={(e) => setSearch(e.target.value)}
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
        <div className="forum__body body-forum">
          {" "}
          <div className="body-forum__container">
            <div className="body-forum__content">
              <Sections />

              <p className="body-forum__text">{t("selectTopic")}</p>
              <ForumItems />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
