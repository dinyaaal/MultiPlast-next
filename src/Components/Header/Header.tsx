import Image from "next/image";
import React from "react";
import HeaderMenu from "./components/HeaderMenu";
import Notifications from "./components/Notifications";
import BurgerMenu from "./components/BurgerMenu";
import NotificationsMobile from "./components/NotificationsMobile";
import SearchMobile from "./components/SearchMobile";
import Language from "../Language/Language";
import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="header">
      <div className="header__body body-header">
        <div className="body-header__container">
          <div className="body-header__block">
            <Link href="/" className="body-header__logo logo">
              л<span>ого</span>
            </Link>
            <div className="body-header__search search">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="search__input"
              />
              <button className="search__icon-body">
                <div className="search__icon">
                  <Image
                    src="/icons/search.svg"
                    alt="Icon"
                    width={100}
                    height={100}
                  />
                  {/* <img src="img/icons/search.svg" alt="Icon"> */}
                </div>
              </button>
            </div>
          </div>
          <div className="body-header__block body-header__block--actions">
            <div className="body-header__actions actions-body-header">
              <SearchMobile />
              <NotificationsMobile />
              <BurgerMenu />
            </div>

            <Language className="language--desktop" />
            <div className="body-header__user user user--authorized user--desktop">
              <div className="user__login login-user">
                <a
                  href="login.html"
                  className="login-user__link link-login-user login-user__log-in"
                >
                  <div className="link-user__icon">
                    <svg
                      width="11"
                      height="12"
                      viewBox="0 0 11 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.52648 0.872674C7.01193 0.309909 6.29325 0 5.5 0C4.70252 0 3.98146 0.308034 3.46929 0.867316C2.95156 1.43276 2.69931 2.20124 2.75854 3.03105C2.87594 4.66819 4.10574 5.99997 5.5 5.99997C6.89426 5.99997 8.12195 4.66845 8.2412 3.03159C8.30122 2.20927 8.04738 1.4424 7.52648 0.872674ZM10.1537 11.9999H0.846282C0.724456 12.0015 0.603809 11.9756 0.493118 11.924C0.382428 11.8725 0.284478 11.7965 0.206396 11.7018C0.0345253 11.4937 -0.0347517 11.2095 0.016545 10.9221C0.239712 9.66798 0.936183 8.6145 2.03086 7.87495C3.00339 7.21844 4.2353 6.8571 5.5 6.8571C6.7647 6.8571 7.99661 7.21871 8.96914 7.87495C10.0638 8.61424 10.7603 9.66771 10.9835 10.9218C11.0348 11.2092 10.9655 11.4934 10.7936 11.7015C10.7155 11.7963 10.6176 11.8723 10.5069 11.9239C10.3962 11.9755 10.2756 12.0015 10.1537 11.9999Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span>{t("login")}</span>
                </a>
                <a
                  href="registration.html"
                  className="login-user__link link-login-user login-user__registration"
                >
                  <div className="link-user__icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5582 0C6.85646 0.000629007 6.16482 0.167154 5.53975 0.485978C4.91467 0.804802 4.37389 1.26689 3.96155 1.8345C3.54921 2.40212 3.277 3.05917 3.16716 3.75202C3.05731 4.44486 3.11294 5.15386 3.3295 5.82111L0.130046 9.01889C0.0887715 9.06019 0.0560427 9.10922 0.0337291 9.16318C0.0114155 9.21713 -4.57875e-05 9.27495 1.3747e-07 9.33333V11.5556C1.3747e-07 11.6734 0.0468418 11.7865 0.13022 11.8698C0.213599 11.9532 0.326685 12 0.4446 12H2.6676C2.78552 12 2.8986 11.9532 2.98198 11.8698C3.06536 11.7865 3.1122 11.6734 3.1122 11.5556V10.6667H4.0014C4.11932 10.6667 4.2324 10.6198 4.31578 10.5365C4.39916 10.4531 4.446 10.3401 4.446 10.2222V9.33333H5.3352C5.3936 9.33338 5.45144 9.32192 5.50542 9.29962C5.55939 9.27731 5.60844 9.24459 5.64976 9.20333L6.18105 8.67167C6.79211 8.86999 7.43891 8.93358 8.07691 8.85804C8.71491 8.7825 9.32896 8.56964 9.87677 8.23411C10.4246 7.89859 10.8931 7.44836 11.2502 6.91444C11.6072 6.38052 11.8443 5.77558 11.945 5.14129C12.0457 4.507 12.0078 3.85842 11.8337 3.24021C11.6596 2.622 11.3536 2.04885 10.9367 1.56021C10.5197 1.07158 10.0018 0.679083 9.41859 0.409739C8.83536 0.140395 8.20066 0.000607061 7.5582 0ZM8.6697 4.22222C8.49383 4.22222 8.32192 4.17009 8.17569 4.07242C8.02946 3.97475 7.91549 3.83592 7.84819 3.6735C7.78089 3.51107 7.76328 3.33235 7.79759 3.15992C7.8319 2.98749 7.91659 2.82911 8.04094 2.70479C8.1653 2.58048 8.32374 2.49582 8.49623 2.46152C8.66872 2.42723 8.8475 2.44483 9.00998 2.51211C9.17246 2.57938 9.31134 2.69332 9.40904 2.83949C9.50675 2.98567 9.5589 3.15753 9.5589 3.33333C9.5589 3.56908 9.46522 3.79517 9.29846 3.96187C9.1317 4.12857 8.90553 4.22222 8.6697 4.22222Z"
                        fill="#1858B8"
                      />
                    </svg>
                  </div>
                  <span>{t("registration")}</span>
                </a>
              </div>

              <div className="user__body body-user">
                <div className="body-user__account account-body-user">
                  <div className="account-body-user__icon-body">
                    <div className="account-body-user__icon">
                      <Image
                        src="/icons/user.svg"
                        alt="Icon"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="account-body-user__name">Шевченко Тарас</div>
                </div>
                <button className="body-user__exit">{t("logout")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom bottom-header">
        <div className="bottom-header__container">
          <HeaderMenu />

          <ul className="bottom-header__list menu__list">
            <li className="menu__item">
              <Link href="/products" className="menu__link">
                {t("marketplace")}
              </Link>
            </li>
            <li className="menu__item">
              <Link href="/sell" className="menu__link">
                {t("postAd")}
                <div className="main-menu__arrow menu__arrow">
                  <Image
                    src="/icons/dropdown-arrow.svg"
                    alt="Icon"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>

              <ul className="sub-menu__list">
                <li>
                  <Link href="/sell" className="sub-menu__link menu__link">
                    {t("sell")}
                    <div className="sub-menu__arrow menu__arrow">
                      <Image
                        src="/icons/dropdown-arrow.svg"
                        alt="Icon"
                        width={100}
                        height={100}
                      />
                    </div>
                  </Link>

                  <ul className="sub-sub-menu__list">
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("primaryMaterial")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link menu__link">
                        {t("secondaryMaterial")}

                        <div className="sub-sub-menu__arrow menu__arrow">
                          <Image
                            src="/icons/dropdown-arrow.svg"
                            alt="Icon"
                            width={100}
                            height={100}
                          />
                        </div>
                      </a>

                      <ul className="sub-sub-sub-menu__list">
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("granules")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("agglomerate")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("crushedGravel")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("scrapAndWaste")}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("equipment")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("services")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("activeBusiness")}
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/buy" className="sub-menu__link menu__link">
                    {t("buy")}
                    <div className="sub-menu__arrow menu__arrow">
                      <Image
                        src="/icons/dropdown-arrow.svg"
                        alt="Icon"
                        width={100}
                        height={100}
                      />
                    </div>
                  </Link>

                  <ul className="sub-sub-menu__list">
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("primaryMaterial")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link menu__link">
                        {t("secondaryMaterial")}

                        <div className="sub-sub-menu__arrow menu__arrow">
                          <Image
                            src="/icons/dropdown-arrow.svg"
                            alt="Icon"
                            width={100}
                            height={100}
                          />
                        </div>
                      </a>

                      <ul className="sub-sub-sub-menu__list">
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("granules")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("agglomerate")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("crushedGravel")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="sub-menu__link">
                            {t("scrapAndWaste")}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("equipment")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("services")}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="sub-menu__link">
                        {t("activeBusiness")}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="menu__item">
              <Link href="/messages" className="menu__link">
                {t("messages")}
              </Link>
            </li>
            <li className="menu__item">
              <Link href="/forum" className="menu__link">
                {t("forum")}
              </Link>
              <div className="notification-value">
                <span className="notification-value__number">99</span>
              </div>
            </li>
          </ul>

          <div className="bottom-header__actions">
            <Link
              href="/favorites"
              className="header-icon header-icon--favorites"
            >
              <div className="header-icon__image">
                <Image
                  src="/icons/heart.svg"
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <Notifications />
          </div>
        </div>
      </div>
    </header>
  );
}
