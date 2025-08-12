"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rootEl } = useClickOutside(setIsOpen);
  const t = useTranslations("HeaderMenu");
  const tNavigation = useTranslations("Navigation");
  const { data: session, status } = useSession();

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
            {tNavigation("aboutProject")}
          </Link>
          <Link href="#" className="menu-bottom-header__item">
            {tNavigation("userAgreement")}
          </Link>
          <Link href="#" className="menu-bottom-header__item">
            {tNavigation("howToSellBuy")}
          </Link>
          {status === "authenticated" && (
            <>
              <Link
                href="/dashboard/profile"
                className="menu-bottom-header__item"
              >
                {tNavigation("personalAccount")}
              </Link>

              <Link
                href="/add-advertisement"
                className="menu-bottom-header__item"
              >
                {tNavigation("addAdvertisement")}
              </Link>
              <Link
                href="/dashboard/my-sell"
                className="menu-bottom-header__item"
              >
                {tNavigation("mySellAds")}
              </Link>
              <Link
                href="/dashboard/my-buy"
                className="menu-bottom-header__item"
              >
                {tNavigation("myBuyAds")}
              </Link>

              <Link
                href="/dashboard/security"
                className="menu-bottom-header__item"
              >
                {tNavigation("changePassword")}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
