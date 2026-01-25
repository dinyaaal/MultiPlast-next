"use client";

import { Tab, Tabs } from "@heroui/react";
import ForumBody from "./ForumBody";
import { useTranslations } from "next-intl";
import { ForumCategoryMinimal } from "@/types/types";
import ForumAdd from "./ForumAdd";

interface ForumTabsProps {
  categories: ForumCategoryMinimal[];
}

export default function ForumTabs({ categories }: ForumTabsProps) {
  const t = useTranslations("Forum");
  return (
    <div>
      <Tabs
        size="lg"
        // variant="light"
        color="primary"
        radius="sm"
        aria-label="Forum Tabs"
        classNames={{
          tabList: "p-4 bg-secondaryColor overflow-hidden",
          tabContent: "text-xl xl:text-2xl font-bold text-black",
        }}
      >
        <Tab key="forum" title={t("forumTab")}>
          <ForumBody />
        </Tab>
        <Tab key="forum-add" title={t("addTopicTab")}>
          <ForumAdd categories={categories || []} />
        </Tab>
      </Tabs>
    </div>
  );
}
