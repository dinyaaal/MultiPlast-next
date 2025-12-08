"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ForumCommentInputProps {
  postId: number;
}

export default function ForumCommentInput({ postId }: ForumCommentInputProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { data: session, status } = useSession();
  const tToast = useTranslations("Toast");
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "30px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
  }, [text]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const newFiles = Array.from(e.target.files);
  //   setImages((prev) => [...prev, ...newFiles]);
  //   e.target.value = ""; // сбрасываем input, чтобы можно было загрузить ту же картинку снова
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const maxSize = 10 * 1024 * 1024; // 10 MB
    const maxFiles = 10;
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "application/pdf",
    ];

    // Проверка на общее количество
    if (images.length + selectedFiles.length > maxFiles) {
      toast.error(tToast("max-files"));
      e.target.value = "";
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    selectedFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(tToast("file-type-error", { file: file.name }));
        invalidFiles.push(file);
        return;
      }

      if (file.size > maxSize) {
        toast.error(tToast("file-size-error", { file: file.name }));
        invalidFiles.push(file);
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
    }

    e.target.value = ""; // сброс input, чтобы можно было загружать те же файлы снова
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!text.trim() && images.length === 0) {
      // toast.error("Пожалуйста, добавьте текст или изображение.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("forum_id", String(postId));

    images.forEach((image) => {
      formData.append("photos[]", image);
    });

    try {
      const response = await fetch(`/api/forum/comments/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не вдалося надіслати коментар");
      }

      setText("");
      setImages([]);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  return (
    <div className="forum-comments__write write-forum-comments">
      <div className="write-forum-comments__block">
        <h3 className="forum-comments__title title--small">
          Написати відповідь
        </h3>

        <div className=" chat-input">
          {/* Превью изображений */}
          {images.length > 0 && (
            <div className="chat-input__images">
              {images.map((file, index) => (
                <div
                  className="chat-input__image-wrapper"
                  key={index}
                  onClick={() => handleRemoveImage(index)}
                >
                  <Image src={URL.createObjectURL(file)} alt="preview" />
                </div>
              ))}
            </div>
          )}
          {/* Текстовая область */}
          <textarea
            ref={textareaRef}
            className="chat-input_input"
            placeholder="Написати..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {/* Загрузка фото */}
          <label className="chat-input__add-file">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M9.84 2.019L3.046 8.57c-.987.952-1.133 2.517-.199 3.516c.951 1.021 2.58 1.106 3.64.19c.034-.03.068-.061.1-.092l5.655-5.452a.484.484 0 0 0 0-.703a.53.53 0 0 0-.729 0L5.92 11.421c-.572.551-1.505.657-2.131.163a1.455 1.455 0 0 1-.118-2.211l6.899-6.651a2.646 2.646 0 0 1 3.644 0a2.422 2.422 0 0 1 0 3.513L7.3 12.901c-1.333 1.285-3.497 1.493-4.95.336c-1.54-1.22-1.764-3.411-.5-4.897a3.33 3.33 0 0 1 .238-.252l5.78-5.572a.484.484 0 0 0 0-.703a.53.53 0 0 0-.73 0l-5.78 5.572a4.36 4.36 0 0 0 0 6.324c2.188 2.109 5.202 1.31 6.66-.095l6.925-6.676a3.39 3.39 0 0 0 0-4.92C13.534.66 11.25.66 9.841 2.019z"
              />
            </svg>
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="write-forum-comments__button button"
        disabled={!(text.trim() || images.length > 0)}
      >
        Надіслати
      </button>
    </div>
  );
}
