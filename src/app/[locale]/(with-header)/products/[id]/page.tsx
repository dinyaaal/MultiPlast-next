"use server";

import { ProductType } from "@/types/types";

import React, { Suspense } from "react";
import notFound from "@/app/[locale]/not-found";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsClient } from "@/components/Breadcrumbs";
import { authOptions } from "@/lib/authOptions";
import CreateMessage from "@/components/Messages/CreateMessage";
import ReadMore from "@/components/ReadMore";
import { Link } from "@/i18n/routing";
import { ProductActions } from "./components/ProductActions";
import { ProductPhotos } from "./components/ProductPhotos";
import { SocialsNetwork } from "./components/SocialsNetworks";
import ProductMap from "./components/ProductMap";

type Params = Promise<{ id: string }>;

async function getProduct(
  id: string,
  token: string
): Promise<ProductType | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/product?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { token: token }),
        },
        cache: "no-store",
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
                    </div>
                  </div>
                  <div className="top-product__price price-product">
                    <div className="price-product__text title">
                      {product.price} грн
                    </div>
                  </div>
                  {product.volume && product.price_per_volume && (
                    <div className=" price-product  w-fit">
                      <div className="price-product__text title title--small">
                        От {product.volume} кг - {product.price_per_volume} грн
                      </div>
                    </div>
                  )}
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

                <div className="info-body-product__location location-info-body-product">
                  {product.contacts[0]?.city && product.contacts[0]?.area && (
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
                  )}
                  <div className="location-info-body-product__map">
                    {/* <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2136.316975280789!2d30.524308983010492!3d50.449978484175695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce517313ffff%3A0xa447b8f0aa513128!2z0JPQu9C-0LHRg9GB!5e0!3m2!1sru!2sua!4v1716397247674!5m2!1sru!2sua"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe> */}
                    <ProductMap
                      latitude={product.latitude}
                      longitude={product.longitude}
                    />
                  </div>
                </div>

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
                        className="flex w-full flex-col gap-4 border border-border rounded-lg p-5"
                      >
                        <div className="flex flex-col w-full gap-2">
                          <div className="">{contact.name}</div>
                          {contact.position && (
                            <p className="">{contact.position}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-3">

                        {contact.phones && (
                          <Link href={`tel:${contact.phones}`} className="link">
                            {contact.phones}
                          </Link>
                        )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <CreateMessage id={product.author.id} />
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
      </section>
      {/* <Adverts /> */}
    </>
  );
}
