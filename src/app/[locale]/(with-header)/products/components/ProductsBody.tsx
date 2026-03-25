"use client";

import { Pagination } from "@heroui/pagination";
import { ProductCard } from "@/components/Products/components/ProductCard";
import { Category, MinimalProduct, Page } from "@/types/types";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Filters } from "@/components/Products/components/Filters";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

interface ProductsProps {
  categories: Category[];
}

export function ProductsBody({ categories }: ProductsProps) {
  const { data: session, status } = useSession();
  const t = useTranslations("Products");
  const [products, setProducts] = useState<MinimalProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // const pageFromUrl = Number(searchParams.get("page")) || 1;

  // const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [links, setLinks] = useState<Page[]>([]);
  const [lastPage, setLastPage] = useState<number>();
  const search = useMemo(() => searchParams.get("search"), [searchParams]);
  const accessToken = session?.user.access_token;
  const currentPage = Number(searchParams.get("page")) || 1;
  // const search = searchParams.get("search") || "";
  const cat = searchParams.get("cat") || "";
  const subcat = searchParams.get("subcat") || "";
  const opt = searchParams.get("opt") || "";
  const [isRestored, setIsRestored] = useState(false);



  const fetchProducts = useCallback(async () => {
    // Ждем, пока сессия загрузится, если нужно передать токен
    if (status === "loading") return;

    setIsLoading(true);
    const queryParams = new URLSearchParams();

    // Мапим параметры URL на параметры API
    if (cat) queryParams.append("category_id", cat);
    if (subcat) queryParams.append("type_id", subcat);
    if (opt) queryParams.append("type_of_product", opt);
    if (search) queryParams.append("search", search);

    queryParams.append("page", `${currentPage}`);
    queryParams.append("perPage", "12");

    const queryString = `?${queryParams.toString()}`;

    try {
      const res = await fetch(`/api/products/get${queryString}`, {
        method: "GET",
        headers: {
          ...(accessToken && { token: accessToken }),
        },
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setProducts(data.data || []);
      setLastPage(data.last_page);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, status, currentPage, search, cat, subcat, opt]);

  // Следим за изменением любых параметров в URL
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (page: number) => {
    sessionStorage.removeItem("products-scroll-pos");
    setIsRestored(false); // Позволяем скроллу отработать для новой страницы

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    // При пагинации лучше оставить scroll: true, чтобы кидало наверх новой страницы
    router.replace(`?${params.toString()}`, { scroll: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Сохраняем позицию только если мы не в процессе загрузки
      if (!isLoading) {
        sessionStorage.setItem("products-scroll-pos", window.scrollY.toString());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  // 2. Логика восстановления скролла
  useEffect(() => {
    // Условия для скролла: данные загружены, есть товары и мы еще не восстанавливали на этом маунте
    if (!isLoading && products.length > 0 && !isRestored) {
      const savedScroll = sessionStorage.getItem("products-scroll-pos");

      if (savedScroll) {
        // Небольшая задержка, чтобы браузер успел отрисовать DOM
        const timeoutId = setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScroll),
            behavior: "instant", // "instant" лучше для возврата назад, чтобы не было дерганий
          });
          setIsRestored(true);
        }, 100);

        return () => clearTimeout(timeoutId);
      } else {
        setIsRestored(true);
      }
    }
  }, [isLoading, products, isRestored]);



  return (
    <>
      <div className="trade__body">
        <Filters categories={categories} />

        <div className="trade__content content-trade">
          {isLoading && (
            <div className="flex w-full h-full flex-auto items-center justify-center">
              <Spinner size="lg" />
            </div>
          )}
          {!isLoading ? (
            products.length > 0 ? (
              <div className="content-trade__items">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p>{t("noProducts")}</p>
            )
          ) : null}
          {lastPage && lastPage > 1 && (
            <div className="pages">
              <button
                type="button"
                className={`pages__arrow pages__arrow-prev ${currentPage === 1 ? "disabled" : ""
                  } `}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="3.5"
                    fill="#1858B8"
                    stroke="#1858B8"
                  />
                  <path
                    d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z"
                    fill="white"
                  />
                </svg>
              </button>

              <Pagination
                page={currentPage}
                onChange={handlePageChange}
                classNames={{
                  base: " flex justify-center ",
                  wrapper:
                    "gap-0 text-white overflow-hidden rounded-lg border border-solid border-[#B0BFD7]",
                  item: "w-10 h-10 text-black text-xs md:text-base bg-[#F8FBFF] rounded-none  border-r border-solid border-[#B0BFD7] last:border-r-0 ",
                  cursor:
                    "rounded-none text-white w-10 h-10  text-xs md:text-base bg-[#1858B8]",
                  // prev: "w-10 h-10 text-white bg-[#1858B8] rounded-none outline-none border border-[#B0BFD7]" ,
                  // next: "w-10 h-10 text-white bg-[#1858B8] rounded-none outline-none border border-[#B0BFD7]" ,
                }}
                initialPage={1}
                total={lastPage}
              />
              <button
                type="button"
                className={`pages__arrow pages__arrow-next ${currentPage === lastPage ? "disabled" : ""
                  } `}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="3.5"
                    fill="#1858B8"
                    stroke="#1858B8"
                  />
                  <path
                    d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
