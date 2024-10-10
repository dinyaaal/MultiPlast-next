import Select from "@/Components/Select/Select";
import { useTranslations } from "next-intl";
import React from "react";

export default function Sell() {
  const t = useTranslations("Sell");
  return (
    <>
      <div className="advertisement__wrapper wrapper-advertisement">
        <h2 className="wrapper-advertisement__title title title--small">
          {t("fill-ad-title")}
        </h2>
        <div className="wrapper-advertisement__body body-advertisement">
          <div className="body-advertisement__wrapper">
            <div className="body-advertisement__block">
              <div className="input-block">
                <p>{t("select-category")}</p>
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder={t("select-category")}
                />
              </div>
              <div className="input-block">
                <p>{t("select-type")}</p>
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder={t("select-type")}
                />
              </div>
              <div className="input-block">
                <p>{t("select-polymer")}</p>
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder={t("select-polymer")}
                />
              </div>
              <div className="input-block input-block--price">
                <p>{t("price-per-kg")}</p>
                <div className="block-row block-row--nowrap">
                  <div className="input-block">
                    <p>{t("negotiated-price")}</p>
                    <div className="block-row__item">
                      <label className="check">
                        <input
                          type="checkbox"
                          name="remember"
                          className="real-checkbox"
                        />
                        <span className="custom-checkbox"></span>
                        {t("negotiated-price")}
                      </label>
                    </div>
                  </div>
                  <div className="input-block">
                    <p>{t("fixed-price")}</p>
                    <div className="block-row__item">
                      <div className="input-body input">
                        <input
                          autoComplete="off"
                          type="number"
                          placeholder=""
                          className="input-body__input input-number"
                        />
                        <div className="input-body__item">грн</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block-row">
                <div className="block-row__item">
                  <div className="input-block">
                    <p>{t("enter-volume")}</p>
                    <div className="input-body input">
                      <input
                        autoComplete="off"
                        type="number"
                        placeholder=""
                        className="input-body__input input-number"
                      />
                      <div className="input-body__item">кг</div>
                    </div>
                  </div>
                </div>

                <div className="block-row__item">
                  <div className="input-block">
                    <p>{t("enter-price")}</p>
                    <div className="input-body input">
                      <input
                        autoComplete="off"
                        type="number"
                        placeholder=""
                        className="input-body__input input-number"
                      />
                      <div className="input-body__item">грн</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-advertisement__block">
              <div className="input-block input-block-title">
                <p>{t("enter-ad-title")}</p>
                <div className="input-body input-body--title">
                  <input
                    maxLength={150}
                    autoComplete="off"
                    type="text"
                    placeholder={t("enter-ad-title")}
                    className="input"
                  />
                  <div className="input-body__item">{t("max-characters")}</div>
                </div>
              </div>
              <div className="input-block">
                <p>{t("upload-photo")}</p>
                <div className="input-body-file">
                  <label className="input-body-file__input input">
                    <input
                      autoComplete="off"
                      type="file"
                      name=""
                      id="advertisement-photo"
                      data-error="Помилка"
                      placeholder=""
                      className=""
                      accept="image/jpeg, image/png"
                    />
                  </label>
                  <div className="input-body-file__content">
                    <div className="input-body-file__downloads downloads-input-body-file">
                      <div className="downloads-input-body-file__image-box">
                        <div className="downloads-input-body-file__image"></div>
                      </div>
                      <p className="downloads-input-body-file__text">
                        <span>0</span> {t("photos-uploaded")}
                      </p>
                    </div>
                    <div className="input-body-file__actions">
                      <label
                        htmlFor="advertisement-photo"
                        className="input-body-file__button button"
                      >
                        {t("upload")}
                      </label>
                      <button className="input-body-file__delete">
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-advertisement__block">
            <div className="description input-block">
              <p>{t("enter-description")}</p>
              <textarea
                placeholder="Написати..."
                className="description__input input"
              ></textarea>
            </div>
            <div className="input-block">
              <div className="input-body-file">
                <div className="input-body-file__content advertisement-files">
                  <p>{t("upload-files")}</p>
                  <div className="input-body-file__actions">
                    <label className="input-body-file__button button">
                      <input
                        autoComplete="off"
                        id="advertisement-files"
                        type="file"
                        className="advertisement-files__input"
                      />
                      {t("upload")}
                    </label>
                    <button className="input-body-file__delete">
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="advertisement__contact contact-advertisement">
        <h2 className="contact-advertisement__title title title--small">
          {t("contact-details")}
        </h2>
        <div className="contact-advertisement__body">
          <div className="contact-advertisement__content">
            <div className="input-block">
              <p>{t("company-name")}</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>{t("name")}</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>{t("phone")}</p>
              <input
                autoComplete="off"
                type="number"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>{t("address")}</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>{t("city")}</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>{t("region")}</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
          </div>
          <p className="contact-advertisement__text">{t("default-info")}</p>
        </div>
      </div>
      <div className="advertisement__actions actions-advertisement">
        <button className="actions-advertisement__save button">
          {t("save-publish")}
        </button>
        <button className="actions-advertisement__delete button button--secondary">
          {t("delete-ad")}
        </button>
      </div>
    </>
  );
}
