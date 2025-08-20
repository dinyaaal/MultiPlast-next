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
import { Select, SelectItem } from "@heroui/react";
import { ForumCategoryMinimal } from "@/types/types";

type Inputs = z.infer<typeof ForumAddSchema>;

interface ForumBodyProps {
  categories: ForumCategoryMinimal[];
}

export default function ForumBody({ categories }: ForumBodyProps) {
  const t = useTranslations("Forum.forumAdd");
  const { data: session, status } = useSession();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [content, setContent] = useState<string>("");

  const allCategories = [
    {
      id: 0,
      title: "Інше",
    },
    ...categories,
  ];

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

  const changeText = (text: string) => {
    setContent(text);
    setValue("text", text);
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token) {
      return;
    }

    const token = session.user.access_token;

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("text", content);
    formData.append("subject_id", data.category);

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
    <form onSubmit={handleSubmit(processForm)} className="add-forum__block">
      <div className="input-block">
        <p>{t("select-category")}</p>

        <Select
          placeholder={t("select-category")}
          disallowEmptySelection
          classNames={{
            trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
              errors.category ? "outline-[#FF0000] " : "outline-[#B0BFD7]"
            } `,

            popoverContent:
              "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
            listbox: "p-0",
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "min-h-[39px]",
                "px-[15px]",
                "py-[5px]",
                "rounded-none",
                "bg-transparent",
                "transition-colors",

                "data-[hover=true]:bg-[#c4dbff]",
                "data-[selectable=true]:focus:bg-[#c4dbff]",
              ],
            },
          }}
          // defaultSelectedKeys={[advertType]}
          selectedKeys={[watch("category")?.toString() || ""]}
          {...register("category")}
          // onChange={(selectedKey) => handleChangeType(selectedKey)}
        >
          {allCategories.map((category) => (
            <SelectItem key={category.id}>{category.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="input-block">
        <p>{t("enter-title")}</p>
        <input
          autoComplete="off"
          type="text"
          placeholder={t("enter-title")}
          className={` input ${errors.title ? "input--error" : ""}`}
          {...register("title")}
        />
      </div>

      <div className="input-block ">
        <p>{t("enter-description")}</p>
        <div className={`editor ${errors.text ? "editor--error" : ""}`}>
          <ForwardRefEditor
            markdown={content}
            onChange={changeText}
            ref={editorRef}
            placeholder={t("enter-description")}
          />
        </div>
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
        <input type="checkbox" name="incognito" className="real-checkbox" />
        <span className="custom-checkbox"></span>
        {t("incognito")}
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
  );
}
