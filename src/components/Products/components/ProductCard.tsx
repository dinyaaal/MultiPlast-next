"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { MinimalProduct } from "@/types/types";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import ProductLike from "./ProductLike";
import ProductEdit from "./ProductEdit";

export const ProductCard: React.FC<{
  product: MinimalProduct;
  liked?: boolean;
  onUnlike?: (id: number) => void;
}> = ({ product, liked = false, onUnlike }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("Product");

  // const favorites = useSelector((state: RootState) => state.favorites.items);
  // const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const getPriceUnit = (type_price: string): string => {
    return t(`price-types.${type_price}`);
  };







  function formatPrice(value: number): string {
    const str = value.toString();
    if (str.length > 6) {
      return str.slice(0, 6) + "...";
    }
    return str;
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="adverts__item item-advert"
    >
      <div className="item-advert__image">
        <Image
          src={
            product.photos.length > 0
              ? product.photos[0].url
              : "/image-not-found.png"
          }
          alt={"Image"}
          width={1000}
          height={1000}
        />
      </div>
      <div className="item-advert__body">
        <div className="item-advert__content">
          {/* <div className="item-advert__value">{product.volume}</div> */}
          <div className="flex flex-col">
            <div className="item-advert__name">{product.title}</div>
            <div className="">
              <span>{product.city}</span> -{" "}
              <span>
                {new Date(product.updated_at).toLocaleDateString("uk-UA")}
              </span>
            </div>
          </div>
        </div>
        <div className="item-advert__bottom">
          {product.type_price === "by_arrangement" ? (
            <p>{t("price-types.by_arrangement")}</p>
          ) : (
            <div className="item-advert__price">
              <span>
                {formatPrice(product.price)} грн/
                {getPriceUnit(product.type_price)}
              </span>
            </div>
          )}

          {product.author && session?.user.id === product.author.id ? (
            <ProductEdit productId={product.id} />

            // <button
            //   onClick={(e) => {
            //     e.preventDefault();
            //     router.push(`/dashboard/add-advertisement?edit=${product.id}`);
            //   }}
            //   className={` edit `}
            // >
            //   <svg
            //     width="30"
            //     height="30"
            //     viewBox="0 0 30 30"
            //     fill="none"
            //     xmlns="http://www.w3.org/2000/svg"
            //   >
            //     <path
            //       d="M26.0395 3.24608L26.7539 3.96054C27.309 4.51557 27.309 5.41308 26.7539 5.96221L25.0357 7.68637L22.3136 4.96433L24.0319 3.24608C24.5869 2.69104 25.4844 2.69104 26.0336 3.24608H26.0395ZM12.3879 14.8959L20.312 6.966L23.034 9.68804L15.1041 17.6121C14.9328 17.7833 14.7203 17.9073 14.49 17.9722L11.0358 18.9583L12.0218 15.5041C12.0868 15.2738 12.2108 15.0613 12.382 14.89L12.3879 14.8959ZM22.0302 1.2444L10.3804 12.8884C9.86665 13.4021 9.49466 14.0339 9.29981 14.7247L7.61108 20.6293C7.46937 21.1253 7.60518 21.6567 7.97126 22.0228C8.33735 22.3889 8.86877 22.5247 9.36476 22.383L15.2694 20.6943C15.9661 20.4935 16.5979 20.1215 17.1057 19.6137L28.7556 7.96979C30.4148 6.31058 30.4148 3.61807 28.7556 1.95886L28.0411 1.2444C26.3819 -0.414801 23.6894 -0.414801 22.0302 1.2444ZM5.19608 3.54721C2.32643 3.54721 0 5.87364 0 8.7433V24.8039C0 27.6736 2.32643 30 5.19608 30H21.2567C24.1264 30 26.4528 27.6736 26.4528 24.8039V18.1907C26.4528 17.4054 25.821 16.7736 25.0357 16.7736C24.2504 16.7736 23.6186 17.4054 23.6186 18.1907V24.8039C23.6186 26.1088 22.5616 27.1658 21.2567 27.1658H5.19608C3.89116 27.1658 2.83423 26.1088 2.83423 24.8039V8.7433C2.83423 7.43837 3.89116 6.38144 5.19608 6.38144H11.8093C12.5946 6.38144 13.2264 5.74964 13.2264 4.96433C13.2264 4.17901 12.5946 3.54721 11.8093 3.54721H5.19608Z"
            //       fill="#B0BFD7"
            //     />
            //   </svg>
            // </button>
          ) : (
            <ProductLike liked={isLiked} product={product} onUnlike={onUnlike} />
            // <button
            //   className={` like ${isLiked ? "active" : ""}`}
            //   onClick={(e) => {
            //     e.preventDefault();
            //     handleLikeClick();
            //   }}
            // >
            //   <svg
            //     width="33"
            //     height="30"
            //     viewBox="0 0 33 30"
            //     fill="none"
            //     xmlns="http://www.w3.org/2000/svg"
            //   >
            //     <path
            //       d="M15.0002 26.7323L14.998 26.7303C10.7549 22.8862 7.35391 19.7972 4.9962 16.9153C2.65494 14.0535 1.5 11.58 1.5 8.99183C1.5 4.77155 4.78535 1.5 9 1.5C11.3943 1.5 13.7168 2.62136 15.2258 4.37798L16.3636 5.70249L17.5015 4.37798C19.0105 2.62136 21.3329 1.5 23.7273 1.5C27.9419 1.5 31.2273 4.77155 31.2273 8.99183C31.2273 11.58 30.0723 14.0535 27.7311 16.9153C25.3734 19.7972 21.9724 22.8862 17.7293 26.7303L17.7271 26.7323L16.3636 27.9724L15.0002 26.7323Z"
            //       fill="white"
            //       stroke="#BA360C"
            //       strokeWidth="3"
            //     />
            //   </svg>
            // </button>
          )}
        </div>
      </div>
    </Link>
  );
};
