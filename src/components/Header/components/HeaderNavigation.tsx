"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Category } from "@/types/types";
import Image from "next/image";
import { NotificationsCount } from "./NotificationsCount";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronRightIcon } from "lucide-react";

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
          {/* <li className="menu__item">
              <Link
                href="/dashboard/add-advertisement"
                className={`menu__link ${pathname === "/dashboard/add-advertisement" ? "active" : ""
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
                <div className="sub-menu__list-wrapper">
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

                      <div className="sub-menu__list-wrapper">
                        <ul className="sub-sub-menu__list">

                          {categories.map((category) => (
                            <li key={category.id}>
                              {category.categories ? (
                                <>
                                  <Link
                                    href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                    className="sub-menu__link menu__link"
                                  >
                                    <span
                                      className="menu__link-text"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          category.translations.name[
                                          locale as keyof typeof category.translations.name
                                          ] ||
                                          category.name ||
                                          "",
                                      }}
                                    />
                                    {category.categories
                                      // .filter(
                                      //   (subCategory) =>
                                      //     subCategory.type === "Сировина"
                                      // )
                                      .length > 0 && (
                                        <div className="sub-sub-menu__arrow menu__arrow">
                                          <Image
                                            src="/icons/dropdown-arrow.svg"
                                            alt="Icon"
                                            width={100}
                                            height={100}
                                          />
                                        </div>
                                      )}

                                  </Link>
                                  <div className="sub-menu__list-wrapper">
                                    <ul className="sub-sub-sub-menu__list">

                                      {category.categories
                                        // .filter(
                                        //   (subCategory) =>
                                        //     subCategory.type === "Сировина"
                                        // )
                                        .map((subCategory) => {
                                          const subCategoryLink =
                                            subCategory.type === "Сировина"
                                              ? `/dashboard/add-advertisement?type=sell&category=${subCategory.parent_id}&subCategory=${subCategory.id}`
                                              : `/dashboard/add-advertisement?type=sell&category=${subCategory.parent_id}&polymer=${subCategory.id}`;
                                          return (
                                            <li key={subCategory.id}>
                                              <Link
                                                href={subCategoryLink}
                                                className="sub-menu__link"
                                              >
                                                <span
                                                  className="menu__link-text"
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      subCategory.translations.name[
                                                      locale as keyof typeof subCategory.translations.name
                                                      ] ||
                                                      subCategory.name ||
                                                      "",
                                                  }}
                                                />
                                              </Link>
                                            </li>
                                          );
                                        })}
                                    </ul>
                                  </div>
                                </>
                              ) : (
                                <Link
                                  href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                  className="sub-menu__link"
                                >
                                  <span
                                    className="menu__link-text"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        category.translations.name[
                                        locale as keyof typeof category.translations.name
                                        ] ||
                                        category.name ||
                                        "",
                                    }}
                                  />
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
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

                      <div className="sub-menu__list-wrapper">
                        <ul className="sub-sub-menu__list">

                          {categories.map((category) => (
                            <li key={category.id}>
                              {category.categories ? (
                                <>
                                  <Link
                                    href={`/dashboard/add-advertisement?type=buy&category=${category.id}`}
                                    className="sub-menu__link menu__link"
                                  >
                                    <span
                                      className="menu__link-text"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          category.translations.name[
                                          locale as keyof typeof category.translations.name
                                          ] ||
                                          category.name ||
                                          "",
                                      }}
                                    />

                                    {category.categories
                                      // .filter(
                                      //   (subCategory) =>
                                      //     subCategory.type === "Сировина"
                                      // )
                                      .length > 0 && (
                                        <div className="sub-sub-menu__arrow menu__arrow">
                                          <Image
                                            src="/icons/dropdown-arrow.svg"
                                            alt="Icon"
                                            width={100}
                                            height={100}
                                          />
                                        </div>
                                      )}
                                  </Link>
                                  <div className="sub-menu__list-wrapper">
                                    <ul className="sub-sub-sub-menu__list">

                                      {category.categories
                                        // .filter(
                                        //   (subCategory) =>
                                        //     subCategory.type === "Сировина"
                                        // )
                                        .map((subCategory) => {
                                          const subCategoryLink =
                                            subCategory.type === "Сировина"
                                              ? `/dashboard/add-advertisement?type=buy&category=${subCategory.parent_id}&subCategory=${subCategory.id}`
                                              : `/dashboard/add-advertisement?type=buy&category=${subCategory.parent_id}&polymer=${subCategory.id}`;
                                          return (
                                            <li key={subCategory.id}>
                                              <Link
                                                href={subCategoryLink}
                                                className="sub-menu__link"
                                              >
                                                <span
                                                  className="menu__link-text"
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      subCategory.translations.name[
                                                      locale as keyof typeof subCategory.translations.name
                                                      ] ||
                                                      subCategory.name ||
                                                      "",
                                                  }}
                                                />
                                              </Link>
                                            </li>
                                          );
                                        })}
                                    </ul>
                                  </div>
                                </>
                              ) : (
                                <Link
                                  href={`/dashboard/add-advertisement?type=buy&category=${category.id}`}
                                  className="sub-menu__link"
                                >
                                  <span
                                    className="menu__link-text"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        category.translations.name[
                                        locale as keyof typeof category.translations.name
                                        ] ||
                                        category.name ||
                                        "",
                                    }}
                                  />
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </li> */}
          <DropdownMenu >
            <DropdownMenuTrigger asChild >
              <li className="menu__item">
                <Link
                  href="/dashboard/add-advertisement"
                  className={`menu__link ${pathname === "/dashboard/add-advertisement" ? "active" : ""
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

              </li>

            </DropdownMenuTrigger>
            {categories.length > 0 && (
              <DropdownMenuContent side='bottom' align='start' className="sub-menu__list">
                <ul>
                  <DropdownMenuGroup>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger asChild >
                        <li>
                          <Link
                            href="/dashboard/add-advertisement?type=sell"
                            className="sub-menu__link menu__link"
                          >
                            <span>{tNavigation("addAdvertisementSell")}</span>
                            <ChevronRightIcon className="menu__link-arrow" />

                            {/* <div className="sub-menu__arrow menu__arrow">
                              <Image
                                src="/icons/dropdown-arrow.svg"
                                alt="Icon"
                                width={100}
                                height={100}
                              />
                            </div> */}
                          </Link>


                        </li>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="sub-menu__list">
                          <ul>

                            {categories.map((category) => (

                              <DropdownMenuSub key={category.id}>
                                <DropdownMenuSubTrigger asChild >
                                  <li>
                                    {category.categories ? (
                                      <>
                                        <Link
                                          href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                          className="sub-menu__link menu__link"
                                        >
                                          <span
                                            className="menu__link-text"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                category.translations.name[
                                                locale as keyof typeof category.translations.name
                                                ] ||
                                                category.name ||
                                                "",
                                            }}
                                          />
                                          <ChevronRightIcon className="menu__link-arrow" />
                                          {/* {category.categories

                                            .length > 0 && (
                                              <div className="sub-sub-menu__arrow menu__arrow">
                                                <Image
                                                  src="/icons/dropdown-arrow.svg"
                                                  alt="Icon"
                                                  width={100}
                                                  height={100}
                                                />
                                              </div>
                                            )} */}

                                        </Link>

                                      </>
                                    ) : (
                                      <Link
                                        href={`/dashboard/add-advertisement?type=sell&category=${category.id}`}
                                        className="sub-menu__link"
                                      >
                                        <span
                                          className="menu__link-text"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              category.translations.name[
                                              locale as keyof typeof category.translations.name
                                              ] ||
                                              category.name ||
                                              "",
                                          }}
                                        />
                                      </Link>
                                    )}
                                  </li>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="sub-menu__list">
                                    <ul>

                                      {category.categories

                                        .map((subCategory) => {
                                          const subCategoryLink =
                                            subCategory.type === "Сировина"
                                              ? `/dashboard/add-advertisement?type=sell&category=${subCategory.parent_id}&subCategory=${subCategory.id}`
                                              : `/dashboard/add-advertisement?type=sell&category=${subCategory.parent_id}&polymer=${subCategory.id}`;
                                          return (
                                            <DropdownMenuItem key={subCategory.id} asChild>
                                              <li >
                                                <Link
                                                  href={subCategoryLink}
                                                  className="menu__link"
                                                >
                                                  <span
                                                    className="menu__link-text"
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        subCategory.translations.name[
                                                        locale as keyof typeof subCategory.translations.name
                                                        ] ||
                                                        subCategory.name ||
                                                        "",
                                                    }}
                                                  />
                                                </Link>
                                              </li>
                                            </DropdownMenuItem>


                                          );
                                        })}
                                    </ul>

                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            ))}
                          </ul>

                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/* <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
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


                      </li>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>Calendly</DropdownMenuItem>
                              <DropdownMenuItem>Slack</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Webhook</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Advanced...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub> */}

                  </DropdownMenuGroup>
                </ul>

              </DropdownMenuContent>

            )}

          </DropdownMenu>
          <li className="menu__item">
            <Link
              href="/messages"
              className={`menu__link ${pathname === "/messages" ? "active" : ""
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
