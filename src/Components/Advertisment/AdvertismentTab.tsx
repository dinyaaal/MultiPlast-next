import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface AdvertismentTabProps {
  href: string;
  text: string;
  className?: string;
}

const AdvertismentTab: FC<AdvertismentTabProps> = ({
  href,
  text,
  className = "",
}) => {
  const pathname = usePathname();
  const localeActive = useLocale();

  const currentPath = `/${localeActive}${href}`;

  const isActive = currentPath === pathname;

  return (
    <Link
      href={href}
      className={`tabs-advertisement__item ${
        isActive ? "active" : ""
      } ${className}`}
    >
      {text}
    </Link>
  );
};

export default AdvertismentTab;
