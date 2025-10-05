"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { ForumAddSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Select, SelectItem, Spinner } from "@heroui/react";
import { ForumCategoryMinimal, ForumPost } from "@/types/types";
import { Link } from "@/i18n/routing";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useSearchParams } from "next/navigation";

type Inputs = z.infer<typeof ForumAddSchema>;

interface ForumBodyProps {
  categories: ForumCategoryMinimal[];
}

export default function ForumBody({ categories }: ForumBodyProps) {
  const t = useTranslations("Forum.forumAdd");
  const { data: session, status } = useSession();
  const token = session?.user.access_token;
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [post, setPost] = useState<ForumPost | null>(null);

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

  const fetchPost = async () => {
    if (!editId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/forum/post?id=${editId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();

      setPost(data);
    } catch (err) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [editId]);

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        text: post.text || "",
      });
    }
  }, [post, reset]);

  const changeText = (text: string) => {
    setContent(text);
    setValue("text", text);
    console.log(text);
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token) {
      return;
    }
    setIsLoadingRequest(true);
    const token = session.user.access_token;

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("text", content);
    formData.append("subject_id", data.category);

    // if (data.keywords) {
    //   formData.append("keywords", data.keywords);
    // }

    console.log(formData);

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
    } finally {
      setIsLoadingRequest(false);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-10">
        <h3 className="title title--small">
          Для створення теми, необхідно авторизуватися
        </h3>
        <Link href="/login" className="button">
          Авторизуватися
        </Link>
      </div>
    );
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

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
          {categories.map((category) => (
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
          value={watch("title") || ""}
          className={` input ${errors.title ? "input--error" : ""}`}
          {...register("title")}
        />
      </div>

      <div className="input-block ">
        <p>{t("enter-description")}</p>
        <div
          className={`editor relative ${errors.text ? "editor--error" : ""}`}
        >
          {/* <ForwardRefEditor
            markdown={content}
            onChange={changeText}
            ref={editorRef}
            placeholder={t("enter-description")}
          /> */}
          <SimpleEditor
            token={token}
            onChange={changeText}
            initialContent={post?.text}
          />
        </div>
      </div>

      <label className="check">
        <input type="checkbox" name="incognito" className="real-checkbox" />
        <span className="custom-checkbox"></span>
        {t("incognito")}
      </label>
      <div className="add-forum__actions">
        <button
          type="submit"
          disabled={isLoadingRequest}
          className="add-forum__add button"
        >
          {t("publish")}
          {isLoadingRequest && <Spinner size="sm" />}
        </button>
        {/* <button className="add-forum__delete button button--secondary">
                  {t("delete")}
                </button> */}
      </div>
    </form>
  );
}
