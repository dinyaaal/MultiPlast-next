"use client";
import { Pagination } from "@heroui/pagination";
import { ProductCard } from "@/Components/Products/components/ProductCard";
import { Category, Page, ProductType } from "@/types/types";

import React, { useEffect, useState } from "react";
import { Filters } from "@/Components/Products/components/Filters";
import { ContentTrade } from "./ProductsContent";
import { useSearchParams } from "next/navigation";

interface ProductsProps {
  categories: Category[];
}

export function ProductsBody({ categories }: ProductsProps) {
  // const t = useTranslations("Products");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [links, setLinks] = useState<Page[]>([]);
  const [lastPage, setLastPage] = useState<number>();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelection = (
    category: string | null,
    subCategories: string[],
    options: string[]
  ) => {
    setSelectedCategory(category);
    setSelectedSubCategories(subCategories);
    setSelectedOptions(options);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams();

    if (selectedCategory) {
      queryParams.append("category_id", selectedCategory);
    }

    if (selectedSubCategories.length > 0) {
      queryParams.append("type_id", selectedSubCategories.join(","));
    }

    if (selectedOptions.length > 0) {
      queryParams.append("type_of_product", selectedOptions.join(","));
    }

    queryParams.append("page", `${currentPage}`);

    queryParams.append("perPage", "12");

    if (search) {
      queryParams.append("search", search);
    }

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";

    try {
      const res = await fetch(
        `https://multiplast.web-hub.online/api/products${queryString}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if (data) {
        setProducts(data.data);
        setLinks(data.links);
        setLastPage(data.last_page);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    selectedCategory,
    selectedSubCategories,
    selectedOptions,
    search,
  ]);

  return (
    <>
      <div className="trade__body">
        <Filters categories={categories} onSelectionConfirm={handleSelection} />
        {/* <ContentTrade
          products={products}
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        /> */}
        <div className="trade__content content-trade">
          <div className="content-trade__items">
            {/* {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Нет товаров</p>
            )} */}
          </div>
          {lastPage && lastPage > 1 && (
            <div className="pages">
              <button
                type="button"
                className={`pages__arrow pages__arrow-prev ${
                  currentPage === 1 ? "disabled" : ""
                } `}
                onClick={() =>
                  setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                }
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
                onChange={setCurrentPage}
                classNames={{
                  base: " flex justify-center ",
                  wrapper:
                    "gap-0 text-[#fff] overflow-hidden rounded-lg border border-solid border-[#B0BFD7]",
                  item: "w-10 h-10 text-[#000] text-xs md:text-base bg-[#F8FBFF] rounded-none  border-r border-solid border-[#B0BFD7] last:border-r-0 ",
                  cursor:
                    "rounded-none text-[#fff] w-10 h-10  text-xs md:text-base bg-[#1858B8]",
                  // prev: "w-10 h-10 text-[#fff] bg-[#1858B8] rounded-none outline-none border border-[#B0BFD7]" ,
                  // next: "w-10 h-10 text-[#fff] bg-[#1858B8] rounded-none outline-none border border-[#B0BFD7]" ,
                }}
                initialPage={1}
                total={lastPage}
              />
              <button
                type="button"
                className={`pages__arrow pages__arrow-next ${
                  currentPage === lastPage ? "disabled" : ""
                } `}
                onClick={() =>
                  setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
                }
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
