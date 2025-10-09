"use client";
import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Category } from "@/types/types";
import Image from "next/image";
import { NotificationsCount } from "./NotificationsCount";

export default function HeaderNavigation({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const locale = useLocale();

  console.log(locale);

  const tNavigation = useTranslations("Navigation");
  return (
    <ul className="bottom-header__list ">
      <li className="menu__item">
        <Link
          href="/products"
          className={`menu__link ${pathname === "/products" ? "active" : ""}`}
        >
          {tNavigation("marketplace")}
        </Link>
      </li>
      {session && (
        <>
          <li className="menu__item">
            <Link
              href="/dashboard/add-advertisement"
              className={`menu__link ${
                pathname === "/dashboard/add-advertisement" ? "active" : ""
              }`}
            >
              <span className="menu__link-text">
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
                    <span>{tNavigation("addAdvertisementSell")}</span>
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
                              <span className="menu__link-text">
                                {category.translations.name[
                                  locale as keyof typeof category.translations.name
                                ] || category.name}
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
                                      <span className="menu__link-text">
                                        {subCategory.translations.name[
                                          locale as keyof typeof subCategory.translations.name
                                        ] || subCategory.name}
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
                            <span className="menu__link-text">
                              {category.translations.name[
                                locale as keyof typeof category.translations.name
                              ] || category.name}
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
                    <span>{tNavigation("addAdvertisementBuy")}</span>
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
                              <span className="menu__link-text">
                                {category.translations.name[
                                  locale as keyof typeof category.translations.name
                                ] || category.name}
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
                                      <span className="menu__link-text">
                                        {subCategory.translations.name[
                                          locale as keyof typeof subCategory.translations.name
                                        ] || subCategory.name}
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
                            <span className="menu__link-text">
                              {" "}
                              {category.translations.name[
                                locale as keyof typeof category.translations.name
                              ] || category.name}
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
            <Link
              href="/messages"
              className={`menu__link ${
                pathname === "/messages" ? "active" : ""
              }`}
            >
              {tNavigation("myMessages")}
            </Link>
          </li>
        </>
      )}

      <li className="menu__item">
        <Link
          href="/forum"
          className={`menu__link ${pathname === "/forum" ? "active" : ""}`}
        >
          {tNavigation("forum")}
        </Link>

        <NotificationsCount nCount={0} />
      </li>
    </ul>
  );
}
