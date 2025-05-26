"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import Section from "./Section";
import { useTranslations } from "next-intl";
import { ForumCategory } from "@/types/types";

export default function Sections() {
  const t = useTranslations("Forum");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forumPosts, setForumPosts] = useState<ForumCategory[]>([]);

  // -=-=-=-=-=-=-=-=-=- Список разделов форума + активный раздел -=-=-=-=-=-=-=-=-=-

  const fetchForumCategories = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/forum/categories`, {
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
        // setLastPage(data.last_page);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForumCategories();
  }, []);

  const [forumSectionsList, setForumSectionsList] = useState([
    {
      id: 1,
      title: "Полікарбонат",
      text: "Обговорюємо полікарбонат та його види",
    },
    {
      id: 2,
      title: "Полікарбонат 2",
      text: "Обговорюємо полікарбонат та його види 2",
    },
  ]);

  const [activeSection, setActiveSection] = useState(forumSectionsList[0].id);

  // -=-=-=-=-=-=-=-=-=- Список разделов форума + активный раздел -=-=-=-=-=-=-=-=-=-

  return (
    <>
      <div className="forum__sections sections-forum">
        <p className="sections-forum__text">{t("selectSection")}</p>
        {!!forumPosts.length && (
          <div className="sections-forum__body">
            <Swiper
              spaceBetween={20}
              slidesPerView={"auto"}
              className="sections-forum__slider"
              autoHeight={false}
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
            >
              {forumPosts.map((item) => (
                <SwiperSlide key={item.id}>
                  <Section
                    title={item.title}
                    text={item.description}
                    isActive={item.id === activeSection}
                    onClick={(_) => setActiveSection(item.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              type="button"
              className="sections-forum__prev swiper-button swiper-button-prev"
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
            <button
              type="button"
              className="sections-forum__next swiper-button swiper-button-next"
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
    </>
  );
}
