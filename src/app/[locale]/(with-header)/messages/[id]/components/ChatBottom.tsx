import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ChatBottom({ id }: { id: string }) {
  const t = useTranslations("Messages");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const token = session?.user.access_token;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/chats/messages/send`, {
        method: "POST",
        body: JSON.stringify({ message_content: message }),
        headers: {
          id: id.toString(),
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Ошибка при создании чата");
      }

      const data = await response.json();
      setMessage("");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(t("toast.sendError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="body-chat__bottom bottom-body-chat"
    >
      <label className="bottom-body-chat__add-file">
        <input type="file" />
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
        <button type="submit" className="message-input__write button">
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
      ></textarea>
      <button
        // type="button"
        // onClick={handleSubmit}
        type="submit"
        className="bottom-body-chat__write button"
      >
        {t("ChatBottom.send")}
      </button>
    </form>
  );
}
