import ForumLayout from "@/Components/Forum/components/ForumLayout";
import ModalContact from "@/Components/Modals/ModalContact";
import React from "react";
import { useTranslations } from "next-intl";

export default function ForumAdd() {
  const t = useTranslations("ForumAdd");

  return (
    <>
      <ForumLayout>
        <div className="add-forum">
          <div className="add-forum__container">
            <div className="add-forum__block">
              <div className="input-block">
                <p>{t("enterTitle")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder={t("titlePlaceholder")}
                  className="input"
                />
              </div>

              <div className="input-block editor">
                <textarea
                  id="editor"
                  className="description__input input"
                  placeholder={t("descriptionPlaceholder")}
                ></textarea>
              </div>

              <div className="input-block input-block-title">
                <p>{t("enterKeywords")}</p>
                <div className="input-body input-body--title">
                  <input
                    maxLength={150}
                    autoComplete="off"
                    type="text"
                    placeholder={t("keywordsPlaceholder")}
                    className="input"
                  />
                  <div className="input-body__item">
                    {t("charLimit", { count: 150 })}
                  </div>
                </div>
              </div>

              <div className="add-forum__actions">
                <button className="add-forum__add button">
                  {t("publish")}
                </button>
                <button className="add-forum__delete button button--secondary">
                  {t("delete")}
                </button>
              </div>
            </div>
            <div className="add-forum__info info-contact">
              <div className="info-contact__body">
                <p className="info-contact__text">{t("contactAdmin")}</p>
                <ModalContact />
              </div>
            </div>
          </div>
        </div>
      </ForumLayout>
    </>
  );
}
