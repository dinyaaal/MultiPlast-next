"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Link, useRouter } from "@/i18n/routing";
import { ChatItemData } from "@/types/types";
import { stripHtml } from "@/utils/stripHtml";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useDisclosure } from "@heroui/react";
import ReportModal from "./ReportModal";

interface ChatItemProps {
  chat: ChatItemData;
  onDelete: (id: number) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, onDelete }) => {
  const t = useTranslations("Messages");
  const router = useRouter();
  const params = useParams();
  const currentChatId = params?.id;
  const isActive = Number(currentChatId) === chat.id;
  const { data: session, status } = useSession();
  const formattedDate = new Date(chat.updated_at).toLocaleDateString();
  const [isBlocked, setIsBlocked] = useState<boolean>(
    !!chat.blocked_by_user_id
  );
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleChatDelete = async () => {
    if (!session?.user.access_token || !chat.id) {
      return;
    }

    try {
      const deleteResponse = await fetch(`/api/chats/delete`, {
        method: "DELETE",
        headers: {
          token: session?.user.access_token,
          id: chat.id.toString(),
        },
      });
      if (deleteResponse.ok) {
        toast.success(t("toast.deleteSuccess"));
        onDelete(chat.id);
        router.push("/messages");
      } else {
        throw new Error(t("toast.deleteError"));
      }
    } catch (error) {
      console.error(t("toast.deleteError"), error);
      toast.error(t("toast.deleteError"));
    }
  };

  const handleChatBlock = async () => {
    if (!session?.user.access_token || !chat.id) {
      return;
    }

    try {
      const blockResponse = await fetch(`/api/chats/block`, {
        method: "POST",
        headers: {
          token: session?.user.access_token,
          id: chat.id.toString(),
        },
      });
      if (blockResponse.ok) {
        toast.success(t("toast.blockSuccess"));
        setIsBlocked(true);
      } else {
        throw new Error(t("toast.blockError"));
      }
    } catch (error) {
      console.error(t("toast.blockError"), error);
      toast.error(t("toast.blockError"));
    }
  };

  const handleChatUnblock = async () => {
    if (!session?.user.access_token || !chat.id) {
      return;
    }

    try {
      const blockResponse = await fetch(`/api/chats/unblock`, {
        method: "POST",
        headers: {
          token: session?.user.access_token,
          id: chat.id.toString(),
        },
      });
      if (blockResponse.ok) {
        toast.success(t("toast.unblockSuccess"));
        setIsBlocked(false);
      } else {
        throw new Error(t("toast.unblockError"));
      }
    } catch (error) {
      console.error(t("toast.unblockError"), error);
      toast.error(t("toast.unblockError"));
    }
  };

  const lastMsg = chat.last_message;
  const text = chat.last_message_content || lastMsg?.content;
  const files = chat.last_message_files || lastMsg?.files || [];

  const hasText = !!text;
  const hasFiles = files.length > 0;

  const chatUser =
    chat.from_user.id === session?.user.id ? chat.to_user : chat.from_user;

  return (
    <>
      <Link
        href={`/messages?chatId=${chat.id}`}
        className={`block-chat__item item-block-chat ${
          isActive ? "active" : ""
        }`}
      >
        <div className="item-block-chat__message">
          <div className="item-block-chat__image">
            {chatUser?.avatar ? (
              <Image
                src={chatUser.avatar}
                className="ibg"
                alt="Icon"
                width={100}
                height={100}
              />
            ) : (
              <div className="account-body-user__icon">
                <Image
                  src={"/icons/user.svg"}
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
          <div className="item-block-chat__body">
            <div className="item-block-chat__info">
              <div className="item-block-chat__block">
                <div className="item-block-chat__name">
                  {`${chatUser?.first_name} ${chatUser?.last_name}`}
                </div>
                <span className="item-block-chat__date">{formattedDate}</span>
              </div>
              <Popover
                isOpen={isOpenPopover}
                onOpenChange={(open) => setIsOpenPopover(open)}
                placement="bottom-end"
                className="item-block-chat__actions actions-menu"
                classNames={{
                  content: ["p-0"],
                }}
              >
                <PopoverTrigger>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="actions-menu__icon"
                  >
                    <Ellipsis />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="actions-menu__body body-actions-menu">
                    <menu className="body-actions-menu__list">
                      <button
                        type="button"
                        onClick={(e) => {
                          // e.preventDefault();
                          setIsOpenPopover(false);
                          onOpen();
                        }}
                        className="body-actions-menu__item"
                      >
                        {t("actions.report")}
                      </button>
                      {isBlocked ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsOpenPopover(false);
                            handleChatUnblock();
                          }}
                          className="body-actions-menu__item"
                        >
                          {t("actions.unblock")}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsOpenPopover(false);
                            handleChatBlock();
                          }}
                          className="body-actions-menu__item"
                        >
                          {t("actions.block")}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpenPopover(false);
                          toast(t("toast.deleteConfirm"), {
                            action: {
                              label: t("toast.delete"),
                              onClick: () => handleChatDelete(),
                            },
                          });
                        }}
                        className="body-actions-menu__item body-actions-menu__item--red"
                      >
                        {t("actions.delete")}
                      </button>
                    </menu>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {/* {hasContent && (
              <p className="item-block-chat__text whitespace-pre-wrap line-clamp-1">
                {lastMessageContent
                  ? stripHtml(lastMessageContent)
                  : t("noMessage")}
              </p>
            )} */}
            <div className="flex items-center gap-1">
              {/* 2. Если есть файлы — показываем снизу (или вместо текста) */}
              {hasFiles && (
                <div
                  className={`chat-item__files-preview flex items-center gap-1 `}
                >
                  {/* Маленькая иконка или первая картинка */}
                  <div className="relative w-6 h-6 rounded overflow-hidden border border-gray-200">
                    <Image
                      src={files[0].url}
                      alt="attachment"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Если файлов больше одного, пишем +X */}
                  {!hasText && (
                    <span className="text-xs text-gray-500">
                      {files.length > 1
                        ? `Фото (+${files.length - 1})`
                        : "Фото"}
                    </span>
                  )}
                </div>
              )}
              {hasText && (
                <p className="item-block-chat__text whitespace-pre-wrap line-clamp-1">
                  {stripHtml(text)}
                </p>
              )}

              {/* 3. Если вообще ничего нет */}
              {!hasText && !hasFiles && (
                <p className="item-block-chat__text whitespace-pre-wrap line-clamp-1">
                  {t("noMessage")}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <ReportModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={chat.id.toString()}
      />
    </>
  );
};
