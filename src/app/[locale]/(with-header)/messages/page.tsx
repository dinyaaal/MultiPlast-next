"use client";

import { socket } from "@/lib/socket";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Message {
  message_content: string;
  from_user: {
    id: number;
    name: string;
  };
  chat_id: number;
}

export default function Messages({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const chatId = 7;

  // Пример текущего пользователя — ты можешь передать его через props или контекст
  const currentUser = {
    id: 1,
    name: "User1",
  };

  useEffect(() => {
    const eventName = "App\\Events\\Message";

    const handleMessage = (message: Message) => {
      if (message.chat_id === chatId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on(eventName, handleMessage);

    return () => {
      socket.off(eventName, handleMessage);
    };
  }, [chatId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message: Message = {
      message_content: input,
      from_user: currentUser,
      chat_id: chatId,
    };

    socket.emit("App\\Events\\Message", message);
    setInput("");
  };

  return (
    <div className="chat__body body-chat">
      {messages.length === 0 ? (
        <div className="body-chat-empty">
          <Image
            className="body-chat-empty__icon"
            src="/icons/select-mail.svg"
            alt="Icon"
            width={140}
            height={140}
          />
          <p className="body-chat-empty__text">Повідомлення не обрано</p>
        </div>
      ) : (
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className="chat-message">
              <strong>{msg.from_user.name}:</strong> {msg.message_content}
            </div>
          ))}
        </div>
      )}

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
