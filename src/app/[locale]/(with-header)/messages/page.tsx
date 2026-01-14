"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { ChatItemData, IMessageItem, Photo } from "@/types/types";
import MessageItem from "@/components/Messages/MessageItem";
import { getLocale } from "@/utils/locale";

import { Spinner } from "@heroui/react";
import { X } from "lucide-react";
import { Link } from "@/i18n/routing";
import ChatBottom from "./components/ChatBottom";
import ChatTop from "./components/ChatTop";
import { useSearchParams } from "next/navigation";
import ChatItems from "@/components/Messages/ChatItems";

export default function Page() {
  const t = useTranslations("Messages");

  const searchParams = useSearchParams();
  const id = searchParams.get("chatId");
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [chat, setChat] = useState<ChatItemData | null>(null);
  const [isOpenReason, setIsOpenReason] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentMsg, setLastSentMsg] = useState<{
    chatId: number;
    content: string;
    files: Photo[];
  } | null>(null);

  const fetchMessages = async () => {
    if (!token || !id) return;
    try {
      const response = await fetch(`/api/chats/messages/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          id: id.toString(),
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setMessages(data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(t("toast.getError"));
    }
  };

  const fetchChat = async () => {
    if (!token || !id) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/chats/chat`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          id: id.toString(),
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setChat(data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(t("toast.getChatError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
    fetchMessages();
  }, [id, token]);

  const handleSend = (message: { text: string; files: Photo[] }) => {
    if (!session?.user.id) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages[prevMessages.length - 1]?.id + 1 || 1,
        content: message.text,
        files: message.files,
        created_at: new Date().toISOString(),
        from_user_id: session.user.id,
        chat_id: Number(id), // <-- тут исправили
        updated_at: new Date().toISOString(),
        from_user: {
          id: session.user.id,
          first_name: session.user.first_name,
          last_name: session.user.last_name,
          avatar: session.user.avatar,
        },
      },
    ]);
    setLastSentMsg({
      chatId: Number(id),
      content: message.text,
      files: message.files,
    });
    console.log(message);
  };

  // --- группировка сообщений по датам ---
  const groupedMessages = useMemo(() => {
    return messages.reduce((acc: Record<string, IMessageItem[]>, msg) => {
      const date = msg.created_at.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {});
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!token || !id) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/chats/messages/get`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            id: id.toString(),
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const fetchedMessages: IMessageItem[] = data.data || [];

        // Получаем ID последнего сообщения
        const lastFetchedId = fetchedMessages[fetchedMessages.length - 1]?.id;
        const lastCurrentId = messages[messages.length - 1]?.id;

        // Обновляем только если есть новые
        if (lastFetchedId && lastFetchedId !== lastCurrentId) {
          setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error(t("toast.getError"));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [token, id, messages, t]);

  const chatReason = useMemo(() => {
    if (chat?.reason_meta) {
      return chat.reason_meta.type;
    }
    return null;
  }, [chat]);

  const chatReasonLink = useMemo(() => {
    if (!chat?.reasonable) return null;
    if (chatReason === "forum") {
      return `/forum/${chat?.reasonable.id}`;
    }
    return `/products/${chat?.reasonable.id}`;
  }, [chatReason]);

  return (
    <section className="chat">
      <div className="chat__container main-container">
        <div className="chat__wrapper">
          <div className="chat__block block-chat">
            <div className="block-chat__top chat-top">
              <div className="block-chat__title">{t("title")}</div>
            </div>
            <div className="block-chat__content">
              <ChatItems lastMessageUpdate={lastSentMsg} />
            </div>
          </div>
          <>
            {isLoading ? (
              <div className="w-full flex justify-center items-center ">
                <Spinner /> {/* или любой компонент-спиннер */}
              </div>
            ) : chat && id ? (
              <div className="chat__body body-chat">
                <div className="body-chat__content">
                  <ChatTop chat={chat} />
                  <div
                    ref={scrollRef}
                    className="body-chat__block block-body-chat"
                  >
                    <div
                      className={`block-body-chat__wrapper ${
                        isOpenReason ? "!pt-30" : ""
                      }`}
                    >
                      {chat.reasonable && chatReasonLink && isOpenReason && (
                        <div className="block-body-chat__info">
                          <div className="item-block-chat__topic topic-message">
                            <Link
                              href={chatReasonLink}
                              className="topic-message__content"
                            >
                              {chat.reasonable.image && (
                                <div className="topic-message__image">
                                  <Image
                                    src={chat.reasonable.image}
                                    alt="Image"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              )}
                              <div className="topic-message__block">
                                <h4 className="topic-message__title title title--small">
                                  {chat.reasonable.title}
                                </h4>
                                <div className="">
                                  {/* <span>{chat.reasonable.city}</span> -{" "} */}
                                  <span>
                                    {new Date(
                                      chat.reasonable.updated_at
                                    ).toLocaleDateString("uk-UA")}
                                  </span>
                                </div>
                              </div>
                            </Link>
                            <button
                              onClick={() => setIsOpenReason(false)}
                              className="topic-message__close"
                            >
                              <X className="size-full " />
                            </button>
                          </div>
                        </div>
                      )}
                      {Object.entries(groupedMessages).map(([date, msgs]) => (
                        <div key={date} className="block-body-chat__block">
                          {/* Дата */}
                          <div className="block-body-chat__date">
                            {new Date(date).toLocaleDateString(
                              getLocale(locale),
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>

                          {/* Сообщения */}
                          <div className="block-body-chat__content">
                            {msgs.length > 0 ? (
                              msgs.map((m) => (
                                <MessageItem
                                  key={m.id}
                                  message={m}
                                  isFromUser={
                                    m.from_user.id === session?.user.id
                                  }
                                  avatar={m.from_user.avatar}
                                />
                              ))
                            ) : (
                              <p className="text-center text-gray-500">
                                {t("no-messages")}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {id && <ChatBottom id={id} onSend={handleSend} />}
              </div>
            ) : (
              <div className="body-chat-empty">
                <Image
                  className="body-chat-empty__icon"
                  src="/icons/select-mail.svg"
                  alt="Icon"
                  width={140}
                  height={140}
                />
                <p className="body-chat-empty__text">{t("no-chat")}</p>
              </div>
            )}
          </>
        </div>
      </div>
    </section>
  );
}
