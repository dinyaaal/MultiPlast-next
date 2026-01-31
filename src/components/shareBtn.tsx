"use client";

import { Share2, Copy, Check } from "lucide-react"; // Добавили иконки
import { useLocale, useTranslations } from "next-intl";
import { ButtonMain } from "./ButtonMain";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share'
import { usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function ShareBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [copied, setCopied] = useState(false);

  const t = useTranslations("Toast");
  const tShare = useTranslations("Share");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const query = searchParams.toString();
    return `${window.location.origin}/${locale}${pathname}${query ? `?${query}` : ""}`;
  }, [locale, pathname, searchParams, isOpen]); // Добавили isOpen, чтобы URL обновлялся при открытии

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t("link-copied"));

      // Сбрасываем иконку "галочки" через 2 секунды
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error(t("link-copy-error"));
    }
  };

  return (
    <>
      <ButtonMain
        type="button"
        onPress={onOpen}
        color='transparent'
        isIconOnly
      >
        <Share2 className="size-8 text-blueColor fill-blueColor" />
      </ButtonMain>

      <Modal
        size="3xl"
        placement="center"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="max-w-fit!">
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="body-popup-form__top">
                  <h3 className="body-popup-form__title">{tShare("title")}</h3>
                  <p className="body-popup-form__text">{tShare("subtitle")}</p>
                </div>

                <div className="flex w-full flex-col gap-6 py-4">
                  <div className="flex w-full items-center gap-2 p-2 border rounded-xl bg-gray-50/50">
                    <div className="text-sm flex-1 min-w-0 px-2">
                      <p className="truncate text-gray-500">
                        {shareUrl}
                      </p>
                    </div>
                    <ButtonMain
                      onPress={handleCopy}
                      color='primary'
                      isIconOnly
                      className="shrink-0" // Чтобы кнопка никогда не сжималась
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </ButtonMain>
                  </div>


                  {/* Сетка соцсетей */}

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
                    <FacebookShareButton url={shareUrl}><FacebookIcon size={40} round /></FacebookShareButton>
                    <TelegramShareButton url={shareUrl}><TelegramIcon size={40} round /></TelegramShareButton>
                    <ViberShareButton url={shareUrl}><ViberIcon size={40} round /></ViberShareButton>
                    <WhatsappShareButton url={shareUrl}><WhatsappIcon size={40} round /></WhatsappShareButton>
                    <TwitterShareButton url={shareUrl}><TwitterIcon size={40} round /></TwitterShareButton>
                    <LinkedinShareButton url={shareUrl}><LinkedinIcon size={40} round /></LinkedinShareButton>
                  </div>


                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}