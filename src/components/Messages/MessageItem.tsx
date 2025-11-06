import { IMessageItem, Photo } from "@/types/types";
import { stripHtml } from "@/utils/stripHtml";
import React, { useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

interface MessageItemProps {
  message: IMessageItem;
  isFromUser: boolean;
}

export default function MessageItem({ message, isFromUser }: MessageItemProps) {
  const time = new Date(message.created_at).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const galleryRef = useRef<any>(null);

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
        <LightGallery
          onInit={(ref) => (galleryRef.current = ref.instance)}
          dynamic
          plugins={[lgZoom]}
          dynamicEl={(message.files || []).map((item: Photo) => ({
            src: item.url,
            thumb: item.url,
            subHtml: `<h4>${stripHtml(message.content)}</h4>`,
          }))}
        />

        <p>{stripHtml(message.content)}</p>

        {message.files && message.files.length > 0 && (
          <div className="body-comment__images" data-popup="#popup-images">
            {message.files.map((file, index) => (
              <div
                key={(file as any).id ?? `${message.id}-${index}`}
                className="body-comment__image cursor-pointer"
              >
                <Image
                  src={file.url}
                  width={100}
                  height={100}
                  alt="Image"
                  onClick={() => galleryRef.current?.openGallery(index)}
                />
              </div>
            ))}
          </div>
        )}
        <span className="message-body__time">{time}</span>
      </div>
    </div>
  );
}
