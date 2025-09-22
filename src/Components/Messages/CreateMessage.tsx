"use client";

import { useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

interface CreateMessageProps {
  id: number;
}

export default function CreateMessage({ id }: CreateMessageProps) {
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
        body: JSON.stringify({ to_user_id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Ошибка при создании чата");
      }

      const data = await response.json();
      router.push(`/messages/${data.data.id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(t("toast.error"));
    }
  };

  return (
    <button
      onClick={() => {
        createMessage();
      }}
      className="actions-body-product__message button"
    >
      {t("createMessage")}
    </button>
  );
}
