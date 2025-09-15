"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import { Navigation, Thumbs } from "swiper/modules";
import { ProductType } from "@/types/types";
import Link from "next/link";

export function ProductPhotos({ product }: { product: ProductType }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const galleryRef = useRef<any>(null);

  return (
    <>
      {!!product.photos.length && (
        <div>
          <LightGallery
            onInit={(ref) => (galleryRef.current = ref.instance)}
            dynamic
            plugins={[lgZoom]}
            dynamicEl={product.photos.map((item) => ({
              src: item.url,
              thumb: item.url,
              subHtml: `<h4>${product.title}</h4>`,
            }))}
          />
          <div className="body-product__images">
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              speed={800}
              className="body-product__slider"
              navigation={{
                prevEl: ".thumbs-slider-body-product-button-prev",
                nextEl: ".thumbs-slider-body-product-button-next",
              }}
            >
              {product.photos.map((item, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={item.url}
                    alt={`${product.title} | Photo ${index + 1}`}
                    width={500}
                    height={500}
                    className="body-product__image cursor-zoom-in"
                    onClick={() => galleryRef.current.openGallery(index)} // 👈 открываем по клику
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {!!product?.photos?.length && (
              <div className="body-product__thumbs-slider-wrapper">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView="auto"
                  speed={800}
                  modules={[Navigation]}
                  className="body-product__thumbs-slider"
                >
                  {product.photos.map((item) => (
                    <SwiperSlide>
                      <Image
                        src={item.url}
                        alt={product.title + " | Photo"}
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  type="button"
                  className="swiper-button swiper-button-prev thumbs-slider-body-product-button-prev"
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
                  className="swiper-button swiper-button-next thumbs-slider-body-product-button-next"
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
      )}
    </>
  );
}
