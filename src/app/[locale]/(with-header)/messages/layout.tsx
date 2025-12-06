import ChatItems from "@/components/Messages/ChatItems";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Messages");
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
