"use client";

import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { FormEvent, ReactEventHandler, useState } from "react";

export const ForumSearch: React.FC = () => {
  const t = useTranslations("Forum");

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/forum?search=${searchValue}`);
  };

  return (
    <form onSubmit={handleSearch} className="top-forum__search search">
      <input
        autoComplete="off"
        type="text"
        placeholder={t("searchPlaceholder")}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="search__input"
      />
      <button className="search__icon-body">
        <div className="search__icon">
          <Image src="/icons/search.svg" alt="Icon" width={100} height={100} />
        </div>
      </button>
    </form>
  );
};
