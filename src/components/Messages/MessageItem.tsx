"use client";

import { IMessageItem, Photo } from "@/types/types";
import { stripHtml } from "@/utils/stripHtml";
import { useMemo, useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import { FileText, FileSpreadsheet, FileArchive, File } from "lucide-react";

interface MessageItemProps {
  message: IMessageItem;
  isFromUser: boolean;
  avatar: string;
}

function getFileIcon(mimeType: string) {
  if (mimeType === "application/pdf") return <FileText className="w-6 h-6 shrink-0 text-red-500" />;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType.includes("csv"))
    return <FileSpreadsheet className="w-6 h-6 shrink-0 text-green-600" />;
  if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("archive"))
    return <FileArchive className="w-6 h-6 shrink-0 text-yellow-600" />;
  return <File className="w-6 h-6 shrink-0 text-blue-500" />;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

  const imageFiles = useMemo(
    () => (message.files ?? []).filter((f) => f.mime_type?.startsWith("image/")),
    [message.files]
  );
  const documentFiles = useMemo(
    () => (message.files ?? []).filter((f) => !f.mime_type?.startsWith("image/")),
    [message.files]
  );

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
        {imageFiles.length > 0 && (
          <LightGallery
            plugins={[lgZoom]}
            elementClassNames="body-comment__images"
            speed={500}
          >
            {imageFiles.map((file, index) => (
              <a
                key={file.id ?? index}
                href={file.url}
                data-src={file.url}
                className="body-comment__image cursor-pointer"
                data-sub-html={`<h4>${stripHtml(message.content)}</h4>`}
              >
                <img src={file.url} alt="Image" className="w-10 h-10" />
              </a>
            ))}
          </LightGallery>
        )}

        {documentFiles.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            {documentFiles.map((file, index) => (
              <a
                key={file.id ?? index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download={file.name}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 transition-colors max-w-[260px]"
              >
                {getFileIcon(file.mime_type)}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate leading-tight text-gray-800">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="whitespace-pre-wrap">{stripHtml(message.content)}</p>
        <span className="message-body__time">{time}</span>
      </div>
    </div>
  );
}
