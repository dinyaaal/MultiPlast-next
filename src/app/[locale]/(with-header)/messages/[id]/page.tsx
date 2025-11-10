"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo, useRef, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import ChatTop from "./components/ChatTop";
import ChatBottom from "./components/ChatBottom";
import { toast } from "sonner";
import { ChatItemData, IMessageItem, Photo, User } from "@/types/types";
import MessageItem from "@/components/Messages/MessageItem";
import { getLocale } from "@/utils/locale";

import { useRouter } from "@/i18n/routing";
import { Spinner } from "@heroui/react";

export default function ChatBody({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const t = useTranslations("Messages");
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [chat, setChat] = useState<ChatItemData | null>(null);

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
    }
  };

  useEffect(() => {
    fetchChat();
    fetchMessages();
  }, [id, token]);

  const handleSend = (message: { text: string, files: Photo[] }) => {
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
        },
      },
    ]);
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

  // useEffect(() => {
  //   if (chat === null) {
  //     router.push("/messages");
  //   }
  // }, [chat, router]);

  // В render просто условно рендерим
  if (chat === null) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    ); // или null
  }

  return (
    <div className="chat__body body-chat">
      <div className="body-chat__content">
        <ChatTop chat={chat} />
        <div ref={scrollRef} className="body-chat__block block-body-chat">
          <div className="block-body-chat__wrapper">
            <div className="block-body-chat__block">
              <div className="block-body-chat__info">
                <div className="block-body-chat__date">5 вересня 2024</div>
                <div className="item-block-chat__topic topic-message">
                  <div className="topic-message__block">
                    <p className="topic-message__title">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quibusdam dolorum libero odit sed fugit consequatur
                      obcaecati vero repellat eius fuga.
                    </p>
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
            </div>
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date} className="block-body-chat__block">
                {/* Дата */}
                <div className="block-body-chat__date">
                  {new Date(date).toLocaleDateString(getLocale(locale), {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                {/* Сообщения */}
                <div className="block-body-chat__content">
                  {msgs.map((m) => (
                    <MessageItem
                      key={m.id}
                      message={m}
                      isFromUser={m.from_user_id === session?.user.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatBottom id={id} onSend={handleSend} />
    </div>
  );
}
