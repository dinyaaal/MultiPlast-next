import ChatItem from "@/Components/Messages/ChatItem";
import Image from "next/image";
import React from "react";
export default function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="chat">
        <div className="chat__container">
          <div className="chat__wrapper">
            <div className="chat__block block-chat">
              <div className="block-chat__top chat-top">
                <div className="block-chat__title">Повідомлення</div>
              </div>
              <div className="block-chat__content">
                <div className="block-chat__items">
                  <div className="block-chat__section">
                    <div className="block-chat__section-title">Оголошення</div>
                    <div className="block-chat__section-items">
                      <ChatItem />
                      <ChatItem />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat__body body-chat">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
