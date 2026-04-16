"use client";

import { useRouter } from "@/i18n/routing";
import { ButtonMain } from "./ButtonMain";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";


export default function BackBtn({ href }: { href: string }) {
    const t = useTranslations("Back");
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(href);
        }
    };

    return (
        <ButtonMain color='secondary' size={'md'} variant={'bordered'} onPress={handleBack}>
            <ChevronLeft size={20} />
            {t(`back`)}
        </ButtonMain>
    );
}