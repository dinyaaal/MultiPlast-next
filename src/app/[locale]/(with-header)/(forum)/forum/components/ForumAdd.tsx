"use client";

import { ForumCategoryMinimal } from "@/types/types";
import ModalContact from "@/components/Modals/ModalContact";
import ForumBody from "./ForumAddBody";
import { useTranslations } from "next-intl";

interface ForumAddProps {
  categories: ForumCategoryMinimal[];
}

export default function ForumAdd({ categories }: ForumAddProps) {
  const t = useTranslations("Forum");

  return (
    // <ForumLayout>
    <div className="add-forum">
      <div className="add-forum__container main-container">
        <ForumBody categories={categories} />
        <div className="add-forum__info info-contact">
          <div className="info-contact__body">
            <p className="info-contact__text">{t("contactAdmin")}</p>
            <ModalContact />
          </div>
        </div>
      </div>
    </div>
    // </ForumLayout>
  );
}
