"use server";

import { MinimalProduct } from "@/types/types";
import AdvertsSwiper from "./components/AdvertsSwiper";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ButtonMain } from "../ButtonMain";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.multiplast.com.ua";

async function getProducts(): Promise<MinimalProduct[] | null> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", "1");
  queryParams.append("perPage", "10");

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  try {
    const res = await fetch(`${BACKEND_URL}/api/products${queryString}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    return data.data as MinimalProduct[];
  } catch {
    return null;
  }
}

export default async function Adverts() {
  const recent = await getProducts();
  const t = await getTranslations("Adverts.recentlyPosted");

  if (!recent || recent.length === 0) return null;

  return (
    <section className="adverts">
      <div className="adverts__container main-container w-full items-center">
        <div className="adverts__top w-full">
          <h2 className="adverts__title title">{t("title")}</h2>
          <div className="hidden md:block">
            <Link href="/dashboard/add-advertisement" className="">
              <ButtonMain type={'button'} color='primary' >

                {t("button")}
              </ButtonMain>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <AdvertsSwiper adverts={recent} />
        </div>
        <div className="md:hidden flex flex-col items-center gap-10">

          <Link href="/dashboard/add-advertisement" className="">
            <ButtonMain type={'button'} color='primary' >

              {t("button")}
            </ButtonMain>
          </Link>
          <Link href="/products" className="">
            <ButtonMain type={'button'} color='secondary' >

              {t("viewAllProducts")}
            </ButtonMain>
          </Link>
        </div>
      </div>
    </section>
  );
}
