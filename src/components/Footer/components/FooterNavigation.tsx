"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useSession } from "next-auth/react";

export default function FooterNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations("Footer");
  const tNavigation = useTranslations("Navigation");
  return (
    <>
      <div className="footer__menu menu-footer">
        <div className="menu-footer__title">{t("informationPages")}</div>
        <ul className="menu-footer__items">
          <li className="menu-footer__item">
            <Link
              href="/about"
              className={`menu__link ${pathname === "/about" ? "active" : ""}`}
            >
              {tNavigation("aboutProject")}
            </Link>
          </li>
          <li className="menu-footer__item">
            <Link
              href="/user-agreement"
              className={`menu__link ${
                pathname === "/user-agreement" ? "active" : ""
              }`}
            >
              {tNavigation("userAgreement")}
            </Link>
          </li>

          <li className="menu-footer__item">
            <Link
              href="/how-to-trade"
              className={`menu__link ${
                pathname === "/how-to-trade" ? "active" : ""
              }`}
            >
              {tNavigation("howToSellBuy")}
            </Link>
          </li>
          <li className="menu-footer__item">
            <Link
              href="/privacy-policy"
              className={`menu__link ${
                pathname === "/privacy-policy" ? "active" : ""
              }`}
            >
              {tNavigation("privacyPolicy")}
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__menu menu-footer">
        <div className="menu-footer__title">{t("forClients")}</div>
        <ul className="menu-footer__items">
          <li className="menu-footer__item">
            <Link
              href="/"
              className={`menu__link ${pathname === "/" ? "active" : ""}`}
            >
              {tNavigation("home")}
            </Link>
          </li>
          <li className="menu-footer__item">
            <Link
              href="/forum"
              className={`menu__link ${pathname === "/forum" ? "active" : ""}`}
            >
              {tNavigation("forum")}
            </Link>
          </li>
          <li className="menu-footer__item">
            <Link
              href="/products"
              className={`menu__link ${
                pathname === "/products" ? "active" : ""
              }`}
            >
              {tNavigation("marketplace")}
            </Link>
          </li>
          {session && (
            <>
              <li className="menu-footer__item">
                <Link
                  href="/messages"
                  className={`menu__link ${
                    pathname === "/messages" ? "active" : ""
                  }`}
                >
                  {tNavigation("myMessages")}
                </Link>
              </li>
              <li className="menu-footer__item">
                <Link
                  href="/dashboard/add-advertisement"
                  className={`menu__link ${
                    pathname === "/dashboard/add-advertisement" ? "active" : ""
                  }`}
                >
                  {tNavigation("addAdvertisement")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
