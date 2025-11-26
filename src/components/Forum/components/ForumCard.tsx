"use client";

import { Link } from "@/i18n/routing";
import { ForumPost } from "@/types/types";
import { stripHtml } from "@/utils/stripHtml";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface ForumCardProps {
  post: ForumPost;
  small?: boolean;
  onDelete?: (id: number) => void;
}
export const ForumCard: React.FC<ForumCardProps> = ({
  post,
  small = false,
  onDelete,
}) => {
  const t = useTranslations("Forum");
  const { data: session, status } = useSession();

  const handleForumDelete = async () => {
    if (!session?.user.access_token || !post.id) {
      return;
    }

    try {
      const deleteResponse = await fetch(`/api/forum/delete`, {
        method: "DELETE",
        headers: {
          token: session?.user.access_token,
          id: post.id.toString(),
        },
      });
      if (deleteResponse.ok) {
        toast.success(t("toast.delete-success"));
        onDelete?.(post.id);
      } else {
        throw new Error("Delete error");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error(t("toast.delete-error"));
    }
  };

  return (
    <>
      {small ? (
        <Link
          href={`/forum/${post.id}`}
          className="home-forum__item item-forum w-full h-full"
        >
          <div className="item-forum__body w-full h-full">
            <div className="item-forum__block">
              <h4 className="item-forum__title"> {post.title}</h4>
              <p className="item-forum__text">{stripHtml(post.text)}</p>
            </div>
            <button className="item-forum__more">
              <span>Детальніше</span>
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z"
                  fill="#1858B8"
                />
              </svg>
            </button>
          </div>
        </Link>
      ) : (
        <div className="body-forum__item item-forum">
          {session?.user.id === post.author_id && (
            <button
              onClick={() => {
                toast(t("toast.delete-confirm"), {
                  classNames: {
                    actionButton: "bg-red-600 p-4",
                  },
                  action: {
                    label: t("toast.delete-confirm-action"),
                    onClick: () => handleForumDelete(),
                  },
                });
              }}
              className="item-forum__delete"
            >
              <Image src="/icons/bin.svg" alt="Icon" width={100} height={100} />
            </button>
          )}

          <Link href={`/forum/${post.id}`} className="item-forum__body">
            <div className="item-forum__block">
              <h4 className="item-forum__title">
                {/* <span className="text-base text-gray-500">ID: {post.id}</span>{" "} */}
                {post.title}
              </h4>
              <p className="item-forum__text">{stripHtml(post.text)}</p>
            </div>
            <div className="item-forum__block">
              <div className="item-forum__info info-item-forum">
                <div className="info-item-forum__item">
                  <div className="info-item-forum__icon">
                    <Image
                      src="/icons/watch.svg"
                      alt="Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                  <span className="info-item-forum__value">
                    {post.views_count}
                  </span>
                </div>
                <div className="info-item-forum__item">
                  <div className="info-item-forum__icon">
                    <Image
                      src="/icons/comments.svg"
                      alt="Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                  <span className="info-item-forum__value">
                    {post.comments_count}
                  </span>
                </div>
              </div>
              <button className="item-forum__more">
                <span>Читати</span>
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z"
                    fill="#1858B8"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
