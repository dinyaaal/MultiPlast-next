"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Language from "../../Language/Language";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import HeaderUser from "./HeaderUser";
import { useClickOutside } from "@/hooks/ClickOutside";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const { rootEl } = useClickOutside(setIsOpen);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      document.body.classList.add("burger-menu-open");
    } else {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("burger-menu-open");
    }
  }, [isOpen]);

  const tNavigation = useTranslations("Navigation");

  return (
    <div
      ref={rootEl}
      className={`header__menu menu ${isOpen ? "menu-open" : ""} `}
    >
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
              <Link
                onClick={closeMenu}
                href="/products"
                className={`menu__link ${
                  pathname === "/products" ? "active" : ""
                }`}
              >
                {tNavigation("marketplace")}
              </Link>
            </li>

            {status === "authenticated" && (
              <>
                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/dashboard/profile"
                    className={`menu__link  ${
                      pathname === "/dashboard/profile" ? "active" : ""
                    }`}
                  >
                    {tNavigation("personalAccount")}
                  </Link>
                </li>
                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/messages"
                    className={`menu__link ${
                      pathname === "/messages" ? "active" : ""
                    }`}
                  >
                    {tNavigation("myMessages")}
                  </Link>
                </li>

                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/dashboard/add-advertisement"
                    className={`menu__link ${
                      pathname === "/dashboard/add-advertisement"
                        ? "active"
                        : ""
                    }`}
                  >
                    {tNavigation("addAdvertisement")}
                  </Link>
                </li>
                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/dashboard/my-sell"
                    className={`menu__link ${
                      pathname === "/dashboard/my-sell" ? "active" : ""
                    }`}
                  >
                    {tNavigation("mySellAds")}
                  </Link>
                </li>
                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/dashboard/my-buy"
                    className={`menu__link ${
                      pathname === "/dashboard/my-buy" ? "active" : ""
                    }`}
                  >
                    {tNavigation("myBuyAds")}
                  </Link>
                </li>

                <li className="menu__item">
                  <Link
                    onClick={closeMenu}
                    href="/dashboard/security"
                    className={`menu__link ${
                      pathname === "/dashboard/security" ? "active" : ""
                    }`}
                  >
                    {tNavigation("changePassword")}
                  </Link>
                </li>
              </>
            )}

            <li className="menu__item">
              <Link
                onClick={closeMenu}
                href="/forum"
                className={`menu__link ${
                  pathname === "/forum" ? "active" : ""
                }`}
              >
                {tNavigation("forum")}
              </Link>
            </li>
            <li className="menu__item">
              <Link
                onClick={closeMenu}
                href="/about"
                className={`menu__link ${
                  pathname === "/about" ? "active" : ""
                }`}
              >
                {tNavigation("aboutProject")}
              </Link>
            </li>
            <li className="menu__item">
              <Link
                onClick={closeMenu}
                href="/user-agreement"
                className={`menu__link ${
                  pathname === "/user-agreement" ? "active" : ""
                }`}
              >
                {tNavigation("userAgreement")}
              </Link>
            </li>
            <li className="menu__item">
              <Link
                onClick={closeMenu}
                href="/how-to-trade"
                className={`menu__link ${
                  pathname === "/how-to-trade" ? "active" : ""
                }`}
              >
                {tNavigation("howToSellBuy")}
              </Link>
            </li>
          </ul>
          <div
            onClick={closeMenu}
            className="body-header__user user user--mobile"
          >
            <HeaderUser />
          </div>
        </div>
      </nav>
    </div>
  );
}
