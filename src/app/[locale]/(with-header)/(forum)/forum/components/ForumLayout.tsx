// import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import { useTranslations } from "next-intl";
import { BreadcrumbsClient } from "@/components/Breadcrumbs";
import SelectTabs from "@/components/Select/SelectTabs";
import { ForumSearch } from "@/components/Forum/components/ForumSearch";

export default function ForumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("Forum");
  const tb = useTranslations("Breadcrumbs");

  const crumbs = [{ label: tb("home"), href: "/" }, { label: tb("forum") }];

  return (
    <>
      <BreadcrumbsClient items={crumbs} />

      <section className="forum">
        <div className="forum__top top-forum">
          <div className="top-forum__container main-container">
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
