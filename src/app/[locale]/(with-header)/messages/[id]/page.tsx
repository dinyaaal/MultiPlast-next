"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import ChatTop from "./components/ChatTop";
import ChatBottom from "./components/ChatBottom";
import { toast } from "sonner";
import { IMessageItem } from "@/types/types";
import MessageItem from "@/Components/Messages/MessageItem";
import { getLocale } from "@/utils/locale";

export default function ChatBody({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("Messages");
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const locale = useLocale();

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

  useEffect(() => {
    fetchMessages();
  }, [id, token]);

  // --- группировка сообщений по датам ---
  const groupedMessages = useMemo(() => {
    return messages.reduce((acc: Record<string, IMessageItem[]>, msg) => {
      const date = msg.created_at.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {});
  }, [messages]);

  return (
    <div className="chat__body body-chat">
      <div className="body-chat__content">
        <ChatTop id={id} />
        <div className="body-chat__block block-body-chat">
          <div className="block-body-chat__wrapper">
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
      <ChatBottom id={id} />
    </div>
  );
}
