"use client";

import { useEffect, useState } from "react";
import { MinimalProduct } from "@/types/types";
import { getRecentProducts } from "@/utils/getRecentProducts";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import AdvertsSwiper from "./components/AdvertsSwiper";

export default function AdvertsWatched() {
  const [recent, setRecent] = useState<MinimalProduct[]>([]);
  const { data: session, status } = useSession();
  const t = useTranslations("Adverts.recentlyWatched");

  useEffect(() => {
    if (status === "loading") return;

    const ids = getRecentProducts();
    if (ids.length === 0) return;

    const fetchRecent = async () => {
      try {
        const res = await fetch("/api/products/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(session?.user.access_token && {
              token: session.user.access_token,
            }),
          },
          body: JSON.stringify({ ids }),
        });

        if (!res.ok) return;

        const data = await res.json();
        const products: MinimalProduct[] = data.data ?? [];

        const ordered = ids
          .map((id) => products.find((product) => product.id === id))
          .filter((product): product is MinimalProduct => product !== undefined);

        setRecent(ordered);
      } catch {
        setRecent([]);
      }
    };

    fetchRecent();
  }, [session, status]);

  if (recent.length === 0) return null;

  return (
    <section className="adverts">
      <div className="adverts__container main-container">
        <div className="adverts__top">
          <h2 className="adverts__title title">{t("title")}</h2>
        </div>
        <AdvertsSwiper adverts={recent} />
      </div>
    </section>
  );
}
