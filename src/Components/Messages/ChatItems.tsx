"use client";
import { ChatItemData } from "@/types/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { ChatItem } from "./ChatItem";

export default function ChatItems() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<ChatItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения чатов
  async function fetchChats() {
    if (!session?.user.access_token) return;
    try {
      const res = await fetch(`/api/chats/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Ошибка загрузки чатов");
      }
      const data = await res.json();
      setChats(data.data);
    } catch (err) {
      setError("Не удалось загрузить чаты");
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteChat = (id: number) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
  };

  useEffect(() => {
    if (session?.user.access_token) {
      fetchChats();
    }
  }, [session?.user.access_token]);

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
        <div className="block-chat__section-title">Оголошення</div>
        <div className="block-chat__section-items">
          {chats.length > 0 ? (
            chats
              .filter((chat) => chat.is_deleted !== 1)
              .map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onDelete={handleDeleteChat}
                />
              ))
          ) : (
            <p>Нет чатов для отображения</p>
          )}
        </div>
      </div>
    </div>
  );
}
