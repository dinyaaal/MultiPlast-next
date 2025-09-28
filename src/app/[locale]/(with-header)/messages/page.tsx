"use client";

import Image from "next/image";
import React from "react";

export default function Messages() {
  return (
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
  );
}
