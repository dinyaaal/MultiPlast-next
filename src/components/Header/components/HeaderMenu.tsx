"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ButtonMain } from "@/components/ButtonMain";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rootEl } = useClickOutside(setIsOpen);
  const t = useTranslations("HeaderMenu");
  const tNavigation = useTranslations("Navigation");
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div
    //   ref={rootEl}
    //   onClick={toggleMenu}
    //   className={`bottom-header__menu menu-bottom-header ${isOpen ? "active" : ""
    //     } `}
    // >
    <div className={`bottom-header__menu menu-bottom-header ${isOpen ? "active" : ""} `}>
      <ButtonMain ref={rootEl} onPress={toggleMenu} color={'primary'} className={'gap-2.5 w-full!  py-[14px] leading-none px-[5px]'} >
        <div className="menu-bottom-header__icon">
          <Image src="/icons/menu.svg" alt="Icon" width={18} height={18} />
        </div>
        <div className="menu-bottom-header__text">{t("menu")}</div>

      </ButtonMain>
      <div className="menu-bottom-header__body ">
        <div className="menu-bottom-header__items ">
          <Link
            href="/about"
            className={`menu__link menu-bottom-header__item ${pathname === "/about" ? "active" : ""
              }`}
          >
            {tNavigation("aboutProject")}
          </Link>
          <Link
            href="/user-agreement"
            className={`menu__link menu-bottom-header__item ${pathname === "/user-agreement" ? "active" : ""
              }`}
          >
            {tNavigation("userAgreement")}
          </Link>
          <Link
            href="/how-to-trade"
            className={`menu__link menu-bottom-header__item ${pathname === "/how-to-trade" ? "active" : ""
              }`}
          >
            {tNavigation("howToSellBuy")}
          </Link>
          {status === "authenticated" && (
            <>
              <Link
                href="/dashboard/profile"
                className={`menu__link menu-bottom-header__item ${pathname === "/dashboard/profile" ? "active" : ""
                  }`}
              >
                {tNavigation("personalAccount")}
              </Link>

              <Link
                href="/dashboard/add-advertisement"
                className={`menu__link menu-bottom-header__item ${pathname === "/dashboard/add-advertisement" ? "active" : ""
                  }`}
              >
                {tNavigation("addAdvertisement")}
              </Link>
              <Link
                href="/dashboard/my-sell"
                className={`menu__link menu-bottom-header__item ${pathname === "/dashboard/my-sell" ? "active" : ""
                  }`}
              >
                {tNavigation("mySellAds")}
              </Link>
              <Link
                href="/dashboard/my-buy"
                className={`menu__link menu-bottom-header__item ${pathname === "/dashboard/my-buy" ? "active" : ""
                  }`}
              >
                {tNavigation("myBuyAds")}
              </Link>

              <Link
                href="/dashboard/security"
                className={`menu__link menu-bottom-header__item ${pathname === "/dashboard/security" ? "active" : ""
                  }`}
              >
                {tNavigation("changePassword")}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}
