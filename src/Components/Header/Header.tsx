import Image from "next/image";
import React from "react";
import HeaderMenu from "./components/HeaderMenu";
import Notifications from "./components/Notifications";
import BurgerMenu from "./components/BurgerMenu";
import NotificationsMobile from "./components/NotificationsMobile";
import SearchMobile from "./components/SearchMobile";
import Language from "../Language/Language";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
// import { useTranslations } from "next-intl";
import HeaderUser from "./components/HeaderUser";
import { Category } from "@/types/types";
import { getServerSession } from "next-auth";
import { NotificationsCount } from "./components/NotificationsCount";
import { HeaderSearch } from "./components/HeaderSearch";

// interface SellProps {
//   categories: Category[];
// }

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    `https://multiplast-api.web-hub.online/api/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      // next: { revalidate: 86400  },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

export default async function Header() {
  // const t = useTranslations("Header");
  const session = await getServerSession();
  const categories: Category[] = await fetchCategories();
  const t = await getTranslations("Header");
  const tNavigation = await getTranslations("Navigation");

  return (
    <header className="header">
      <div className="header__body body-header">
        <div className="body-header__container">
          <div className="body-header__block w-full">
            <Link href="/" className="body-header__logo logo">
              <span>M</span>ulti<span>P</span>last
            </Link>

            <HeaderSearch placeholder={t("searchPlaceholder")} />
          </div>
          <div className="body-header__block body-header__block--actions">
            <div className="xl:hidden">
              <div className="body-header__actions actions-body-header ">
                <div className="block md:hidden">
                  <SearchMobile />
                </div>
                <div className="block md:hidden">
                  <Notifications />
                </div>
                <div className="block xl:hidden">
                  <BurgerMenu />
                </div>
              </div>
            </div>

            <div className="hidden xl:block">
              <Language />
            </div>
            {/* <div className="body-header__user user  user--desktop">
            </div> */}
            <div className="hidden xl:block">
              <HeaderUser />
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom bottom-header">
        <div className="bottom-header__container">
          <HeaderMenu />
          <div className="hidden xl:block">
            <ul className="bottom-header__list ">
              <li className="menu__item">
                <Link href="/products" className="menu__link">
                  {tNavigation("marketplace")}
                </Link>
              </li>
              {session && (
                <>
                  <li className="menu__item">
                    <Link
                      href="/dashboard/add-advertisement"
                      className="menu__link"
                    >
                      <span className="truncate">
                        {tNavigation("addAdvertisement")}
                      </span>
                      {categories.length > 0 && (
                        <div className="main-menu__arrow menu__arrow">
                          <Image
                            src="/icons/dropdown-arrow.svg"
                            alt="Icon"
                            width={100}
                            height={100}
                          />
                        </div>
                      )}
                    </Link>
                    {categories.length > 0 && (
                      <ul className="sub-menu__list">
                        <li>
                          <Link
                            href="/dashboard/add-advertisement?type=sell"
                            className="sub-menu__link menu__link"
                          >
                            <span>{t("sell")}</span>
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
                            {categories.map((category) => (
                              <li key={category.id}>
                                {category.categories &&
                                category.categories.filter(
                                  (subCategory) =>
                                    subCategory.type === "Сировина"
                                ).length > 0 ? (
                                  <>
                                    <Link
                                      href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                      className="sub-menu__link menu__link"
                                    >
                                      <span className="truncate">
                                        {category.name}
                                      </span>
                                      <div className="sub-sub-menu__arrow menu__arrow">
                                        <Image
                                          src="/icons/dropdown-arrow.svg"
                                          alt="Icon"
                                          width={100}
                                          height={100}
                                        />
                                      </div>
                                    </Link>
                                    <ul className="sub-sub-sub-menu__list">
                                      {category.categories
                                        .filter(
                                          (subCategory) =>
                                            subCategory.type === "Сировина"
                                        )
                                        .map((subCategory) => (
                                          <li key={subCategory.id}>
                                            <Link
                                              href={`/dashboard/add-advertisement?type=sell&category=${subCategory.parent_id}&subCategory=${subCategory.id}`}
                                              className="sub-menu__link"
                                            >
                                              <span className="truncate">
                                                {subCategory.name}
                                              </span>
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </>
                                ) : (
                                  <Link
                                    href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                    className="sub-menu__link"
                                  >
                                    <span className="truncate">
                                      {category.name}
                                    </span>
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <Link
                            href="/dashboard/add-advertisement?type=buy"
                            className="sub-menu__link menu__link"
                          >
                            <span>{t("buy")}</span>
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
                            {categories.map((category) => (
                              <li key={category.id}>
                                {category.categories &&
                                category.categories.filter(
                                  (subCategory) =>
                                    subCategory.type === "Сировина"
                                ).length > 0 ? (
                                  <>
                                    <Link
                                      href={`/dashboard/add-advertisement?type=buy&category=${category.id}`}
                                      className="sub-menu__link menu__link"
                                    >
                                      <span className="truncate">
                                        {category.name}
                                      </span>
                                      <div className="sub-sub-menu__arrow menu__arrow">
                                        <Image
                                          src="/icons/dropdown-arrow.svg"
                                          alt="Icon"
                                          width={100}
                                          height={100}
                                        />
                                      </div>
                                    </Link>
                                    <ul className="sub-sub-sub-menu__list">
                                      {category.categories
                                        .filter(
                                          (subCategory) =>
                                            subCategory.type === "Сировина"
                                        )
                                        .map((subCategory) => (
                                          <li key={subCategory.id}>
                                            <Link
                                              href={`/dashboard/add-advertisement?type=buy&category=${subCategory.parent_id}&subCategory=${subCategory.id}`}
                                              className="sub-menu__link"
                                            >
                                              <span className="truncate">
                                                {subCategory.name}
                                              </span>
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </>
                                ) : (
                                  <Link
                                    href={`/dashboard/add-advertisement?type=buy&category=${category.id}`}
                                    className="sub-menu__link"
                                  >
                                    <span className="truncate">
                                      {category.name}
                                    </span>
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="menu__item">
                    <Link href="/messages" className="menu__link">
                      {tNavigation("myMessages")}
                    </Link>
                  </li>
                </>
              )}

              <li className="menu__item">
                <Link href="/forum" className="menu__link">
                  {tNavigation("forum")}
                </Link>
                {/* <div className="notification-value">
                <span className="notification-value__number">99</span>
              </div> */}
                <NotificationsCount nCount={0} />
              </li>
            </ul>
          </div>

          <div className="bottom-header__actions">
            <div className="hidden md:flex">
              <Link href="/favorites" className="btn-icon btn-icon--favorites">
                <div className="btn-icon__image">
                  <Image
                    src="/icons/heart.svg"
                    alt="Icon"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
            </div>
            <div className="hidden md:flex">
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
