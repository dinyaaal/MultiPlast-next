import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Messages() {
  const t = useTranslations("Messages");
  return (
    <div className="body-chat-empty">
      <Image
        className="body-chat-empty__icon"
        src="/icons/select-mail.svg"
        alt="Icon"
        width={140}
        height={140}
      />
      <p className="body-chat-empty__text">{t("no-messages")}</p>
    </div>
  );
}
