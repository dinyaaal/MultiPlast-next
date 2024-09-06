import Link from "next/link";
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

  const isActive = pathname === href;

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
