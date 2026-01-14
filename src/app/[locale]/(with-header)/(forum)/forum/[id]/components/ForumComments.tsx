"use client";

import { CommentType } from "@/types/types";
import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { ForumComment } from "@/components/Forum/components/ForumComment";
import { useTranslations } from "next-intl";

interface ForumCommentInputProps {
  postId: number;
}

export default function ForumComments({ postId }: ForumCommentInputProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { data: session, status } = useSession();
  const tToast = useTranslations("Toast");
  const tForumPage = useTranslations("Forum.forumPage");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();
  const forumCommentsRef = useRef<HTMLDivElement>(null);
  const [replyData, setReplyData] = useState<{
    id: number;
    name: string;
    text: string;
  } | null>(null);

  const fetchComments = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/forum/comments/get?forum_id=${postId}&page=${page}`
      );
      if (!res.ok) throw new Error("Ошибка загрузки комментариев");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Перезагрузка комментариев с первой страницы
  const reloadComments = async () => {
    const data = await fetchComments(1);
    if (data) {
      setComments(data.data);
      setCurrentPage(1);
      setLastPage(data.last_page);
    }
  };

  // 🔹 Подгрузка следующих страниц
  const toggleComments = async () => {
    if (!lastPage) return;

    if (currentPage < lastPage) {
      // Подгружаем следующую страницу
      const nextPage = currentPage + 1;
      const data = await fetchComments(nextPage);

      if (data) {
        setComments((prev) => [...prev, ...data.data]);
        setCurrentPage(nextPage);
        setLastPage(data.last_page);
      }
    } else {
      setCurrentPage(1); // сбрасываем страницу
      reloadComments();
    }
  };

  useEffect(() => {
    reloadComments();
  }, [postId]);

  const handleReply = (replyData: {
    id: number;
    name: string;
    text: string;
  }) => {
    setReplyData(replyData); // Присваиваем объект с id
    forumCommentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

    const maxSize = 2 * 1024 * 1024; // 2 MB
    const selectedFiles = Array.from(e.target.files);

    const filteredFiles = selectedFiles.filter((file) => {
      if (file.size > maxSize) {
        toast.error(tToast("file-size-error", { file: file.name, size: 2 }));
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...filteredFiles]);

    e.target.value = ""; // Чтобы можно было выбрать тот же файл снова
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!text.trim() && images.length === 0) {
      // toast.error("Пожалуйста, добавьте текст или изображение.");
      return;
    }
    setIsLoadingSubmit(true);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("forum_id", String(postId));
    if (replyData) {
      formData.append("to_comment_id", String(replyData.id));
      formData.append("comment_id", String(replyData.id));
    }
    images.forEach((image) => {
      formData.append("photos[]", image);
    });

    try {
      const response = await fetch(`/api/forum/comments/add`, {
        method: "POST",
        headers: {
          token: `${session?.user.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не вдалося надіслати коментар");
      }
      setReplyData(null);
      setText("");
      setImages([]);
      // fetchComments();
      await reloadComments();
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="forum-comments" ref={forumCommentsRef}>
      <div className="forum-comments__write write-forum-comments">
        <div className="write-forum-comments__block">
          <h3 className="forum-comments__title title--small">
            {tForumPage("write-comment")}
          </h3>

          <div className=" chat-input">
            {/* Превью изображений */}
            {replyData && (
              <div className="chat-input-reply">
                <div className="chat-input-reply__content">
                  <div className="chat-input-reply__name">{replyData.name}</div>
                  <div className="chat-input-reply__text">{replyData.text}</div>
                </div>
                <button
                  onClick={(e) => setReplyData(null)}
                  className="chat-input-reply__clear"
                >
                  <Image
                    src="/icons/close.svg"
                    width={20}
                    height={20}
                    alt="Icon"
                  />
                </button>
              </div>
            )}
            {/* Текстовая область */}
            <div className="chat-input__input-wrapper">
              <textarea
                ref={textareaRef}
                className="chat-input_input"
                placeholder={tForumPage("write-comment")}
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
            {images.length > 0 && (
              <div className="chat-input__images flex gap-2 flex-wrap">
                {images.map((file, index) => (
                  <div
                    className="chat-input__image-wrapper"
                    key={index}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="write-forum-comments__button button"
          disabled={!(text.trim() || images.length > 0) || isLoadingSubmit}
        >
          {tForumPage("send-comment")}
          {isLoadingSubmit && <Spinner size="sm" />}
        </button>
      </div>
      <div className="forum-comments__body">
        <h3 className="forum-comments__title title--small">
          {tForumPage("discussion")}
        </h3>
        <div className="forum-comments__content">
          {comments.length === 0 ? (
            <div className="forum-comments__empty">
              <p>{tForumPage("no-comments")}</p>
            </div>
          ) : (
            <>
              {comments.map((comment) => (
                <ForumComment
                  postId={postId}
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))}
            </>
          )}
        </div>
        {comments.length > 1 && lastPage && (
          <button
            type="button"
            className="forum-comments__more block__more button"
            disabled={isLoading}
            onClick={toggleComments}
          >
            <span>{currentPage < lastPage ? "Дивитися ще" : "Сховати"}</span>
            {isLoading && <Spinner size="sm" />}
          </button>
        )}
      </div>
    </div>
  );
}
