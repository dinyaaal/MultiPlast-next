"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import ReadMore from "@/Components/ReadMore";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { ProductType } from "@/types/types";
import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/routing";
import { SocialsNetwork } from "./components/SocialsNetworks";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import { toast } from "sonner";

export default function Product({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const galleryRef = useRef<any>(null);

  function isEmpty(string: string | null | undefined) {
    return string ?? "";
  }

  // -=-=-=-=-=-=-=-=-=-=- Проверяем на наличие пользователя -=-=-=-=-=-=-=-=-=-=-

  const [isHasUser, setIsHasUser] = useState(
    product?.author && product?.author?.first_name && product?.author?.last_name
  );

  // Проверяем тогда, когда продукт прогрузился
  useEffect(() => {
    setIsHasUser(
      product?.author &&
        product?.author?.first_name &&
        product?.author?.last_name
    );
  }, [product?.author]);

  // -=-=-=-=-=-=-=-=-=-=- Проверяем на наличие пользователя -=-=-=-=-=-=-=-=-=-=-

  const fetchProduct = async () => {
    if (!params.id) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/products/product?id=${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError("Ошибка при загрузке продукта");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleLikeClick = async () => {
    if (!product) {
      return;
    }

    const handleFavoriteInCookies = (action: "add" | "remove") => {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("favorites="));

      let favorites = cookies
        ? JSON.parse(decodeURIComponent(cookies.split("=")[1]))
        : [];

      if (action === "add") {
        if (!favorites.some((item: any) => item.id === product.id)) {
          favorites.push(product);
          document.cookie = `favorites=${encodeURIComponent(
            JSON.stringify(favorites)
          )}; path=/; max-age=${365 * 24 * 60 * 60}`;
          toast.success("Товар добавлен в избранное");
          setIsLiked(!isLiked);
        }
      } else {
        favorites = favorites.filter((item: any) => item.id !== product.id);
        document.cookie = `favorites=${encodeURIComponent(
          JSON.stringify(favorites)
        )}; path=/; max-age=${365 * 24 * 60 * 60}`;
        toast.success("Товар убран из избранного");
        setIsLiked(!isLiked);
      }
    };

    if (status === "authenticated") {
      if (!isLiked) {
        try {
          const response = await fetch("/api/favorites/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: product.id,
              token: session?.user.access_token,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add to favorites");
          }

          const data = await response.json();
          console.log("Favorite added:", data);
          setIsLiked(true);
          toast.success("Товар добавлен в избранное");
          setIsLiked(!isLiked);
          // dispatch(addFavorite(product.id));
        } catch (error) {
          console.error("Error adding to favorites:", error);
          toast.error("Error adding to favorites");
        }
      } else {
        try {
          const response = await fetch("/api/favorites/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: product.id,
              token: session?.user.access_token,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to remove from favorites");
          }

          const data = await response.json();
          setIsLiked(!isLiked);
          // onUnlike?.(product.id);
          toast.success("Товар убран из избранного");
        } catch (error) {
          toast.error("Failed to remove from favorites");
        }
        setIsLiked(false);
      }
    } else if (status === "unauthenticated") {
      handleFavoriteInCookies(isLiked ? "remove" : "add");
    }
  };

  if (!product) {
    return (
      <div className="flex w-full h-full min-h-screen flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs position={product.title} />
      <section className="product">
        <div className="product__container">
          <div className="product__top top-product">
            <div className="top-product__body">
              <div className="top-product__block">
                <h2 className="top-product__title title">{product.title}</h2>
                <div className="top-product__actions">
                  {session?.user.id === product.author.id ? (
                    <Link
                      href={`/dashboard/add-advertisement?edit=${product.id}`}
                      className={` edit `}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.0395 3.24608L26.7539 3.96054C27.309 4.51557 27.309 5.41308 26.7539 5.96221L25.0357 7.68637L22.3136 4.96433L24.0319 3.24608C24.5869 2.69104 25.4844 2.69104 26.0336 3.24608H26.0395ZM12.3879 14.8959L20.312 6.966L23.034 9.68804L15.1041 17.6121C14.9328 17.7833 14.7203 17.9073 14.49 17.9722L11.0358 18.9583L12.0218 15.5041C12.0868 15.2738 12.2108 15.0613 12.382 14.89L12.3879 14.8959ZM22.0302 1.2444L10.3804 12.8884C9.86665 13.4021 9.49466 14.0339 9.29981 14.7247L7.61108 20.6293C7.46937 21.1253 7.60518 21.6567 7.97126 22.0228C8.33735 22.3889 8.86877 22.5247 9.36476 22.383L15.2694 20.6943C15.9661 20.4935 16.5979 20.1215 17.1057 19.6137L28.7556 7.96979C30.4148 6.31058 30.4148 3.61807 28.7556 1.95886L28.0411 1.2444C26.3819 -0.414801 23.6894 -0.414801 22.0302 1.2444ZM5.19608 3.54721C2.32643 3.54721 0 5.87364 0 8.7433V24.8039C0 27.6736 2.32643 30 5.19608 30H21.2567C24.1264 30 26.4528 27.6736 26.4528 24.8039V18.1907C26.4528 17.4054 25.821 16.7736 25.0357 16.7736C24.2504 16.7736 23.6186 17.4054 23.6186 18.1907V24.8039C23.6186 26.1088 22.5616 27.1658 21.2567 27.1658H5.19608C3.89116 27.1658 2.83423 26.1088 2.83423 24.8039V8.7433C2.83423 7.43837 3.89116 6.38144 5.19608 6.38144H11.8093C12.5946 6.38144 13.2264 5.74964 13.2264 4.96433C13.2264 4.17901 12.5946 3.54721 11.8093 3.54721H5.19608Z"
                          fill="#B0BFD7"
                        />
                      </svg>
                    </Link>
                  ) : (
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
                  )}

                  {/* <a href="#" className="share">
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
                  </a> */}
                </div>
              </div>
              <div className="top-product__price price-product">
                <div className="price-product__text title">
                  {product.type_price === "by_arrangement" ? (
                    <p>По договорённости</p>
                  ) : (
                    <>
                      <p>{product.price} грн</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="product__body body-product">
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
              <div className="body-product__content">
                {!!product.photos.length && (
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
                            className="cursor-zoom-in"
                            onClick={() =>
                              galleryRef.current.openGallery(index)
                            } // 👈 открываем по клику
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
                )}

                <div className="top-product__body">
                  <div className="top-product__block">
                    <h2 className="top-product__title title">
                      {product.title}
                    </h2>
                    <div className="top-product__actions">
                      {session?.user.id === product.author.id ? (
                        <Link
                          href={`/dashboard/add-advertisement?edit=${product.id}`}
                          className={` edit `}
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M26.0395 3.24608L26.7539 3.96054C27.309 4.51557 27.309 5.41308 26.7539 5.96221L25.0357 7.68637L22.3136 4.96433L24.0319 3.24608C24.5869 2.69104 25.4844 2.69104 26.0336 3.24608H26.0395ZM12.3879 14.8959L20.312 6.966L23.034 9.68804L15.1041 17.6121C14.9328 17.7833 14.7203 17.9073 14.49 17.9722L11.0358 18.9583L12.0218 15.5041C12.0868 15.2738 12.2108 15.0613 12.382 14.89L12.3879 14.8959ZM22.0302 1.2444L10.3804 12.8884C9.86665 13.4021 9.49466 14.0339 9.29981 14.7247L7.61108 20.6293C7.46937 21.1253 7.60518 21.6567 7.97126 22.0228C8.33735 22.3889 8.86877 22.5247 9.36476 22.383L15.2694 20.6943C15.9661 20.4935 16.5979 20.1215 17.1057 19.6137L28.7556 7.96979C30.4148 6.31058 30.4148 3.61807 28.7556 1.95886L28.0411 1.2444C26.3819 -0.414801 23.6894 -0.414801 22.0302 1.2444ZM5.19608 3.54721C2.32643 3.54721 0 5.87364 0 8.7433V24.8039C0 27.6736 2.32643 30 5.19608 30H21.2567C24.1264 30 26.4528 27.6736 26.4528 24.8039V18.1907C26.4528 17.4054 25.821 16.7736 25.0357 16.7736C24.2504 16.7736 23.6186 17.4054 23.6186 18.1907V24.8039C23.6186 26.1088 22.5616 27.1658 21.2567 27.1658H5.19608C3.89116 27.1658 2.83423 26.1088 2.83423 24.8039V8.7433C2.83423 7.43837 3.89116 6.38144 5.19608 6.38144H11.8093C12.5946 6.38144 13.2264 5.74964 13.2264 4.96433C13.2264 4.17901 12.5946 3.54721 11.8093 3.54721H5.19608Z"
                              fill="#B0BFD7"
                            />
                          </svg>
                        </Link>
                      ) : (
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
                      )}
                      {/* <a href="#" className="share">
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
                    </a> */}
                    </div>
                  </div>
                  <div className="top-product__price price-product">
                    <div className="price-product__text title">
                      {product.price} грн
                    </div>
                    {/* <div className="price-product__sub-text">
                    від 3000 кг - 60 грн/кг
                  </div> */}
                  </div>
                </div>
                <div
                  data-showmore="size"
                  className="body-product__description description-body-product"
                >
                  <div className="description-body-product__title">
                    Опис товару:
                  </div>
                  <ReadMore>{product.text}</ReadMore>
                </div>
              </div>
            </div>
            <div className="body-product__block">
              <div className="body-product__info info-body-product">
                {product.contact?.name_of_enterprise && (
                  <h4 className="info-body-product__title">
                    {product.contact.name_of_enterprise}
                  </h4>
                )}
                {/* <p className="info-body-product__text">
                  Для більш детальної інформації перейдіть за посиланням на наш
                  сайт:{" "}
                </p>
                <a href="#" className="info-body-product__link">
                  www.polymer.com.ua
                </a> */}
                {product.contact?.city && product.contact?.area && (
                  <div className="info-body-product__location location-info-body-product">
                    <div className="location-info-body-product__block">
                      <p className="location-info-body-product__text">
                        Місцезнаходження:
                      </p>
                      <div className="location-info-body-product__place">
                        {`${isEmpty(product?.contact?.city)}, ${isEmpty(
                          product?.contact?.area
                        )} область`}
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
                )}

                {isHasUser && (
                  <div className="info-body-product__contact contact-info-body-product">
                    <div className="contact-info-body-product__title">
                      Контактна особа:
                    </div>
                    <p className="contact-info-body-product__text">
                      {`${isEmpty(product?.author?.first_name)} ${isEmpty(
                        product?.author?.last_name
                      )}`}
                    </p>
                  </div>
                )}
              </div>
              <div className="body-product__actions actions-body-product">
                <div className="actions-body-product__block">
                  {product.contact?.phone_number && (
                    <Link
                      href={`tel:${product.contact.phone_number}`}
                      className="actions-body-product__call button"
                    >
                      Зателефонувати
                    </Link>
                  )}
                  <Link
                    href={`/messages/${product.author.id}`}
                    className="actions-body-product__message button"
                  >
                    Написати повідомлення
                  </Link>
                  {product.files && product.files.length > 0 && (
                    <Link
                      href="#"
                      className="actions-body-product__download button button--secondary"
                    >
                      <p>
                        Завантажити прекріпленні файли:{" "}
                        <span>{product.files.length}</span>
                      </p>
                    </Link>
                  )}
                </div>

                <SocialsNetwork />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Adverts /> */}
    </>
  );
}
