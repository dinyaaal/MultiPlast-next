"use server";

import { MinimalProduct } from "@/types/types";
import AdvertsSwiper from "./components/AdvertsSwiper";
import { Link } from "@/i18n/routing";

async function getProducts(): Promise<MinimalProduct[] | null> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", "1");
  queryParams.append("perPage", "10");

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/get${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

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
  console.log(recent);

  if (!recent || recent.length === 0) return null;

  return (
    <section className="adverts">
      <div className="adverts__container main-container">
        <div className="adverts__top">
          <h2 className="adverts__title title">Останні оголошення</h2>
          <Link
            href="/dashboard/add-advertisement"
            className="adverts__button button"
          >
            Подати оголошення
          </Link>
        </div>
        <AdvertsSwiper adverts={recent} />
        {/* <a href="#" className="adverts__button adverts__button--mobile button">
          Подати оголошення
        </a> */}
      </div>
    </section>
  );
}
