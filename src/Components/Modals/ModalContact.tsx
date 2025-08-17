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
import { useTranslations } from "next-intl";
import { ContactFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ModalContact() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations("Modals.proposals");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        toast.success(t("toast.success"));
        reset();
      } else {
        throw new Error(t("toast.error"));
      }
    } catch (error) {
      console.error(t("toast.error"), error);
      toast.error(t("toast.error"));
    }
  };

  return (
    <>
      <button onClick={onOpen} className="support-footer__button button">
        <span>{t("open-modal")}</span>
      </button>

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
                  <h3 className="body-popup-form__title">{t("title")}</h3>
                  <p className="body-popup-form__text">{t("subtitle")}</p>
                </div>
                <form
                  onSubmit={handleSubmit(processForm)}
                  className="body-popup-form__form form-popup"
                >
                  <div className="form-popup__block">
                    <div className="input-block">
                      <p>{t("form.name")}</p>
                      <input
                        type="text"
                        placeholder={t("form.name")}
                        className={`input ${errors.name ? "input--error" : ""}`}
                        {...register("name")}
                      />
                    </div>
                    <div className="input-block">
                      <p>{t("form.email")}</p>
                      <input
                        type="email"
                        placeholder={t("form.email")}
                        className={`input ${
                          errors.email ? "input--error" : ""
                        }`}
                        {...register("email")}
                      />
                    </div>
                    <div className="input-block">
                      <p>{t("form.message")}</p>
                      <textarea
                        className={`input form-popup__textarea ${
                          errors.message ? "input--error" : ""
                        }`}
                        placeholder={t("form.message")}
                        {...register("message")}
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
    </>
  );
}
