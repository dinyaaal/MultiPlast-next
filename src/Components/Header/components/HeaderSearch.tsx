"use client";

import Image from "next/image";

import React, { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export const HeaderSearch = () => {
  const router = useRouter();
  const t = useTranslations("Header");

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/products?search=${searchValue}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <label htmlFor="search" className="body-header__search search ">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className=" search__input"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          id="search"
        />
        <button className="search__icon-body cursor-pointer">
          <div className="search__icon">
            <Image
              src="/icons/search.svg"
              alt="Icon"
              width={100}
              height={100}
            />
          </div>
        </button>
      </label>
    </form>
  );
};
