import Image from "next/image";
import React from "react";
import HeaderMenu from "./HeaderMenu";
import Notifications from "./Notifications";
import BurgerMenu from "./BurgerMenu";
import NotificationsMobile from "./NotificationsMobile";
import SearchMobile from "./SearchMobile";
import Language from "../../Language/Language";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
// import { useTranslations } from "next-intl";
import HeaderUser from "./HeaderUser";
import { Category } from "@/types/types";
import { getSession } from "next-auth/react";
import { NotificationsCount } from "./NotificationsCount";
import { HeaderSearch } from "./HeaderSearch";

// interface SellProps {
//   categories: Category[];
// }

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`https://multiplast.web-hub.online/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    // next: { revalidate: 86400  },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

export default async function Header() {
  // const t = useTranslations("Header");
  const categories: Category[] = await fetchCategories();
  const t = await getTranslations("Header");
  return (
    <header className="header">
      <div className="header__body body-header">
        <div className="body-header__container">
          <div className="body-header__block">
            <Link href="/" className="body-header__logo logo">
              <span>M</span>ulti<span>P</span>last
            </Link>
            
            <HeaderSearch placeholder={t("searchPlaceholder")}/>
          </div>
          <div className="body-header__block body-header__block--actions">
            <div className="body-header__actions actions-body-header">
              <SearchMobile />
              <NotificationsMobile />
              <BurgerMenu />
            </div>

            <Language className="language--desktop" />
            <HeaderUser />
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
              <Link href="/dashboard/add-advertisement" className="menu__link">
                {t("postAd")}
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
                      {categories.map((category) => (
                        <li key={category.id}>
                          {category.categories &&
                          category.categories.filter(
                            (subCategory) => subCategory.type === "Сировина"
                          ).length > 0 ? (
                            <>
                              <Link
                                href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                className="sub-menu__link menu__link"
                              >
                                {category.name}
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
                                        {subCategory.name}
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
                              {category.name}
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
                      {categories.map((category) => (
                        <li key={category.id}>
                          {category.categories &&
                          category.categories.filter(
                            (subCategory) => subCategory.type === "Сировина"
                          ).length > 0 ? (
                            <>
                              <Link
                                href={`/dashboard/add-advertisement?type=buy&category=${category.id}`}
                                className="sub-menu__link menu__link"
                              >
                                {category.name}
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
                                        {subCategory.name}
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
                              {category.name}
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
                {t("messages")}
              </Link>
            </li>
            <li className="menu__item">
              <Link href="/forum" className="menu__link">
                {t("forum")}
              </Link>
              {/* <div className="notification-value">
                <span className="notification-value__number">99</span>
              </div> */}
              <NotificationsCount nCount={0} />
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
