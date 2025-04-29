"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/ClickOutside";

export default function Notifications() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { rootEl } = useClickOutside(setIsOpen);

  const [notificationsCount, setNotificationsCount] = useState(0)

  return (
    <button
      ref={rootEl}
      onClick={toggleMenu}
      className={`header-icon header-icon--notify notifications notifications--desktop ${
        isOpen ? "active" : ""
      }`}
    >
      <div className="header-icon__image">
        <Image src="/icons/bell.svg" alt="Icon" width={100} height={100} />
      </div>
      {!!notificationsCount && <div className="notification-value">
        <span className="notification-value__number">
          {notificationsCount}
        </span>
      </div>}
      <div className="notifications__body body-notifications">
        <div className="body-notifications__items">
          <div className="body-notifications__item item-body-notifications">
            <p className="item-body-notifications__text">
              У продажу знову зʼявилися Гранули Поліпропілена (Аналог А4), для
              ознайомлення перейдіть за посиланням.
            </p>
            <a href="#" className="item-body-notifications__more">
              <span>Детальніше</span>
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696699C14.4645 0.403806 13.9896 0.403806 13.6967 0.696699C13.4038 0.989593 13.4038 1.46447 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM0 6.75H19V5.25H0V6.75Z"
                  fill="#1858B8"
                />
              </svg>
            </a>
          </div>
          <div className="body-notifications__item item-body-notifications">
            <p className="item-body-notifications__text">
              У продажу знову зʼявилися Гранули Поліпропілена (Аналог А4), для
              ознайомлення перейдіть за посиланням.
            </p>
            <a href="#" className="item-body-notifications__more">
              <span>Детальніше</span>
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696699C14.4645 0.403806 13.9896 0.403806 13.6967 0.696699C13.4038 0.989593 13.4038 1.46447 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM0 6.75H19V5.25H0V6.75Z"
                  fill="#1858B8"
                />
              </svg>
            </a>
          </div>
          <div className="body-notifications__item item-body-notifications">
            <p className="item-body-notifications__text">
              У продажу знову зʼявилися Гранули Поліпропілена (Аналог А4), для
              ознайомлення перейдіть за посиланням.
            </p>
            <a href="#" className="item-body-notifications__more">
              <span>Детальніше</span>
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696699C14.4645 0.403806 13.9896 0.403806 13.6967 0.696699C13.4038 0.989593 13.4038 1.46447 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM0 6.75H19V5.25H0V6.75Z"
                  fill="#1858B8"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </button>
  );
}
