"use client";

import Sections from "@/components/Forum/components/Sections";
import ForumItems from "./ForumItems";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ForumBody() {
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const t = useTranslations("Forum");

  return (
    <div className="body-forum__container main-container">
      <div className="body-forum__content">
        <Sections onChangeSectionId={setActiveSectionId} />

        <p className="body-forum__text">{t("selectTopic")}</p>
        <ForumItems activeSectionId={activeSectionId} />
      </div>
    </div>
  );
}
