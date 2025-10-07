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
import { useSearchParams } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

type Inputs = z.infer<typeof ForumAddSchema>;

interface ForumBodyProps {
  categories: ForumCategoryMinimal[];
}

export default function ForumBody({ categories }: ForumBodyProps) {
  const t = useTranslations("Forum");
  const { data: session, status } = useSession();
  const token = session?.user.access_token;
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
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
        category: post.categories[0].id.toString() || "",
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

  const onImagesRemoved = (id: string) => {
    setRemovedImageIds((prev) => {
      // если id уже есть — просто вернуть старый массив
      if (prev.includes(id)) return prev;
      // иначе добавить новый id
      return [...prev, id];
    });
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
    if (editId && post) {
      try {
        const forumEditResponse = await fetch(`/api/forum/edit`, {
          method: "POST",
          headers: {
            token: token,
          },
          body: formData,
        });

        if (forumEditResponse.ok) {
          const editResult = await forumEditResponse.json();
          toast.success(t("toast.update-success"));
        } else {
          throw new Error("Ошибка обновления информации пользователя");
        }

        const deleteResponse = await fetch(`/api/files/delete-files`, {
          method: "POST",
          headers: {
            token: token,
          },
          body: JSON.stringify({ file_ids: removedImageIds }), // 👈 сюда сам вставишь нужные данные
        });
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        toast.error(t("toast.update-error"));
      } finally {
        setIsLoadingRequest(false);
      }
    } else {
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
          toast.success(t("toast.create-success"));
        } else {
          throw new Error("Ошибка обновления информации пользователя");
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        toast.error(t("toast.create-error"));
      } finally {
        setIsLoadingRequest(false);
      }
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-10">
        <h3 className="title title--small">{t("forumAdd.auth-required")}</h3>
        <Link href="/login" className="button">
          {t("forumAdd.auth-button")}
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
        <p>{t("forumAdd.select-category")}</p>

        <Select
          placeholder={t("forumAdd.select-category")}
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
        <p>{t("forumAdd.enter-title")}</p>
        <input
          autoComplete="off"
          type="text"
          placeholder={t("forumAdd.enter-title")}
          value={watch("title") || ""}
          className={` input ${errors.title ? "input--error" : ""}`}
          {...register("title")}
        />
      </div>

      <div className="input-block ">
        <p>{t("forumAdd.enter-description")}</p>
        <div
          className={`editor relative ${errors.text ? "editor--error" : ""}`}
        >
          <SimpleEditor
            token={token}
            onChange={changeText}
            initialContent={post?.text}
            onImagesRemoved={onImagesRemoved}
          />
        </div>
      </div>

      <label className="check">
        <input type="checkbox" name="incognito" className="real-checkbox" />
        <span className="custom-checkbox"></span>
        {t("forumAdd.incognito")}
      </label>
      <div className="add-forum__actions">
        <button
          type="submit"
          disabled={isLoadingRequest}
          className="add-forum__add button"
        >
          {t("forumAdd.publish")}
          {isLoadingRequest && <Spinner size="sm" />}
        </button>
      </div>
    </form>
  );
}
