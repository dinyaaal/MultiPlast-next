"use client";

import { Tab, Tabs } from "@heroui/react";
import ForumBody from "./ForumBody";
import { useTranslations } from "next-intl";
import { ForumCategoryMinimal } from "@/types/types";
import ForumAdd from "./ForumAdd";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { Key } from "react";

interface ForumTabsProps {
  categories: ForumCategoryMinimal[];
}

export default function ForumTabs({ categories }: ForumTabsProps) {
  const t = useTranslations("Forum");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Получаем текущую вкладку из URL (по умолчанию "forum")
  const activeTab = searchParams.get("tab") === "add" ? "forum-add" : "forum";

  const handleTabChange = (key: Key) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "forum-add") {
      params.set("tab", "add");
    } else {
      params.delete("tab"); // Удаляем параметр для чистого URL на главной форума
    }

    // Обновляем URL без перезагрузки страницы
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
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
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
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
