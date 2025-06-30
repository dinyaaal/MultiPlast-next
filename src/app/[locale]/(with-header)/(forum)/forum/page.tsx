"use client";

import Sections from "@/Components/Forum/components/Sections";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import ForumItems from "./components/ForumItems";
import ForumLayout from "./components/ForumLayout";

export default function Forum() {
  const t = useTranslations("Forum");
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  // const [search, setSearch] = useState<string>("");

  return (
    <>
      <ForumLayout>
        <div className="body-forum__container">
          <div className="body-forum__content">
            <Sections onChangeSectionId={setActiveSectionId} />

            <p className="body-forum__text">{t("selectTopic")}</p>
            <ForumItems activeSectionId={activeSectionId} />
          </div>
        </div>
      </ForumLayout>
    </>
  );
}
