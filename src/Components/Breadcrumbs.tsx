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
            <svg
              className="breadcrumbs__arrow-icon"
              width="34"
              height="12"
              viewBox="0 0 34 12"
              fill="#0E274D"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM1 6.75H34V5.25H1V6.75Z" />
            </svg>
          </button>
          <div className="breadcrumbs__content">
            <Link href="/" className="breadcrumbs__link">
              Головна
            </Link>
            <span>{">"}</span>
            <span className="breadcrumbs__current">{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
