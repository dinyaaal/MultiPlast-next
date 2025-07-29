import ReadMore from "@/Components/ReadMore";
import { ProductType } from "@/types/types";
import { Link } from "@/i18n/routing";
import { SocialsNetwork } from "./components/SocialsNetworks";
import React from "react";
import { ProductActions } from "./components/ProductActions";
import { ProductPhotos } from "./components/ProductPhotos";
import notFound from "@/app/[locale]/not-found";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsClient } from "@/Components/Breadcrumbs";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Params = Promise<{ id: string }>;

async function getProduct(
  id: string,
  token: string
): Promise<ProductType | null> {
  console.log("token", token);
  console.log("id", id);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/product?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { token: token }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const data = await response.json();
    return data as ProductType;
  } catch (err) {
    return null;
  }
}

export default async function Product(props: { params: Params }) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  console.log(session);
  const product = await getProduct(params.id, session?.user.access_token || "");
  const t = await getTranslations("Product");
  const tb = await getTranslations("Breadcrumbs");

  function isEmpty(string: string | null | undefined) {
    return string ?? "";
  }

  const getPriceUnit = (type_price: string): string => {
    return t(`price-types.${type_price}`);
  };

  if (!product) {
    return notFound();
  }

  const crumbs = [
    { label: tb("home"), href: "/" },
    { label: tb("products"), href: "/products" },
    { label: product.title },
  ];

  return (
    <>
      <BreadcrumbsClient items={crumbs} />
      <section className="product">
        <div className="product__container">
          <div className="product__top top-product">
            <div className="w-full flex flex-col gap-2 ">
              <div className="flex items-center justify-between gap-3">
                <span>ID: {product.id}</span>
                <span>
                  {t(`published`)}:{" "}
                  {new Date(product.created_at).toLocaleDateString("uk-UA")}
                </span>
              </div>
              <div className="top-product__body">
                <div className="top-product__block">
                  <h2 className="top-product__title title">{product.title}</h2>
                  <div className="top-product__actions">
                    <ProductActions product={product} />
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
                      <p>{t(`price-types.by_arrangement`)}</p>
                    ) : (
                      <>
                        <p>
                          {product.price} грн/{getPriceUnit(product.type_price)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className=" price-product self-end w-fit">
                {product.volume && product.price_per_volume && (
                  <div className="price-product__text title title--small">
                    От {product.volume} кг - {product.price_per_volume} грн
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="product__body body-product">
            <div className="body-product__content-wrapper">
              <div className="body-product__content">
                <ProductPhotos product={product} />
                <div className="top-product__body">
                  <div className="top-product__block">
                    <h2 className="top-product__title title">
                      {product.title}
                    </h2>
                    <div className="top-product__actions">
                      <ProductActions product={product} />

                      {/* {session?.user.id === product.author.id ? (
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
                              strokeWidth="3"
                            />
                          </svg>
                        </button>
                      )} */}
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
                  <div className=" price-product  w-fit">
                    {product.volume && product.price_per_volume && (
                      <div className="price-product__text title title--small">
                        От {product.volume} кг - {product.price_per_volume} грн
                      </div>
                    )}
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

                {/* {isHasUser && (
                )} */}
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
                  {session && (
                    <Link
                      href={`/messages/${product.author.id}`}
                      className="actions-body-product__message button"
                    >
                      Написати повідомлення
                    </Link>
                  )}
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
