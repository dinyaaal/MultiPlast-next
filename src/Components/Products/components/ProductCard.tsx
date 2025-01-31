"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ProductProps {
  title: string;
  price: number | null;
  type_price: string;
  photoUrl: string;
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Link href="#" className="adverts__item item-advert">
      <div className="item-advert__image">
        {/* <Image src="/advert/01.jpg" alt="Image" width={1000} height={1000} /> */}
        <Image
          src={product.photoUrl ? product.photoUrl : "/advert/01.jpg"}
          alt={product.title}
          width={1000}
          height={1000}
        />
      </div>
      <div className="item-advert__body">
        <div className="item-advert__content">
          <div className="item-advert__name">{product.title}</div>
          {/* <div className="item-advert__value">125г</div> */}
        </div>
        <div className="item-advert__bottom">
          <div className="item-advert__price">
            <span>
              {product.type_price === "by_arrangement"
                ? "По договорённости"
                : `${product.price} грн`}
            </span>
          </div>
          <button
            type="button"
            className={`item-advert__like like ${isLiked ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleLikeClick();
            }}
          >
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5964 20.0475L10.5957 20.0469C7.49587 17.2385 4.96312 14.9402 3.19949 12.7845C1.44134 10.6355 0.5 8.68942 0.5 6.59401C0.5 3.16654 3.17912 0.5 6.6 0.5C8.53702 0.5 10.4043 1.40349 11.6207 2.81954L12 3.26105L12.3793 2.81954C13.5957 1.40349 15.463 0.5 17.4 0.5C20.8209 0.5 23.5 3.16654 23.5 6.59401C23.5 8.68942 22.5587 10.6355 20.8005 12.7845C19.0369 14.9402 16.5041 17.2385 13.4043 20.0469L13.4036 20.0475L12 21.3241L10.5964 20.0475Z"
                fill="white"
                stroke="#BA360C"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};
