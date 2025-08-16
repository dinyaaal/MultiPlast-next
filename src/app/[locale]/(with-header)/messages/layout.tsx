import ChatItems from "@/Components/Messages/ChatItems";
import React from "react";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="chat">
      <div className="chat__container main-container">
        <div className="chat__wrapper">
          <div className="chat__block block-chat">
            <div className="block-chat__top chat-top">
              <div className="block-chat__title">Повідомлення</div>
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
