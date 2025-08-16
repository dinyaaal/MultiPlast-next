"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsClientProps {
  items: Crumb[];
}

export function BreadcrumbsClient({ items }: BreadcrumbsClientProps) {
  return (
    <div className="breadcrumbs">
      <Breadcrumbs className="breadcrumbs__container main-container">
        {items.map(({ label, href }, idx) => (
          <BreadcrumbItem key={idx}>
            {href ? <Link href={href}>{label}</Link> : label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
