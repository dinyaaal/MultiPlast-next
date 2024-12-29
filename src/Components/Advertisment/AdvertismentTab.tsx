"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { useQueryState } from "nuqs";
interface AdvertismentTabProps {
  href: string;
  text: string;
  className?: string;
  params?: string; // Параметр, например, "sell" или "buy"
}

const AdvertismentTab: FC<AdvertismentTabProps> = ({
  href,
  text,
  className = "",
  params,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const localeActive = useLocale();
  const pathname = usePathname();
  const [category, setCategory] = useQueryState("category");

  const basePath = `/${localeActive}${href}`;
  const query = searchParams?.toString() || "";

  const categoryParam = params ? `?category=${params}` : "";

  const targetPath = `/${localeActive}${href}${categoryParam}`;
  const currentPath = query ? `${pathname}?${query}` : `${pathname}`;

  const currentPage = pathname === basePath;
  const isActive = currentPath === targetPath;

  const handleClick = () => {
    if (currentPage) {
      setCategory(params || null);
    } else {
      router.push(targetPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`tabs-advertisement__item ${
        isActive ? "active" : ""
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default AdvertismentTab;
