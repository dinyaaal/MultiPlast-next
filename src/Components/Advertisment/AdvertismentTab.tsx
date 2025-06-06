"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
interface AdvertismentTabProps {
  href: string;
  text: string;
  className?: string;
  params?: string;
}

const AdvertismentTab: FC<AdvertismentTabProps> = ({
  href,
  text,
  className = "",
  params,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams?.toString() || "";

  const categoryParam = params ? `?category=${params}` : "";

  // const targetPath = `${href}${categoryParam}`;
  const targetPath = `${href}`;

  const currentPath = query ? `${pathname}?${query}` : `${pathname}`;

  const isActive = pathname === href;

  // const handleClick = () => {
  //   router.push(targetPath);
  // };

  return (
    <Link
      href={targetPath}
      // onClick={handleClick}
      className={`tabs-dashboard__item ${
        isActive ? "active" : ""
      } ${className}`}
    >
      {text}
    </Link>
  );
};

export default AdvertismentTab;
