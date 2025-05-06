"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function SearchMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/products?search=${searchValue}`);
  };

  const t = useTranslations("Header");

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="search-mobile__button header-icon header-icon--search"
      >
        <div className="header-icon__image">
          <Image
            src="/icons/search-blue.svg"
            alt="Icon"
            width={100}
            height={100}
          />
        </div>
      </button>
      <div
        className={`search-mobile__body body-search-mobile ${
          isOpen ? "active" : ""
        } `}
      >
        <button onClick={toggleMenu} className="body-search-mobile__close">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.83984 8.83789L26.5175 26.5156"
              stroke="#0E274D"
              stroke-linecap="round"
            />
            <path
              d="M9.19141 26.8691L26.8691 9.19147"
              stroke="#0E274D"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <form onSubmit={handleSearch} className="body-search-mobile__field">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="search__input"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button>
            <div className="search__icon">
              <Image
                src="/icons/search-blue.svg"
                alt="Icon"
                width={100}
                height={100}
              />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
