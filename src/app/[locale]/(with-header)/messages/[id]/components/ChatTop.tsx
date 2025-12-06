"use client";
import { useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@heroui/react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Ban, Ellipsis, Trash, TriangleAlert } from "lucide-react";
import { ChatItemData } from "@/types/types";
import Image from "next/image";
import ReportModal from "@/components/Messages/ReportModal";

export default function ChatTop({ chat }: { chat: ChatItemData }) {
  const t = useTranslations("Messages");
  const { data: session } = useSession();
  const router = useRouter();
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
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
        router.push("/messages");
        // onDelete(chat.id);
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
        // setIsBlocked(false);
      } else {
        throw new Error(t("toast.unblockError"));
      }
    } catch (error) {
      console.error(t("toast.unblockError"), error);
      toast.error(t("toast.unblockError"));
    }
  };

  return (
    <>
      <div className="body-chat__top chat-top">
        <div className="chat-top__block">
          <Link href="/messages" className="chat-top__back">
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM1 6.75H2V5.25H1V6.75Z"
                fill="#0E274D"
              />
            </svg>
          </Link>
          <div className="chat-top__user user-chat">
            <div className="user-chat__image item-block-chat__image">
              {chat?.user?.avatar ? (
                <Image
                  src={chat.user.avatar}
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

            <div className="user-chat__name">
              {chat.user?.first_name} {chat.user?.last_name}
            </div>
          </div>
        </div>
        <div className="chat-top__actions-menu actions-menu">
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
                        setIsOpenPopover(false);
                        handleChatUnblock();
                        e.preventDefault();
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
        <menu className="chat-top__actions actions-chat-top">
          <Tooltip
            content={
              <div className="actions-menu__body body-actions-menu">
                <div className="body-actions-menu__list">
                  <div
                    // onClick={(e) => e.preventDefault()}
                    className="body-actions-menu__item"
                  >
                    {t("actions.report")}
                  </div>
                </div>
              </div>
            }
            classNames={{
              content: ["p-0 "],
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpen();
              }}
              className="actions-menu__icon"
            >
              <TriangleAlert />
            </button>
          </Tooltip>
          {isBlocked ? (
            <Tooltip
              content={
                <div className="actions-menu__body body-actions-menu">
                  <div className="body-actions-menu__list">
                    <div className="body-actions-menu__item">
                      {t("actions.unblock")}
                    </div>
                  </div>
                </div>
              }
              classNames={{
                content: ["p-0 "],
              }}
            >
              <button
                type="button"
                onClick={(e) => handleChatUnblock()}
                className="actions-menu__icon"
              >
                {/* <Image
                src="/icons/ban.png"
                alt="Image"
                width={100}
                height={100}
              /> */}
                <Ban />
              </button>
            </Tooltip>
          ) : (
            <Tooltip
              content={
                <div className="actions-menu__body body-actions-menu">
                  <div className="body-actions-menu__list">
                    <div className="body-actions-menu__item">
                      {t("actions.block")}
                    </div>
                  </div>
                </div>
              }
              classNames={{
                content: ["p-0 "],
              }}
            >
              <button
                type="button"
                onClick={(e) => handleChatBlock()}
                className="actions-menu__icon"
              >
                <Ban />
              </button>
            </Tooltip>
          )}

          <Tooltip
            content={
              <div className="actions-menu__body body-actions-menu">
                <div className="body-actions-menu__list">
                  <div className="body-actions-menu__item body-actions-menu__item--red">
                    {t("actions.delete")}
                  </div>
                </div>
              </div>
            }
            classNames={{
              content: ["p-0 "],
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toast(t("toast.deleteConfirm"), {
                  action: {
                    label: t("toast.delete"),
                    onClick: () => handleChatDelete(),
                  },
                });
              }}
              className="actions-menu__icon"
            >
              <Trash className="text-red-700" />
            </button>
          </Tooltip>
        </menu>
      </div>
      <ReportModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={chat.id.toString()}
      />
    </>
  );
}
