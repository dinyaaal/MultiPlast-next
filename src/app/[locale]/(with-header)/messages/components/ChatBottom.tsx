import { Photo } from "@/types/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

interface ChatBottomProps {
  id: string;
  onSend: (message: { text: string; files: Photo[] }) => void;
}

export default function ChatBottom({ id, onSend }: ChatBottomProps) {
  const t = useTranslations("Messages");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const token = session?.user.access_token;
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const tToast = useTranslations("Toast");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const maxSize = 10 * 1024 * 1024; // 10 MB
    const allowedTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "application/pdf",
    ];
    const selectedFiles = Array.from(e.target.files);

    // Проверяем количество файлов
    if (images.length + selectedFiles.length > 10) {
      toast.error(tToast("max-files"));
      e.target.value = "";
      return;
    }

    const filteredFiles = selectedFiles.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(tToast("file-type-error", { file: file.name }));
        return false;
      }
      if (file.size > maxSize) {
        toast.error(tToast("file-size-error", { file: file.name }));
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...filteredFiles]);

    e.target.value = ""; // Чтобы можно было выбрать тот же файл снова
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!message.trim() && images.length === 0) {
      toast.error("Пожалуйста, добавьте текст или изображение.");
      return;
    }

    const formData = new FormData();
    formData.append("message_content", message || "");
    setIsLoading(true);
    images.forEach((image) => {
      formData.append("files[]", image);
    });

    try {
      const response = await fetch(`/api/chats/messages/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
          id: id.toString(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не вдалося надіслати коментар");
      }
      const data = await response.json();
      setMessage("");
      setImages([]);
      onSend({ text: message, files: data.data.files });
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        // onSubmit={handleSubmit}
        className="body-chat__bottom bottom-body-chat flex-col"
      >
        {/* {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            <div className="text-sm text-gray-500">Загруженные файлы:</div>
            <div className="flex flex-wrap gap-2 w-full">
              {uploadedFiles.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className="flex items-center gap-2 border p-2 rounded-2xl border-[#b0bfd7]"
                >
                  {uploadedFile.preview ? (
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <Image
                        src={uploadedFile.preview}
                        alt={uploadedFile.file.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                  ) : (
                    <div className="uploaded-files__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10,9 9,9 8,9" />
                      </svg>
                    </div>
                  )}
                  <button
                    type="button"
                    className="uploaded-files__remove"
                    onClick={() => removeFile(uploadedFile.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )} */}
        <div className="flex flex-col w-full gap-3">
          {images.length > 0 && (
            <div className="chat-input__images flex gap-2 flex-wrap">
              {images.map((file, index) => (
                <div
                  className="chat-input__image-wrapper"
                  key={index}
                  onClick={() => handleRemoveImage(index)}
                >
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="form__bottom w-full flex items-start justify-between gap-8">
            <div className="flex w-full gap-3">
              <label className="bottom-body-chat__add-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M9.84 2.019L3.046 8.57c-.987.952-1.133 2.517-.199 3.516c.951 1.021 2.58 1.106 3.64.19c.034-.03.068-.061.1-.092l5.655-5.452a.484.484 0 0 0 0-.703a.53.53 0 0 0-.729 0L5.92 11.421c-.572.551-1.505.657-2.131.163a1.455 1.455 0 0 1-.118-2.211l6.899-6.651a2.646 2.646 0 0 1 3.644 0a2.422 2.422 0 0 1 0 3.513L7.3 12.901c-1.333 1.285-3.497 1.493-4.95.336c-1.54-1.22-1.764-3.411-.5-4.897a3.33 3.33 0 0 1 .238-.252l5.78-5.572a.484.484 0 0 0 0-.703a.53.53 0 0 0-.73 0l-5.78 5.572a4.36 4.36 0 0 0 0 6.324c2.188 2.109 5.202 1.31 6.66-.095l6.925-6.676a3.39 3.39 0 0 0 0-4.92C13.534.66 11.25.66 9.841 2.019z"
                  />
                </svg>
              </label>
              <div className="bottom-body-chat__message-input message-input input">
                <input
                  autoComplete="off"
                  type="text"
                  placeholder={t("ChatBottom.write")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  disabled={
                    isLoading || (!message.trim() && images.length === 0)
                  }
                  onClick={handleSubmit}
                  className="message-input__write button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M29 3L3 15l12 2.5M29 3L19 29l-4-11.5M29 3L15 17.5"
                    />
                  </svg>
                </button>
              </div>
              <textarea
                placeholder={t("ChatBottom.write")}
                className="bottom-body-chat__message-textarea input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading || (!message.trim() && images.length === 0)}
              // type="button"
              // onClick={handleSubmit}
              onClick={handleSubmit}
              className="bottom-body-chat__write button"
            >
              {t("ChatBottom.send")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
