"use client";

import { CommentType } from "@/types/types";
import { Button, Spinner, Textarea } from "@heroui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { ForumComment } from "@/components/Forum/components/ForumComment";
import { useTranslations } from "next-intl";
import { Paperclip, X } from "lucide-react";
import { ButtonMain } from "@/components/ButtonMain";

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

  // 🔹 Подгрузка следующих страниц или скрытие
  // const toggleComments = async () => {
  //   if (isLoading || !lastPage) return;

  //   if (currentPage < lastPage) {
  //     // Подгружаем следующую страницу
  //     const nextPage = currentPage + 1;
  //     const data = await fetchComments(nextPage);

  //     if (data) {
  //       setComments((prev) => [...prev, ...data.data]);
  //       setCurrentPage(nextPage);
  //     }
  //   } else {
  //     // Мгновенное скрытие: оставляем только данные первой страницы
  //     // Предполагаем, что на странице 10 элементов (замените на ваш limit из API)
  //     const ITEMS_PER_PAGE = 10;
  //     setComments((prev) => prev.slice(0, ITEMS_PER_PAGE));
  //     setCurrentPage(1);

  //     // Плавно возвращаем пользователя к началу комментариев
  //     forumCommentsRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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

          <div className="   flex flex-col gap-2 ">
            {/* Превью изображений */}
            {replyData && (
              <div className="chat-input-reply">
                <div className="chat-input-reply__content">
                  <div className="chat-input-reply__name">{replyData.name}</div>
                  <div className="chat-input-reply__text">{replyData.text}</div>
                </div>
                <ButtonMain onPress={(e) => setReplyData(null)} isIconOnly variant="light" color='primary' className="size-10 shrink-0">
                  {/* <Image
                    src="/icons/close.svg"
                    width={20}
                    height={20}
                    alt="Icon"
                  /> */}
                  <X className="size-5 text-black" />
                </ButtonMain>
              </div>
            )}
            <div className="flex gap-2">
              <ButtonMain isIconOnly variant="light" className="size-10 shrink-0">

                <label className="chat-input__add-file">
                  <input
                    type="file"
                    multiple

                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Paperclip className="size-5 text-black" />

                </label>
              </ButtonMain>

              <Textarea
                classNames={{
                  inputWrapper: '!bg-[#F8FBFF] !border !border-border'
                }}
                // ref={textareaRef}
                minRows={3}
                placeholder={tForumPage("write-comment")}
                value={text}
                onChange={(e) => setText(e.target.value)} />
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

        <ButtonMain
          onPress={handleSubmit}
          color='primary'
          className="w-fit"
          size='lg'
          disabled={!(text.trim() || images.length > 0) || isLoadingSubmit}
        >
          {tForumPage("send-comment")}
          {isLoadingSubmit && <Spinner size="sm" />}
        </ButtonMain>
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
        {/* {comments.length > 1 && lastPage && (
          <ButtonMain
            type="button"
            color={'primary'}
            className="mx-auto"
            disabled={isLoading}
            onClick={toggleComments}
          >
            <span>{currentPage < lastPage ? tForumPage("read-more") : tForumPage("hide")}</span>
            {isLoading && <Spinner size="sm" />}
          </ButtonMain>
        )} */}
        {lastPage && lastPage > 1 && (
          <ButtonMain
            type="button"
            color={'primary'}
            className="mx-auto"
            disabled={isLoading}
            onPress={toggleComments} // используем onPress для компонентов HeroUI/NextUI
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <span>
                {currentPage < lastPage
                  ? tForumPage("read-more")
                  : tForumPage("hide")
                }
              </span>
            )}
          </ButtonMain>
        )}
      </div>
    </div>
  );
}
