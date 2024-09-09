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

export default function ModalContact() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="support-footer__button button">
        <span>Написати нам</span>
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
                <form className="body-popup-form__form form-popup">
                  <div className="form-popup__block">
                    <div className="input-block">
                      <p>Імʼя</p>
                      <input
                        autoComplete="off"
                        type="text"
                        name="form[]"
                        placeholder="Імʼя"
                        className="input"
                      />
                    </div>
                    <div className="input-block">
                      <p>Ваша пошта</p>
                      <input
                        autoComplete="off"
                        type="email"
                        name="form[]"
                        placeholder="Ваша пошта"
                        className="input"
                      />
                    </div>
                    <div className="input-block">
                      <p>Повідомлення</p>
                      <textarea
                        className="input form-popup__textarea"
                        placeholder="Повідомлення"
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
