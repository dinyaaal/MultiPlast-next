"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface BreadcrumbsProps {
  position: string;
}

export default function Breadcrumbs({ position }: BreadcrumbsProps) {
  const router = useRouter();

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <div className="breadcrumbs__body">
          <button className="breadcrumbs__arrow" onClick={() => router.back()}>
            <Image
              src="/icons/arrow-back.svg"
              alt="Icon"
              width={100}
              height={100}
            />
          </button>
          <div className="breadcrumbs__content">
            <Link href="/" className="breadcrumbs__prev">
              Головна
            </Link>
            <span className="breadcrumbs__current">
              {position}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
