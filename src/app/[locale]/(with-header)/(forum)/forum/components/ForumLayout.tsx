// import Breadcrumbs from "@/Components/Breadcrumbs";
import SelectTabs from "@/Components/Select/SelectTabs";
import React from "react";
import { useTranslations } from "next-intl";
import { ForumSearch } from "@/Components/Forum/components/ForumSearch";
import { BreadcrumbsClient } from "@/Components/Breadcrumbs";

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
