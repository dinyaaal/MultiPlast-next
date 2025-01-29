"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { ContactFormSchema, UserInfoSchema } from "@/lib/schema";
import { setUserInfoData, setUserInfoError } from "@/store/userInfoSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ModalContact() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations("Modals");

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
        toast.success("Мы скоро с вами свяжемся");
        console.log(result);
      } else {
        throw new Error("Ошибка обновления информации пользователя");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error("Ошибка");
    }
  };

  return (
    <>
      <button onClick={onOpen} className="support-footer__button button">
        <span>{t("support")}</span>
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
                  <h3 className="body-popup-form__title">
                    Якщо у Вас є зауваження чи пропозиції, напишіть нам!
                  </h3>
                  <p className="body-popup-form__text">
                    Ми працюємо над тим, щоб Вам було комфортно з нами!
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(processForm)}
                  className="body-popup-form__form form-popup"
                >
                  <div className="form-popup__block">
                    <div className="input-block">
                      <p>Імʼя</p>
                      <input
                        type="text"
                        placeholder="Імʼя"
                        className={`input ${errors.name ? "input--error" : ""}`}
                        {...register("name")}
                      />
                    </div>
                    <div className="input-block">
                      <p>Ваша пошта</p>
                      <input
                        type="email"
                        placeholder="Ваша пошта"
                        className={`input ${
                          errors.email ? "input--error" : ""
                        }`}
                        {...register("email")}
                      />
                    </div>
                    <div className="input-block">
                      <p>Повідомлення</p>
                      <textarea
                        className={`input form-popup__textarea ${
                          errors.message ? "input--error" : ""
                        }`}
                        placeholder="Повідомлення"
                        {...register("message")}
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="form-popup__button button">
                    Надіслати
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
