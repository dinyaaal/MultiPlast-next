"use client";

import { ButtonMain } from "@/components/ButtonMain";
import { useRouter } from "@/i18n/routing";
import { Search } from "lucide-react";
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
      <ButtonMain type="submit" disabled={!searchValue} isIconOnly color='primary' className="size-10 shrink-0">
        <Search className="size-5 text-white" />
      </ButtonMain>
    </form>
  );
};
