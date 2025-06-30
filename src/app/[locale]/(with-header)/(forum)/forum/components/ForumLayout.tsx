import Breadcrumbs from "@/Components/Breadcrumbs";
import SelectTabs from "@/Components/Select/SelectTabs";
import React from "react";
import { useTranslations } from "next-intl";
import { ForumSearch } from "@/Components/Forum/components/ForumSearch";

export default function ForumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("Forum");

  return (
    <>
      <Breadcrumbs position={t("breadcrumbsPosition")} />
      <section className="forum">
        <div className="forum__top top-forum">
          <div className="top-forum__container">
            <div className="top-forum__title title">{t("forumTitle")}</div>
            <div className="top-forum__block">
              <SelectTabs
                options={[
                  { link: "/forum", label: t("forumTab") },
                  { link: "/forum-add", label: t("addTopicTab") },
                ]}
              />

              <ForumSearch />
            </div>
          </div>
        </div>
        <div className="forum__body body-forum">{children}</div>
      </section>
    </>
  );
}
