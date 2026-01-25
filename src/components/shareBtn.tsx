"use client";

import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ButtonMain } from "./ButtonMain";

export default function ShareBtn() {
  const t = useTranslations("Toast");

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success(t("link-copied"));
    } catch (error) {
      toast.error(t("link-copy-error"));
    }
  };

  return (
    <ButtonMain
      type="button"
      onPress={handleShareClick}
      color='transparent'
      isIconOnly
    // className="action-btn share "
    >
      <Share2 className="size-8 text-blueColor fill-blueColor" />
    </ButtonMain>
  );
}