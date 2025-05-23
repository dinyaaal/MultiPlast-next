"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Language from "../../Language/Language";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import HeaderUser from "./HeaderUser";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  const t = useTranslations("Header");

  return (
    <div className={`header__menu menu ${isOpen ? "menu-open" : ""} `}>
      <button onClick={toggleMenu} className="btn-icon btn-icon--menu">
        <div className="menu__icon icon-menu">
          <span></span>
        </div>
      </button>
      <nav className="menu__body">
        <div className="menu__wrapper">
          <div className="menu__top">
            <Link
              onClick={closeMenu}
              href="/favorites"
              className="btn-icon btn-icon--favorites"
            >
              <div className="btn-icon__image">
                <Image
                  src="/icons/heart.svg"
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <Language className="language--mobile" />
          </div>
          <ul className="menu__list">
            <li className="menu__item">
              <Link onClick={closeMenu} href="/products" className="menu__link">
                {t("marketplace")}
              </Link>
            </li>
            {status === "authenticated" && (
              <>
                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/dashboard/add-advertisement"
                    className="menu__link"
                  >
                    {t("postAd")}
                  </Link>
                </li>

                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/messages"
                    className="menu__link"
                  >
                    {t("messages")}
                  </Link>
                </li>
              </>
            )}
            <li className="menu__item">
              <Link onClick={closeMenu} href="/forum" className="menu__link">
                {t("forum")}
                <div className="notification-value">
                  <span className="notification-value__number">99</span>
                </div>
              </Link>
            </li>
          </ul>
          <div className="body-header__user user user--mobile">
            <HeaderUser />
          </div>
        </div>
      </nav>
    </div>
  );
}
