'use client'

import { Link } from "@/i18n/routing";
import { ButtonMain } from "./ButtonMain";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface InfoBlockProps {
    variant?: 'advertisment' | 'forum';
}

export default function InfoBlock({ variant = 'advertisment' }: InfoBlockProps) {
    const t = useTranslations(`InfoBlock.${variant}`);

    return (
        <div className={`info-block info-block--${variant}`}>
            <div className="info-block__bg">
                <Image src={variant === 'advertisment' ? '/info-block/bg-advertisment.png' : '/info-block/bg-forum.png'} alt="" width={800} height={600} />
            </div>
            <div className="info-block__gradient"></div>
            <div className="main-container info-block__container">
                <div className="info-block__block">
                    <h2 className="info-block__title">{t("title")}</h2>
                    <p className="info-block__text">{t("text")}</p>
                </div>
                <ButtonMain color='white' as={Link} href={variant === 'advertisment' ? '/products' : '/forum'}>
                    {t("button")}
                </ButtonMain>
            </div>
        </div>
    )
}
