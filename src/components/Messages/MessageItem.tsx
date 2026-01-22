"use client";

import { IMessageItem, Photo } from "@/types/types";
import { stripHtml } from "@/utils/stripHtml";
import  { useMemo, useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

interface MessageItemProps {
  message: IMessageItem;
  isFromUser: boolean;
  avatar: string;
}

export default function MessageItem({
  message,
  isFromUser,
  avatar,
}: MessageItemProps) {
const time = useMemo(() => {
  const date = new Date(message.created_at);
  return isNaN(date.getTime()) 
    ? "--:--" 
    : date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}, [message.created_at]);

  const galleryRef = useRef<any>(null);

  return (
    <div
      className={`body-chat__message-body message-body ${
        isFromUser ? "message-body--right" : "message-body--left"
      }`}
    >
      {!isFromUser && (
        <div className="message-body__user">
          <div className="message-body__image item-block-chat__image">
            {avatar ? (
              <Image src={avatar} width={100} height={100} alt="Image" />
            ) : (
              <div className="account-body-user__icon">
                <Image
                  src={"/icons/user.svg"}
                  width={100}
                  height={100}
                  alt="Image"
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="message-body__content">
  
        {message.files && message.files.length > 0 && (
    <LightGallery
      plugins={[lgZoom]}
      elementClassNames="body-comment__images" // Класс для контейнера с картинками
      speed={500}
    >
      {message.files.map((file, index) => (
        <a
          key={file.id ?? index}
          href={file.url} // Ссылка на полноразмерное фото
          data-src={file.url}
          className="body-comment__image cursor-pointer"
          data-sub-html={`<h4>${stripHtml(message.content)}</h4>`}
        >
          <img src={file.url} alt="Image" className="w-10 h-10" />
          {/* <Image
            src={file.url} // Ссылка на превью
            width={100}
            height={100}
            alt="Image"
          /> */}
        </a>
      ))}
    </LightGallery>
  )}
        <p className="whitespace-pre-wrap">{stripHtml(message.content)}</p>

        <span className="message-body__time">{time}</span>
      </div>
    </div>
  );
}
