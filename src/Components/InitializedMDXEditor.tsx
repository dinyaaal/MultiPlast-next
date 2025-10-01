"use client";

import React, { useCallback, useRef } from "react";
import type { ForwardedRef } from "react";
import {
  listsPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertImage,
  ListsToggle,
  toolbarPlugin,
  Separator,
  imagePlugin,
  BlockTypeSelect,
  linkDialogPlugin,
} from "@mdxeditor/editor";
import { useSession } from "next-auth/react";

type Props = {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps;

/** Извлекает изображения с url и data-file-id */
function extractImages(content: string): { url: string; id?: number }[] {
  const re =
    /<img[^>]*src=(?:"|')([^"']+)(?:"|')[^>]*?(?:data-file-id=(?:"|')(\d+)(?:"|'))?[^>]*>/g;
  const result: { url: string; id?: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    result.push({ url: m[1], id: m[2] ? Number(m[2]) : undefined });
  }
  return result;
}

export default function InitializedMDXEditor({ editorRef, ...props }: Props) {
  const { data: session } = useSession();
  const token = session?.user.access_token;

  // Предыдущие изображения для отслеживания удаления
  const prevImagesRef = useRef<{ url: string; id?: number }[]>([]);
  const fileMapRef = useRef<Map<string, { file: File; id?: number }>>(
    new Map()
  );

  /** Загрузка изображения на сервер с токеном */
  const uploadImage = useCallback(
    async (file: File): Promise<string> => {
      if (!token) throw new Error("Нет токена авторизации");

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Ошибка загрузки изображения: ${res.status} ${text}`);
      }

      const data = await res.json();
      const url = data?.data?.url;
      const id = data?.data?.id;
      if (!url) throw new Error("Нет поля url в ответе сервера");

      // Сохраняем файл и id для возможного удаления
      fileMapRef.current.set(url, { file, id });

      // Возвращаем HTML с data-file-id
      return `<img src="${url}" data-file-id="${id}" alt="${file.name}" />`;
    },
    [token]
  );

  /** Удаление изображения с сервера с токеном */
  const deleteImage = useCallback(
    async (url: string, id?: number) => {
      if (!token) return;

      const entry = fileMapRef.current.get(url);
      const fd = new FormData();
      if (entry?.file) fd.append("file", entry.file);
      fd.append("url", url);
      if (id) fd.append("id", String(id));

      try {
        await fetch("/api/files/delete", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        });

        fileMapRef.current.delete(url);
      } catch (err) {
        console.error("deleteImage failed for", url, err);
      }
    },
    [token]
  );

  // Оборачиваем onChange, чтобы отслеживать удаление изображений
  const userOnChange = (props as MDXEditorProps).onChange as
    | ((value: string) => void)
    | undefined;

  const handleChange = useCallback(
    (value: string) => {
      try {
        const currentImages = extractImages(value);
        const removed = prevImagesRef.current.filter(
          (prev) => !currentImages.find((c) => c.url === prev.url)
        );

        removed.forEach((img) => deleteImage(img.url, img.id));

        prevImagesRef.current = currentImages;
      } catch (err) {
        console.error("Error while handling MDXEditor change:", err);
      }

      if (typeof userOnChange === "function") userOnChange(value);
    },
    [deleteImage, userOnChange]
  );

  return (
    <MDXEditor
      {...props}
      onChange={handleChange}
      ref={editorRef}
      plugins={[
        listsPlugin(),
        imagePlugin({
          imageUploadHandler: uploadImage,
        }),
        linkDialogPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <Separator />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <InsertImage />
            </>
          ),
        }),
      ]}
      contentEditableClassName="description__input"
    />
  );
}
