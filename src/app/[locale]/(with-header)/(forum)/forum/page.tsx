"use client";
import ForumLayout from "@/Components/Forum/components/ForumLayout";
import Sections from "@/Components/Forum/components/Sections";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SelectTabs from "@/Components/Select/SelectTabs";
import Image from "next/image";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { ForumPost, Page } from "@/types/types";
import { Pagination, Spinner } from "@heroui/react";
import { ForumCard } from "@/Components/Forum/components/ForumCard";

export default function Forum() {
  const t = useTranslations("ForumLayout");
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [links, setLinks] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [lastPage, setLastPage] = useState<number>();

  const fetchForum = async () => {
    setIsLoading(true)
    let queryParams: string[] = [];

    queryParams.push(`page=${currentPage}`);
    queryParams.push(`perPage=5`);

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    try {
      const res = await fetch(`/api/forum/get${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if (data) {
        console.log(data.data);
        setForumPosts(data.data);
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
    fetchForum();
  }, [currentPage]);

  return (
    <>
      <Breadcrumbs position="Форум" />
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

              <div className="top-forum__search search">
                <input
                  autoComplete="off"
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="search__input"
                />
                <button className="search__icon-body">
                  <div className="search__icon">
                    <Image
                      src="/icons/search.svg"
                      alt="Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="forum__body body-forum">
          {" "}
          <div className="body-forum__container">
            <div className="body-forum__content">
              <Sections />

              <p className="body-forum__text">{t("selectTopic")}</p>
              <div className="body-forum__items">
                {isLoading ? (
                  <div className="flex w-full h-full flex-auto items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : forumPosts.length > 0 ? (
                  forumPosts.map((post) => (
                    <ForumCard key={post.id} post={post} />
                  ))
                ) : (
                  <p>Нету тем</p>
                )}
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
        </div>
      </section>
    </>
  );
}
