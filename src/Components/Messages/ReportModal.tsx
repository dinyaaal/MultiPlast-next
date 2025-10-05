"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { ReportFormSchema } from "@/lib/schema";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

interface ReportModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  id: string;
}

type Inputs = z.infer<typeof ReportFormSchema>;

export default function ReportModal({
  isOpen,
  onOpenChange,
  id,
}: ReportModalProps) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations("Messages.Report");
  const { data: session } = useSession();
  const token = session?.user.access_token;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ReportFormSchema),
  });

  const processForm =
    (onClose: () => void): SubmitHandler<Inputs> =>
    async (data) => {
      try {
        const response = await fetch(`/api/chats/report`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id.toString(),
          },
        });
        if (response.ok) {
          toast.success(t("toast.success"));
          reset();
          onClose(); // ✅ закрываем модалку
        } else {
          throw new Error(t("toast.error"));
        }
      } catch (error) {
        console.error(t("toast.error"), error);
        toast.error(t("toast.error"));
      }
    };

  return (
    <Modal
      size="3xl"
      placement="center"
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <div className="body-popup-form__top">
                <h3 className="body-popup-form__title">{t("report")}</h3>
              </div>
              <form
                onSubmit={handleSubmit(processForm(onClose))}
                className="body-popup-form__form form-popup"
              >
                <div className="form-popup__block">
                  <div className="input-block">
                    <p>{t("form.report-reason")}</p>
                    <textarea
                      className={`input form-popup__textarea ${
                        errors.text ? "input--error" : ""
                      }`}
                      placeholder={t("form.report-reason")}
                      {...register("text")}
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="form-popup__button button">
                  {t("form.send")}
                </button>
              </form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
