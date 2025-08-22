"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Link } from "@/i18n/routing";
import { ChatItemData } from "@/types/types";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Ellipsis } from "lucide-react";

interface ChatItemProps {
  chat: ChatItemData;
  onDelete: (id: number) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, onDelete }) => {
  const { data: session, status } = useSession();
  const formattedDate = new Date(chat.updated_at).toLocaleDateString();
  const [isBlocked, setIsBlocked] = useState<boolean>(
    !!chat.blocked_by_user_id
  );

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
        toast.success("Чат удален!");
        onDelete(chat.id);
      } else {
        throw new Error("Ошибка удаления");
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      toast.error("Ошибка удаления");
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
        toast.success("Пользователь заблокирован");
        setIsBlocked(true);
      } else {
        throw new Error("Не удалось заблокировать пользователя");
      }
    } catch (error) {
      console.error("Не удалось заблокировать пользователя:", error);
      toast.error("Не удалось заблокировать пользователя");
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
        toast.success("Пользователь разблокирован");
        setIsBlocked(false);
      } else {
        throw new Error("Не удалось разблокировать пользователя");
      }
    } catch (error) {
      console.error("Не удалось разблокировать пользователя:", error);
      toast.error("Не удалось разблокировать пользователя");
    }
  };

  return (
    <Link
      href={`/messages/${chat.id}`}
      className="block-chat__item item-block-chat"
    >
      <div className="item-block-chat__message">
        <div className="item-block-chat__image">
          <div className="notification-value">
            <span className="notification-value__number">99</span>
          </div>
        </div>
        <div className="item-block-chat__body">
          <div className="item-block-chat__info">
            <div className="item-block-chat__block">
              <div className="item-block-chat__name">
                {`${chat.to_user.first_name} ${chat.to_user.last_name}`}
              </div>
              <span className="item-block-chat__date">{formattedDate}</span>
            </div>
            <Popover
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
                      onClick={(e) => e.preventDefault()}
                      className="body-actions-menu__item"
                    >
                      Поскаржитися
                    </button>
                    {isBlocked ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleChatUnblock();
                        }}
                        className="body-actions-menu__item"
                      >
                        Разблокувати
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleChatBlock();
                        }}
                        className="body-actions-menu__item"
                      >
                        Заблокувати
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toast("Вы уверены что хотите удалить чат?", {
                          action: {
                            label: "Удалить",
                            onClick: () => handleChatDelete(),
                          },
                        });
                      }}
                      className="body-actions-menu__item body-actions-menu__item--red"
                    >
                      Видалити
                    </button>
                  </menu>
                </div>
              </PopoverContent>
            </Popover>
            {/* <div className="item-block-chat__actions actions-menu">
              <div className="actions-menu__icon">
                <svg
                  width="13"
                  height="3"
                  viewBox="0 0 13 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#0E274D" />
                  <circle cx="6.5" cy="1.5" r="1.5" fill="#0E274D" />
                  <circle cx="11.5" cy="1.5" r="1.5" fill="#0E274D" />
                </svg>
              </div>
              <div className="actions-menu__body body-actions-menu">
                <ul className="body-actions-menu__list">
                  <li className="body-actions-menu__item">
                    <a href="#" className="body-actions-menu__button">
                      Поскаржитися
                    </a>
                  </li>
                  <li className="body-actions-menu__item">
                    <a href="#" className="body-actions-menu__button">
                      Заблокувати
                    </a>
                  </li>
                  <li className="body-actions-menu__item body-actions-menu__item--red">
                    <a href="#" className="body-actions-menu__button">
                      Видалити
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
          <p className="item-block-chat__text">
            Вітаю! Потрібна допомога в здісненні платежу....
          </p>
        </div>
      </div>
    </Link>
  );
};
