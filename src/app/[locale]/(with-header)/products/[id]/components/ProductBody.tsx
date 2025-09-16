"use server";

import ReadMore from "@/Components/ReadMore";
import { ProductType } from "@/types/types";
import { Link } from "@/i18n/routing";
import React from "react";
import notFound from "@/app/[locale]/not-found";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { authOptions } from "@/lib/authOptions";
import CreateMessage from "@/Components/Messages/CreateMessage";
import { ProductActions } from "./ProductActions";
import { ProductPhotos } from "./ProductPhotos";
import { SocialsNetwork } from "./SocialsNetworks";

interface ProductBodyProps {
  product: ProductType;
}

export default async function ProductBody({ product }: ProductBodyProps) {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Product");
  const tb = await getTranslations("Breadcrumbs");

  // const [product, t, tb] = await Promise.all([
  //   getProduct(params.id, session?.user.access_token || ""),
  //   getTranslations("Product"),
  //   getTranslations("Breadcrumbs"),
  // ]);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  function isEmpty(string: string | null | undefined) {
    return string ?? "";
  }

  const getPriceUnit = (type_price: string): string => {
    return t(`price-types.${type_price}`);
  };

  if (!product) {
    return notFound();
  }

  return (
    <>
      <div className="product__container main-container">
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
                  <h2 className="top-product__title title">{product.title}</h2>
                  <div className="top-product__actions">
                    <ProductActions product={product} />
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
              {product.contacts[0]?.name_of_enterprise && (
                <h4 className="info-body-product__title">
                  {product.contacts[0]?.name_of_enterprise}
                </h4>
              )}
              {/* <p className="info-body-product__text">
                  Для більш детальної інформації перейдіть за посиланням на наш
                  сайт:{" "}
                </p>
                <a href="#" className="info-body-product__link">
                  www.polymer.com.ua
                </a> */}
              {product.contacts[0]?.city && product.contacts[0]?.area && (
                <div className="info-body-product__location location-info-body-product">
                  <div className="location-info-body-product__block">
                    <p className="location-info-body-product__text">
                      Місцезнаходження:
                    </p>
                    <div className="location-info-body-product__place">
                      {`${isEmpty(product?.contacts[0]?.city)}, ${isEmpty(
                        product?.contacts[0]?.area
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
                <div className="flex flex-col gap-5 w-full">
                  <h4 className="title title--small">Контакти:</h4>
                  {product.contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex w-full flex-col gap-4"
                    >
                      <div className="flex flex-col w-full gap-2">
                        <div className="">{contact.name}</div>
                        <p className="">{contact.position}</p>
                      </div>
                      {contact.phone_number && (
                        <Link
                          href={`tel:${contact.phone_number}`}
                          className="link"
                        >
                          {contact.phone_number}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                {session && (
                  // <Link
                  //   href={`/messages/${product.author.id}`}
                  //   className="actions-body-product__message button"
                  // >
                  //   Написати повідомлення
                  // </Link>
                  <CreateMessage id={product.author.id} />
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

              <SocialsNetwork product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
