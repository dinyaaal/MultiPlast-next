import { IMessageItem } from "@/types/types";

import React from "react";

interface MessageItemProps {
  message: IMessageItem;
  isFromUser: boolean;
}

export default function MessageItem({ message, isFromUser }: MessageItemProps) {
  const time = new Date(message.created_at).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`body-chat__message-body message-body ${
        isFromUser ? "message-body--right" : "message-body--left"
      }`}
    >
      {!isFromUser && (
        <div className="message-body__user">
          <div className="message-body__image item-block-chat__image"></div>
        </div>
      )}
      <div className="message-body__content">
        <p>{message.content}</p>
        <span className="message-body__time">{time}</span>
      </div>
    </div>
  );
}
