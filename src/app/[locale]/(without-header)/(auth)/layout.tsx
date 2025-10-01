import { Link } from "@/i18n/routing";
import Language from "@/components/Language/Language";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page page-registration">
      <div className="login">
        <div className="login__container main-container">
          <div className="login__wrapper">
            <div className="login__body">
              <div className="flex w-full items-center justify-between gap-5">
                <Link href="/" className="body-header__logo logo">
                  <Image src="/logo.svg" alt="Logo" width={100} height={100} />
                </Link>
                <Language />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
