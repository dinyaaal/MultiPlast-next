"use client";

import ModalContact from "@/Components/Modals/ModalContact";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { ForumAddSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "@/Components/ForwardRefEditor";
import ForumLayout from "../forum/components/ForumLayout";

type Inputs = z.infer<typeof ForumAddSchema>;

export default function ForumAdd() {
  const t = useTranslations("Forum");
  const { data: session, status } = useSession();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [content, setContent] = useState<string>("");

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
    if (content) {
      formData.append("text", content);
    }
    // if (data.keywords) {
    //   formData.append("keywords", data.keywords);
    // }

    try {
      const forumAddResponse = await fetch(`/api/forum/add`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });
      if (forumAddResponse.ok) {
        const editResult = await forumAddResponse.json();
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
    <ForumLayout>
      <div className="add-forum">
        <div className="add-forum__container main-container">
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
              <ForwardRefEditor
                markdown={content}
                onChange={setContent}
                ref={editorRef}
                placeholder={t("descriptionPlaceholder")}
              />
              {/* <button type="button" onClick={(e) => console.log(content)}>
                    otpravit
                  </button> */}
              {/* <textarea
                    id="editor"
                    placeholder={t("descriptionPlaceholder")}
                    className={`description__input input ${
                      errors.text ? "input--error" : ""
                    }`}
                    {...register("text")}
                  ></textarea> */}
            </div>

            <label className="check">
              <input
                type="checkbox"
                name="incognito"
                className="real-checkbox"
              />
              <span className="custom-checkbox"></span>
              Інкогніто
            </label>
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
    </ForumLayout>
  );
}
