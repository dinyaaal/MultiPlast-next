"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/routing";

import React, { FormEvent, ReactEventHandler, useState } from "react";

interface IHeaderSearchProps {
  placeholder: string;
}

export const HeaderSearch: React.FC<IHeaderSearchProps> = ({ placeholder }) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/products?search=${searchValue}`);
  };

  return (
    <form onSubmit={handleSearch} className="body-header__search search ">
      <input
        type="text"
        placeholder={placeholder}
        className="search__input"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <button className="search__icon-body">
        <div className="search__icon">
          <Image src="/icons/search.svg" alt="Icon" width={100} height={100} />
        </div>
      </button>
    </form>
  );
};
