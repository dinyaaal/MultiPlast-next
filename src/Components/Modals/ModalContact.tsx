"use client";

import React, { useState } from "react";

export default function ModalContact() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="popup-form"
      onClick={toggleModal}
      aria-hidden="true"
      className={`popup-form popup ${isOpen ? "popup_show" : ""}`}
    >
      <div className="popup__wrapper">
        <div className="popup__content">
          <div className="popup-form__body body-popup-form">
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
          </div>
        </div>
      </div>
    </div>
  );
}
