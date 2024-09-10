"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rootEl } = useClickOutside(setIsOpen);
  const t = useTranslations("HeaderMenu");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={rootEl}
      onClick={toggleMenu}
      className={`bottom-header__menu menu-bottom-header ${
        isOpen ? "active" : ""
      } `}
    >
      <div className="menu-bottom-header__icon">
        <Image src="/icons/menu.svg" alt="Icon" width={18} height={18} />
      </div>
      <div className="menu-bottom-header__text">{t("menu")}</div>

      <div className="menu-bottom-header__body ">
        <div className="menu-bottom-header__items ">
          <Link href="/about" className="menu-bottom-header__item">
            {t("aboutProject")}
          </Link>
          <Link href="#" className="menu-bottom-header__item">
            {t("userAgreement")}
          </Link>
          <Link href="#" className="menu-bottom-header__item">
            {t("howToSellBuy")}
          </Link>
        </div>
      </div>
    </div>
  );
}
