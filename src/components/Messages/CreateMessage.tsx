"use client";

import { useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ButtonMain } from "../ButtonMain";

interface CreateMessageProps {
  id: number;
  isComment?: boolean;
  reasonId: number;
  isSmall?: boolean;
}

export default function CreateMessage({
  id,
  isComment = false,
  reasonId,
  isSmall = false,
}: CreateMessageProps) {
  const { data: session, status } = useSession();
  const token = session?.user.access_token;
  const router = useRouter();
  const t = useTranslations("Messages.CreateMessage");

  const createMessage = async () => {
    if (!token || status === "unauthenticated") {
      toast(t("toast.auth-required"), {
        classNames: {
          actionButton: "bg-red-600! p-4!",
        },
        action: {
          label: t("toast.auth-button"),
          onClick: () => router.push("/login"),
        },
      });
      return;
    }
    try {
      const response = await fetch(`/api/chats/create`, {
        method: "POST",
        body: JSON.stringify({
          to_user_id: id,
          chat_reason: isComment ? "forum" : "product",
          reason_id: reasonId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Ошибка при создании чата");
      }

      const data = await response.json();
      router.push(`/messages?chatId=${data.data.id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(t("toast.error"));
    }
  };

  if (session?.user.id === id) {
    return;
  }

  return (
    <>
      {isSmall ? (
        <button onClick={createMessage} className="link text-sm">
          {t("createMessage")}
        </button>
      ) : (
        <ButtonMain type="button" onPress={createMessage} color='secondary' variant='bordered' className="">
          {t("createMessage")}
        </ButtonMain>
      )}
    </>
  );
}
