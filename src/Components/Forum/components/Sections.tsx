"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import Section from "./Section";
import { useTranslations } from "next-intl";
import { ForumCategory } from "@/types/types";
import { ChevronRight } from "lucide-react";

interface SectionsProps {
  onChangeSectionId?: (id: number | null) => void;
}

export default function Sections({ onChangeSectionId }: SectionsProps) {
  const t = useTranslations("Forum");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forumSectionsList, setForumSectionsList] = useState<ForumCategory[]>(
    []
  );

  const [activeSection, setActiveSection] = useState<number | null>(null);

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
        setForumSectionsList(data.data);
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

  useEffect(() => {
    if (forumSectionsList.length > 0) {
      const firstId = forumSectionsList[0].id;
      // setActiveSection(firstId);
      // onChangeSectionId?.(firstId);
    }
  }, [forumSectionsList]);

  const handleSectionClick = (id: number) => {
    setActiveSection(id);
    onChangeSectionId?.(id);
  };

  return (
    <>
      <div className="forum__sections sections-forum">
        <p className="sections-forum__text">{t("selectSection")}</p>
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
            <SwiperSlide>
              <Section
                title={"Все"}
                text={"Показати всі статті"}
                isActive={!activeSection}
                onClick={() => {
                  setActiveSection(null);
                  onChangeSectionId?.(null);
                }}
              />
            </SwiperSlide>

            {!!forumSectionsList.length &&
              forumSectionsList.map((item) => (
                <SwiperSlide key={item.id}>
                  <Section
                    title={item.title}
                    text={item.description}
                    isActive={item.id === activeSection}
                    onClick={() => handleSectionClick(item.id)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            type="button"
            className="sections-forum__prev swiper-button swiper-button-prev"
          >
            <ChevronRight />
          </button>
          <button
            type="button"
            className="sections-forum__next swiper-button swiper-button-next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}
