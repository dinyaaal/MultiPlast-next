"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
// import Adverts from "@/Components/Products/Adverts";
import ReadMore from "@/Components/ReadMore";
import Breadcrumbs from "@/Components/Breadcrumbs";

export default function Product({ params }: {
  params: {id: string}
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  console.log(params.id)

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };



  return (
    <>
      <Breadcrumbs position="РР (Поліпропілен)" />
      <section className="product">
        <div className="product__container">
          <div className="product__top top-product">
            <div className="top-product__body">
              <div className="top-product__block">
                <h2 className="top-product__title title">
                  Продам Гранулу РР (Поліпропілен)
                </h2>
                <div className="top-product__actions">
                  <button
                    className={` like ${isLiked ? "active" : ""}`}
                    onClick={(e) => {
                      handleLikeClick();
                    }}
                  >
                    <svg
                      width="33"
                      height="30"
                      viewBox="0 0 33 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0002 26.7323L14.998 26.7303C10.7549 22.8862 7.35391 19.7972 4.9962 16.9153C2.65494 14.0535 1.5 11.58 1.5 8.99183C1.5 4.77155 4.78535 1.5 9 1.5C11.3943 1.5 13.7168 2.62136 15.2258 4.37798L16.3636 5.70249L17.5015 4.37798C19.0105 2.62136 21.3329 1.5 23.7273 1.5C27.9419 1.5 31.2273 4.77155 31.2273 8.99183C31.2273 11.58 30.0723 14.0535 27.7311 16.9153C25.3734 19.7972 21.9724 22.8862 17.7293 26.7303L17.7271 26.7323L16.3636 27.9724L15.0002 26.7323Z"
                        fill="white"
                        stroke="#BA360C"
                        stroke-width="3"
                      />
                    </svg>
                  </button>
                  <a href="#" className="share">
                    <svg
                      width="27"
                      height="30"
                      viewBox="0 0 27 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.5 30C21.25 30 20.1875 29.5625 19.3125 28.6875C18.4375 27.8125 18 26.75 18 25.5C18 25.325 18.0125 25.1435 18.0375 24.9555C18.0625 24.7675 18.1 24.599 18.15 24.45L7.575 18.3C7.15 18.675 6.675 18.969 6.15 19.182C5.625 19.395 5.075 19.501 4.5 19.5C3.25 19.5 2.1875 19.0625 1.3125 18.1875C0.4375 17.3125 0 16.25 0 15C0 13.75 0.4375 12.6875 1.3125 11.8125C2.1875 10.9375 3.25 10.5 4.5 10.5C5.075 10.5 5.625 10.6065 6.15 10.8195C6.675 11.0325 7.15 11.326 7.575 11.7L18.15 5.55C18.1 5.4 18.0625 5.2315 18.0375 5.0445C18.0125 4.8575 18 4.676 18 4.5C18 3.25 18.4375 2.1875 19.3125 1.3125C20.1875 0.4375 21.25 0 22.5 0C23.75 0 24.8125 0.4375 25.6875 1.3125C26.5625 2.1875 27 3.25 27 4.5C27 5.75 26.5625 6.8125 25.6875 7.6875C24.8125 8.5625 23.75 9 22.5 9C21.925 9 21.375 8.894 20.85 8.682C20.325 8.47 19.85 8.176 19.425 7.8L8.85 13.95C8.9 14.1 8.9375 14.269 8.9625 14.457C8.9875 14.645 9 14.826 9 15C9 15.175 8.9875 15.3565 8.9625 15.5445C8.9375 15.7325 8.9 15.901 8.85 16.05L19.425 22.2C19.85 21.825 20.325 21.5315 20.85 21.3195C21.375 21.1075 21.925 21.001 22.5 21C23.75 21 24.8125 21.4375 25.6875 22.3125C26.5625 23.1875 27 24.25 27 25.5C27 26.75 26.5625 27.8125 25.6875 28.6875C24.8125 29.5625 23.75 30 22.5 30Z"
                        fill="#1858B8"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="top-product__price price-product">
                <div className="price-product__text title">до 75 грн/кг</div>
                <div className="price-product__sub-text">
                  від 3000 кг - 60 грн/кг
                </div>
              </div>
            </div>
          </div>
          <div className="product__body body-product">
            <div className="body-product__content">
              <div className="body-product__images">
                <Swiper
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Thumbs]}
                  spaceBetween={20}
                  slidesPerView={1}
                  speed={800}
                  className="body-product__slider"
                >
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/product/01.jpg"
                      alt="Image"
                      width={1000}
                      height={1000}
                    />
                  </SwiperSlide>
                </Swiper>

                <div className="body-product__thumbs-slider-wrapper">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView="auto"
                    speed={800}
                    navigation={{
                      prevEl: ".thumbs-slider-body-product-button-prev",
                      nextEl: ".thumbs-slider-body-product-button-next",
                    }}
                    modules={[Navigation]}
                    className="body-product__thumbs-slider"
                  >
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/product/01.jpg"
                        alt="Image"
                        width={1000}
                        height={1000}
                      />
                    </SwiperSlide>
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
              </div>
              <div className="top-product__body">
                <div className="top-product__block">
                  <h2 className="top-product__title title">
                    Продам Гранулу РР (Поліпропілен)
                  </h2>
                  <div className="top-product__actions">
                    <button className="like">
                      <svg
                        width="33"
                        height="30"
                        viewBox="0 0 33 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.0002 26.7323L14.998 26.7303C10.7549 22.8862 7.35391 19.7972 4.9962 16.9153C2.65494 14.0535 1.5 11.58 1.5 8.99183C1.5 4.77155 4.78535 1.5 9 1.5C11.3943 1.5 13.7168 2.62136 15.2258 4.37798L16.3636 5.70249L17.5015 4.37798C19.0105 2.62136 21.3329 1.5 23.7273 1.5C27.9419 1.5 31.2273 4.77155 31.2273 8.99183C31.2273 11.58 30.0723 14.0535 27.7311 16.9153C25.3734 19.7972 21.9724 22.8862 17.7293 26.7303L17.7271 26.7323L16.3636 27.9724L15.0002 26.7323Z"
                          fill="white"
                          stroke="#BA360C"
                          stroke-width="3"
                        />
                      </svg>
                    </button>
                    <a href="#" className="share">
                      <svg
                        width="27"
                        height="30"
                        viewBox="0 0 27 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.5 30C21.25 30 20.1875 29.5625 19.3125 28.6875C18.4375 27.8125 18 26.75 18 25.5C18 25.325 18.0125 25.1435 18.0375 24.9555C18.0625 24.7675 18.1 24.599 18.15 24.45L7.575 18.3C7.15 18.675 6.675 18.969 6.15 19.182C5.625 19.395 5.075 19.501 4.5 19.5C3.25 19.5 2.1875 19.0625 1.3125 18.1875C0.4375 17.3125 0 16.25 0 15C0 13.75 0.4375 12.6875 1.3125 11.8125C2.1875 10.9375 3.25 10.5 4.5 10.5C5.075 10.5 5.625 10.6065 6.15 10.8195C6.675 11.0325 7.15 11.326 7.575 11.7L18.15 5.55C18.1 5.4 18.0625 5.2315 18.0375 5.0445C18.0125 4.8575 18 4.676 18 4.5C18 3.25 18.4375 2.1875 19.3125 1.3125C20.1875 0.4375 21.25 0 22.5 0C23.75 0 24.8125 0.4375 25.6875 1.3125C26.5625 2.1875 27 3.25 27 4.5C27 5.75 26.5625 6.8125 25.6875 7.6875C24.8125 8.5625 23.75 9 22.5 9C21.925 9 21.375 8.894 20.85 8.682C20.325 8.47 19.85 8.176 19.425 7.8L8.85 13.95C8.9 14.1 8.9375 14.269 8.9625 14.457C8.9875 14.645 9 14.826 9 15C9 15.175 8.9875 15.3565 8.9625 15.5445C8.9375 15.7325 8.9 15.901 8.85 16.05L19.425 22.2C19.85 21.825 20.325 21.5315 20.85 21.3195C21.375 21.1075 21.925 21.001 22.5 21C23.75 21 24.8125 21.4375 25.6875 22.3125C26.5625 23.1875 27 24.25 27 25.5C27 26.75 26.5625 27.8125 25.6875 28.6875C24.8125 29.5625 23.75 30 22.5 30Z"
                          fill="#1858B8"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="top-product__price price-product">
                  <div className="price-product__text title">до 75 грн/кг</div>
                  <div className="price-product__sub-text">
                    від 3000 кг - 60 грн/кг
                  </div>
                </div>
              </div>
              <div
                data-showmore="size"
                className="body-product__description description-body-product"
              >
                <div className="description-body-product__title">
                  Опис товару:
                </div>
                <ReadMore>
                  Поліпропілен (ПП) - це хімічна сполука, що відноситься до
                  синтетичних полімерів. Він є продуктом полімеризації пропілену
                  та належить до класу поліолефінів. Завдяки винятковій міцності
                  та твердості вироби з поліпропілену використовуються в
                  багатьох
                </ReadMore>
              </div>
            </div>
            <div className="body-product__block">
              <div className="body-product__info info-body-product">
                <h4 className="info-body-product__title">000 “Сузірʼя”</h4>
                <p className="info-body-product__text">
                  Для більш детальної інформації перейдіть за посиланням на наш
                  сайт:{" "}
                </p>
                <a href="#" className="info-body-product__link">
                  www.polymer.com.ua
                </a>
                <div className="info-body-product__location location-info-body-product">
                  <div className="location-info-body-product__block">
                    <p className="location-info-body-product__text">
                      Місцезнаходження:
                    </p>
                    <div className="location-info-body-product__place">
                      Одеса, Одеська область
                    </div>
                  </div>
                  <div className="location-info-body-product__map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2136.316975280789!2d30.524308983010492!3d50.449978484175695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce517313ffff%3A0xa447b8f0aa513128!2z0JPQu9C-0LHRg9GB!5e0!3m2!1sru!2sua!4v1716397247674!5m2!1sru!2sua"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                <div className="info-body-product__contact contact-info-body-product">
                  <div className="contact-info-body-product__title">
                    Контактна особа:
                  </div>
                  <p className="contact-info-body-product__text">
                    Дмитро Вишнивецький
                  </p>
                </div>
              </div>
              <div className="body-product__actions actions-body-product">
                <div className="actions-body-product__block">
                  <a href="tel:" className="actions-body-product__call button">
                    Зателефонувати
                  </a>
                  <a href="#" className="actions-body-product__message button">
                    Написати повідомлення
                  </a>
                  <a
                    href="#"
                    className="actions-body-product__download button button--secondary"
                  >
                    <p>
                      Завантажити прекріпленні файли: <span>2 шт.</span>
                    </p>
                  </a>
                </div>
                <div className="actions-body-product__socials socials">
                  <p className="socials__text">Контакт у соц. мережах:</p>
                  <div className="socials__items">
                    <a href="#" className="socials__item">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_598_18032)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 17.5977C0 26.2996 6.31896 33.5329 14.5833 35V22.3606H10.2083V17.5H14.5833V13.6106C14.5833 9.23563 17.4023 6.80604 21.3894 6.80604C22.6523 6.80604 24.0144 7 25.2773 7.19396V11.6667H23.0417C20.9023 11.6667 20.4167 12.7356 20.4167 14.0977V17.5H25.0833L24.306 22.3606H20.4167V35C28.681 33.5329 35 26.2996 35 17.5977C35 7.91875 27.125 0 17.5 0C7.875 0 0 7.91875 0 17.5977Z"
                            fill="#0E274D"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <a href="#" className="socials__item">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="17.5"
                          cy="17.5"
                          r="17"
                          stroke="#0E274D"
                        ></circle>
                        <path
                          d="M28.5408 12.3432C28.4156 11.8894 28.1701 11.4756 27.8288 11.1432C27.4875 10.8108 27.0625 10.5714 26.5962 10.449C24.8799 10 18 10 18 10C18 10 11.1201 10 9.40379 10.4467C8.93733 10.5687 8.51207 10.8079 8.17073 11.1404C7.82939 11.4729 7.58398 11.8868 7.45915 12.3408C7 14.0127 7 17.5 7 17.5C7 17.5 7 20.9873 7.45915 22.6568C7.71205 23.5788 8.45848 24.3049 9.40379 24.551C11.1201 25 18 25 18 25C18 25 24.8799 25 26.5962 24.551C27.544 24.3049 28.2879 23.5788 28.5408 22.6568C29 20.9873 29 17.5 29 17.5C29 17.5 29 14.0127 28.5408 12.3432ZM15.8147 20.7006V14.2994L21.5112 17.4761L15.8147 20.7006Z"
                          fill="#0E274D"
                        ></path>
                      </svg>
                    </a>
                    <a href="#" className="socials__item">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="17.5"
                          cy="17.5"
                          r="17"
                          stroke="#0E274D"
                        ></circle>
                        <path
                          d="M22.9622 9H25.877L19.5106 16.2005L27 26H21.1373L16.5422 20.0582L11.2905 26H8.37158L15.1797 18.2969L8 9H14.0113L18.1606 14.431L22.9622 9ZM21.9383 24.2755H23.5526L13.1319 10.6346H11.3979L21.9383 24.2755Z"
                          fill="#0E274D"
                        ></path>
                      </svg>
                    </a>
                    <a href="#" className="socials__item">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.1308 7C20.3682 7.0033 20.9963 7.0099 21.5386 7.0253L21.752 7.033C21.9984 7.0418 22.2415 7.0528 22.5351 7.066C23.7055 7.121 24.504 7.30579 25.2047 7.57749C25.9307 7.85688 26.5422 8.23527 27.1538 8.84576C27.7131 9.39563 28.1459 10.0608 28.422 10.7949C28.6937 11.4956 28.8785 12.2942 28.9335 13.4656C28.9467 13.7582 28.9577 14.0013 28.9665 14.2488L28.9731 14.4622C28.9896 15.0034 28.9962 15.6315 28.9984 16.869L28.9995 17.6896V19.1305C29.0022 19.9328 28.9938 20.7352 28.9742 21.5373L28.9676 21.7507C28.9588 21.9981 28.9478 22.2412 28.9346 22.5338C28.8796 23.7053 28.6926 24.5028 28.422 25.2046C28.1467 25.9391 27.7138 26.6044 27.1538 27.1537C26.6038 27.7129 25.9387 28.1456 25.2047 28.422C24.504 28.6937 23.7055 28.8785 22.5351 28.9335C22.2741 28.9458 22.0131 28.9568 21.752 28.9665L21.5386 28.9731C20.9963 28.9885 20.3682 28.9962 19.1308 28.9984L18.3103 28.9995H16.8704C16.0678 29.0023 15.2651 28.9938 14.4627 28.9742L14.2493 28.9676C13.9881 28.9577 13.7271 28.9463 13.4661 28.9335C12.2958 28.8785 11.4972 28.6937 10.7954 28.422C10.0614 28.1463 9.39655 27.7134 8.84744 27.1537C8.28762 26.6041 7.85444 25.9389 7.57811 25.2046C7.30642 24.5039 7.12163 23.7053 7.06663 22.5338C7.05438 22.2728 7.04338 22.0118 7.03363 21.7507L7.02813 21.5373C7.00786 20.7352 6.9987 19.9329 7.00063 19.1305V16.869C6.99756 16.0666 7.00563 15.2643 7.02483 14.4622L7.03253 14.2488C7.04133 14.0013 7.05233 13.7582 7.06553 13.4656C7.12053 12.2942 7.30532 11.4967 7.57701 10.7949C7.85322 10.06 8.28726 9.39467 8.84854 8.84576C9.39751 8.28639 10.0619 7.85357 10.7954 7.57749C11.4972 7.30579 12.2947 7.121 13.4661 7.066C13.7587 7.0528 14.0029 7.0418 14.2493 7.033L14.4627 7.0264C15.2647 7.00686 16.067 6.99842 16.8693 7.0011L19.1308 7ZM18.0001 12.4999C16.5415 12.4999 15.1426 13.0793 14.1112 14.1107C13.0798 15.1422 12.5004 16.5411 12.5004 17.9997C12.5004 19.4584 13.0798 20.8573 14.1112 21.8887C15.1426 22.9202 16.5415 23.4996 18.0001 23.4996C19.4587 23.4996 20.8576 22.9202 21.889 21.8887C22.9204 20.8573 23.4998 19.4584 23.4998 17.9997C23.4998 16.5411 22.9204 15.1422 21.889 14.1107C20.8576 13.0793 19.4587 12.4999 18.0001 12.4999ZM18.0001 14.6998C18.4334 14.6997 18.8625 14.785 19.2629 14.9508C19.6633 15.1166 20.0271 15.3596 20.3336 15.666C20.64 15.9723 20.8832 16.3361 21.0491 16.7364C21.215 17.1367 21.3004 17.5658 21.3005 17.9992C21.3005 18.4325 21.2152 18.8617 21.0495 19.2621C20.8837 19.6625 20.6407 20.0263 20.3343 20.3328C20.028 20.6392 19.6642 20.8824 19.2639 21.0483C18.8636 21.2142 18.4345 21.2996 18.0012 21.2997C17.126 21.2997 16.2867 20.952 15.6678 20.3331C15.049 19.7143 14.7013 18.8749 14.7013 17.9997C14.7013 17.1245 15.049 16.2852 15.6678 15.6663C16.2867 15.0475 17.126 14.6998 18.0012 14.6998M23.7759 10.8499C23.4112 10.8499 23.0615 10.9948 22.8037 11.2526C22.5458 11.5105 22.4009 11.8602 22.4009 12.2249C22.4009 12.5895 22.5458 12.9393 22.8037 13.1971C23.0615 13.455 23.4112 13.5998 23.7759 13.5998C24.1405 13.5998 24.4902 13.455 24.7481 13.1971C25.0059 12.9393 25.1508 12.5895 25.1508 12.2249C25.1508 11.8602 25.0059 11.5105 24.7481 11.2526C24.4902 10.9948 24.1405 10.8499 23.7759 10.8499Z"
                          fill="#0E274D"
                        ></path>
                        <circle
                          cx="17.5"
                          cy="17.5"
                          r="17"
                          stroke="#0E274D"
                        ></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Adverts /> */}
    </>
  );
}
