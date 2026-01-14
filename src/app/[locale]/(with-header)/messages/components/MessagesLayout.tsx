import ChatItems from "@/components/Messages/ChatItems";
import { useTranslations } from "next-intl";
import React, { use } from "react";

export default function MessagesLayout({
  onMessageSend,
  children,
}: {
  onMessageSend?: (payload: { chatId: number; content: string }) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("Messages");
  return (
    <section className="chat">
      <div className="chat__container main-container">
        <div className="chat__wrapper">
          <div className="chat__block block-chat">
            <div className="block-chat__top chat-top">
              <div className="block-chat__title">{t("title")}</div>
            </div>
            <div className="block-chat__content">
              <ChatItems />
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
