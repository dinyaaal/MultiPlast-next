"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Category } from "@/types/types";
import { NotificationsCount } from "./NotificationsCount";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

export default function HeaderNavigation({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const locale = useLocale();

  console.log(categories);

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

          <DropdownMenu >
            <DropdownMenuTrigger asChild >
              <li className="menu__item">
                <div
                  // href="/dashboard/add-advertisement"
                  className={`menu__link ${pathname === "/dashboard/add-advertisement" ? "active" : ""
                    }`}
                >
                  <span className="menu__link-text">
                    {tNavigation("addAdvertisement")}
                  </span>
                  {categories.length > 0 && (
                    <ChevronDownIcon className="menu__link-arrow" />
                    // <div className="main-menu__arrow menu__arrow">
                    //   <Image
                    //     src="/icons/dropdown-arrow.svg"
                    //     alt="Icon"
                    //     width={100}
                    //     height={100}
                    //   />
                    // </div>
                  )}
                </div>

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

                            {categories.map((category) => {
                              const sellSubs = category.categories?.filter((sub) => sub.type === "Сировина") ?? [];
                              return sellSubs.length > 0 ? (
                              <DropdownMenuSub key={category.id}>
                                <DropdownMenuSubTrigger asChild >
                                  <li>
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
                                    </Link>
                                  </li>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="sub-menu__list">
                                    <ul>
                                      {sellSubs.map((subCategory) => (
                                        <DropdownMenuItem key={subCategory.id} asChild>
                                          <li>
                                            <Link
                                              href={`/dashboard/add-advertisement?type=sell&category=${subCategory.parent_id}&subCategory=${subCategory.id}`}
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
                                      ))}
                                    </ul>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                              ) : (
                                <DropdownMenuItem key={category.id} asChild>
                                  <li>
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
                                    </Link>
                                  </li>
                                </DropdownMenuItem>
                              );
                            })}
                          </ul>

                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger asChild >
                        <li>
                          <Link
                            href="/dashboard/add-advertisement?type=buy"
                            className="sub-menu__link menu__link"
                          >
                            <span>{tNavigation("addAdvertisementBuy")}</span>
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

                            {categories.map((category) => {
                              const buySubs = category.categories?.filter((sub) => sub.type === "Сировина") ?? [];
                              return buySubs.length > 0 ? (
                              <DropdownMenuSub key={category.id}>
                                <DropdownMenuSubTrigger asChild >
                                  <li>
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
                                      <ChevronRightIcon className="menu__link-arrow" />
                                    </Link>
                                  </li>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="sub-menu__list">
                                    <ul>
                                      {buySubs.map((subCategory) => (
                                        <DropdownMenuItem key={subCategory.id} asChild>
                                          <li>
                                            <Link
                                              href={`/dashboard/add-advertisement?type=buy&category=${subCategory.parent_id}&subCategory=${subCategory.id}`}
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
                                      ))}
                                    </ul>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                              ) : (
                                <DropdownMenuItem key={category.id} asChild>
                                  <li>
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
                                    </Link>
                                  </li>
                                </DropdownMenuItem>
                              );
                            })}
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
