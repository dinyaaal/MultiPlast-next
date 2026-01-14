"use client";
import { ChatItemData, Photo } from "@/types/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { ChatItem } from "./ChatItem";
import { useTranslations } from "next-intl";

interface ChatItemsProps {
  lastMessageUpdate?: {
    chatId: number;
    content: string;
    files: Photo[];
  } | null;
}

export default function ChatItems({ lastMessageUpdate }: ChatItemsProps) {
  const t = useTranslations("Messages");
  const { data: session } = useSession();
  const [chats, setChats] = useState<ChatItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = session?.user.access_token;

  useEffect(() => {
    async function fetchChats() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch("/api/chats/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Ошибка при загрузке чатов");
        }

        const data = await res.json();
        setChats(data.data);
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChats();
  }, [token]);

  useEffect(() => {
    if (lastMessageUpdate) {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === lastMessageUpdate.chatId) {
            return {
              ...chat,
              last_message_content: lastMessageUpdate.content,
              last_message_files: lastMessageUpdate.files,
            };
          }
          return chat;
        })
      );
    }
  }, [lastMessageUpdate]);

  const handleDeleteChat = (id: number) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
  };

  if (loading) {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="block-chat__items">
      <div className="block-chat__section">
        <div className="block-chat__section-items">
          {chats.length > 0 ? (
            chats
              .filter((chat) => Number(chat.is_deleted) !== 1)
              .sort(
                (a, b) =>
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
              )
              .map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onDelete={handleDeleteChat}
                />
              ))
          ) : (
            <p className="p-5 text-center self-center">{t("noChats")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
