"use client";

import { Link } from "@/i18n/routing";
import { ButtonMain } from "./ButtonMain";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";


export default function BackBtn({ href }: { href: string }) {
    const t = useTranslations("Back");
    return (
        <ButtonMain color='secondary' size={'md'} variant={'bordered'} as={Link} href={href}>
            <ChevronLeft size={20} />
            {t(`back`)}
        </ButtonMain>
    );
}