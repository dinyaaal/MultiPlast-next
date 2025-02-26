"use client";

import ForumLayout from "@/Components/Forum/components/ForumLayout";
import ModalContact from "@/Components/Modals/ModalContact";
import React from "react";
import { useTranslations } from "next-intl";
import Breadcrumbs from "@/Components/Breadcrumbs";
import SelectTabs from "@/Components/Select/SelectTabs";
import Image from "next/image";
import { ForumAddSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type Inputs = z.infer<typeof ForumAddSchema>;

export default function ForumAdd() {
  const t = useTranslations("ForumLayout");
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ForumAddSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token) {
      return;
    }

    const token = session.user.access_token;

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("text", data.text);
    if (data.keywords) {
      formData.append("keywords", data.keywords);
    }

    try {
      const editResponse = await fetch(`/api/forum/add`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });
      if (editResponse.ok) {
        const editResult = await editResponse.json();
        toast.success("Тема добавлена");
      } else {
        throw new Error("Ошибка обновления информации пользователя");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error("Ошибка создания темы");
    }
  };

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
        <div className="forum__body body-forum">
          <div className="add-forum">
            <div className="add-forum__container">
              <form
                onSubmit={handleSubmit(processForm)}
                className="add-forum__block"
              >
                <div className="input-block">
                  <p>{t("enterTitle")}</p>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder={t("titlePlaceholder")}
                    className={` input ${errors.title ? "input--error" : ""}`}
                    {...register("title")}
                  />
                </div>

                <div className="input-block editor">
                  <textarea
                    id="editor"
                    placeholder={t("descriptionPlaceholder")}
                    className={`description__input input ${
                      errors.text ? "input--error" : ""
                    }`}
                    {...register("text")}
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
                      className={` input ${
                        errors.keywords ? "input--error" : ""
                      }`}
                      {...register("keywords")}
                    />
                    <div className="input-body__item">
                      {t("charLimit", { count: 150 })}
                    </div>
                  </div>
                </div>

                <div className="add-forum__actions">
                  <button type="submit" className="add-forum__add button">
                    {t("publish")}
                  </button>
                  {/* <button className="add-forum__delete button button--secondary">
                  {t("delete")}
                </button> */}
                </div>
              </form>
              <div className="add-forum__info info-contact">
                <div className="info-contact__body">
                  <p className="info-contact__text">{t("contactAdmin")}</p>
                  <ModalContact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
