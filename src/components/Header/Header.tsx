import Image from "next/image";
import React from "react";
import HeaderMenu from "./components/HeaderMenu";
import Notifications from "./components/Notifications";
import BurgerMenu from "./components/BurgerMenu";
import SearchMobile from "./components/SearchMobile";
import Language from "../Language/Language";
import { Link } from "@/i18n/routing";
import HeaderUser from "./components/HeaderUser";
import { Category } from "@/types/types";

import { HeaderSearch } from "./components/HeaderSearch";
import HeaderNavigation from "./components/HeaderNavigation";

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
      // cache: "force-cache",
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

export default async function Header() {
  // const t = useTranslations("Header");
  // const session = await getServerSession();
  const categories: Category[] = await fetchCategories();
  console.log(categories);
  // const t = await getTranslations("Header");
  // const tNavigation = await getTranslations("Navigation");

  return (
    <header className="header">
      <div className="header__body body-header">
        <div className="body-header__container main-container">
          <div className="body-header__block w-full">
            <Link href="/" className="body-header__logo logo">
              <Image src="/logo.svg" alt="Logo" width={100} height={100} />
            </Link>

            <HeaderSearch />
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
        <div className="bottom-header__container main-container">
          <HeaderMenu />
          <div className="hidden xl:block">
            <HeaderNavigation categories={categories} />
          </div>

          <div className="bottom-header__actions ">
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
