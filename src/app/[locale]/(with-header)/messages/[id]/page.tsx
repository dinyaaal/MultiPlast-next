"use client";

import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChatBody({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("Messages");
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const { data: session, status } = useSession();
  const token = session?.user.access_token;
  const router = useRouter();
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const handleChatDelete = async () => {
    if (!session?.user.access_token || !id) {
      return;
    }

    try {
      const deleteResponse = await fetch(`/api/chats/delete`, {
        method: "DELETE",
        headers: {
          token: session?.user.access_token,
          id: id.toString(),
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
    if (!session?.user.access_token || !id) {
      return;
    }

    try {
      const blockResponse = await fetch(`/api/chats/block`, {
        method: "POST",
        headers: {
          token: session?.user.access_token,
          id: id.toString(),
        },
      });
      if (blockResponse.ok) {
        toast.success(t("toast.blockSuccess"));
        // setIsBlocked(true);
      } else {
        throw new Error(t("toast.blockError"));
      }
    } catch (error) {
      console.error(t("toast.blockError"), error);
      toast.error(t("toast.blockError"));
    }
  };

  const handleChatUnblock = async () => {
    if (!session?.user.access_token || !id) {
      return;
    }

    try {
      const blockResponse = await fetch(`/api/chats/unblock`, {
        method: "POST",
        headers: {
          token: session?.user.access_token,
          id: id.toString(),
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

  // useEffect(() => {
  //   const socket = io("wss://multiplast.web-hub.online", {
  //     path: "/chat",
  //     transports: ["websocket"],
  //     extraHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   socket.on("connect", () => {
  //     console.log("✅ Подключен к сокету:", socket.id);
  //   });

  //   socket.on(`chat.${id}:App\\Events\\Message`, (data) => {
  //     console.log("📩 Новое сообщение:", data);
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.log("❌ Ошибка подключения:", err.message);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [id, token]);

  return (
    <>
      <div className="chat__body body-chat">
        <div className="body-chat__content">
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
                <div className="user-chat__image item-block-chat__image"></div>
                <div className="user-chat__name">Дмитро Вишнивецький</div>
              </div>
            </div>
            <div className="chat-top__actions-menu actions-menu">
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
                        {t("actions.report")}
                      </button>
                      {isBlocked ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleChatUnblock();
                          }}
                          className="body-actions-menu__item"
                        >
                          {t("actions.unblock")}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleChatBlock();
                          }}
                          className="body-actions-menu__item"
                        >
                          {t("actions.block")}
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
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
              {/* <div className="actions-menu__body body-actions-menu">
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
            </div> */}
            </div>
            <div className="chat-top__actions actions-chat-top">
              <Tooltip
                content={
                  <div className="actions-menu__body body-actions-menu">
                    <menu className="body-actions-menu__list">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="body-actions-menu__item"
                      >
                        Поскаржитися
                      </button>
                    </menu>
                  </div>
                }
                classNames={{
                  content: ["p-0 "],
                }}
              >
                <div className="actions-menu__icon">
                  <Image
                    src="/icons/complain.png"
                    alt="Image"
                    width={100}
                    height={100}
                  />
                </div>
              </Tooltip>
              <Tooltip
                content={
                  <div className="actions-menu__body body-actions-menu">
                    <menu className="body-actions-menu__list">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="body-actions-menu__item"
                      >
                        Заблокувати
                      </button>
                    </menu>
                  </div>
                }
                classNames={{
                  content: ["p-0 "],
                }}
              >
                <div className="actions-menu__icon">
                  <Image
                    src="/icons/ban.png"
                    alt="Image"
                    width={100}
                    height={100}
                  />
                </div>
              </Tooltip>
              <Tooltip
                content={
                  <div className="actions-menu__body body-actions-menu">
                    <menu className="body-actions-menu__list">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="body-actions-menu__item body-actions-menu__item--red"
                      >
                        Видалити
                      </button>
                    </menu>
                  </div>
                }
                classNames={{
                  content: ["p-0 "],
                }}
              >
                <div className="actions-menu__icon">
                  <Image
                    src="/icons/bin.png"
                    alt="Image"
                    width={100}
                    height={100}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="body-chat__block block-body-chat">
            <div className="block-body-chat__wrapper">
              <div className="block-body-chat__block">
                <div className="block-body-chat__info">
                  <div className="block-body-chat__date">5 вересня 2024</div>
                  <div className="item-block-chat__topic topic-message">
                    <div className="topic-message__block">
                      <p className="topic-message__title">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quibusdam dolorum libero odit sed fugit
                        consequatur obcaecati vero repellat eius fuga.
                      </p>
                      <div className="topic-message__user">
                        <p>
                          Контактна особа: <span>Дмитро Вишнивецький</span>
                        </p>
                      </div>
                    </div>
                    <div className="topic-message__image">
                      <Image
                        src="/advert/01.jpg"
                        alt="Image"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="block-body-chat__content">
                  <div className="body-chat__message-body message-body message-body--right">
                    <div className="message-body__content">
                      <p>
                        Вітаю! Мене звати Віталій, так звістно, його можна
                        використовувати для будівництва, достатньо міцний та
                        прозорий. Кольори є різні, але прозорий в наявності є,
                        хочете зробити замовлення?
                      </p>
                      <span className="message-body__time">21:40</span>
                    </div>
                  </div>
                  <div className="body-chat__message-body message-body message-body--left">
                    <div className="message-body__user">
                      <div className="message-body__image item-block-chat__image"></div>
                    </div>
                    <div className="message-body__content">
                      <p>
                        Вітаю! Мене звати Віталій, так звістно, його можна
                        використовувати для будівництва, достатньо міцний та
                        прозорий. Кольори є різні, але прозорий в наявності є,
                        хочете зробити замовлення?
                      </p>
                      <span className="message-body__time">21:40</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-body-chat__block">
                <div className="block-body-chat__date">5 вересня 2024</div>
                <div className="block-body-chat__content">
                  <div className="body-chat__message-body message-body message-body--right">
                    <div className="message-body__content">
                      <p>
                        Вітаю! Мене звати Віталій, так звістно, його можна
                        використовувати для будівництва, достатньо міцний та
                        прозорий. Кольори є різні, але прозорий в наявності є,
                        хочете зробити замовлення?
                      </p>
                      <span className="message-body__time">21:40</span>
                    </div>
                  </div>
                  <div className="body-chat__message-body message-body message-body--left">
                    <div className="message-body__user">
                      <div className="message-body__image item-block-chat__image"></div>
                    </div>
                    <div className="message-body__content">
                      <p>
                        Вітаю! Мене звати Віталій, так звістно, його можна
                        використовувати для будівництва, достатньо міцний та
                        прозорий. Кольори є різні, але прозорий в наявності є,
                        хочете зробити замовлення?
                      </p>
                      <span className="message-body__time">21:40</span>
                    </div>
                  </div>
                  <div className="body-chat__message-body message-body message-body--left">
                    <div className="message-body__user">
                      <div className="message-body__image item-block-chat__image"></div>
                    </div>
                    <div className="message-body__content">
                      <p>
                        Вітаю! Мене звати Віталій, так звістно, його можна
                        використовувати для будівництва, достатньо міцний та
                        прозорий. Кольори є різні, але прозорий в наявності є,
                        хочете зробити замовлення?
                      </p>
                      <span className="message-body__time">21:40</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="body-chat__bottom bottom-body-chat">
          <label className="bottom-body-chat__add-file">
            <input type="file" />
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
          <div className="bottom-body-chat__message-input message-input input">
            <input autoComplete="off" type="text" placeholder="Написати..." />
            <button type="submit" className="message-input__write button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
              >
                <path
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M29 3L3 15l12 2.5M29 3L19 29l-4-11.5M29 3L15 17.5"
                />
              </svg>
            </button>
          </div>
          <textarea
            placeholder="Написати..."
            className="bottom-body-chat__message-textarea input"
          ></textarea>
          <button type="submit" className="bottom-body-chat__write button">
            Надіслати
          </button>
        </div>
      </div>
    </>
  );
}
