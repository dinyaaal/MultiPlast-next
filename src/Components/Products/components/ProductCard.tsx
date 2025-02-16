"use client";

import { RootState } from "@/store/store";
import { Product } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";



export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  
  const { data: session, status } = useSession();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const [isLiked, setIsLiked] = useState<boolean>(isFavorite);

  useEffect(() => {
    setIsLiked(isFavorite);
  }, [isFavorite]);

  console.log(isFavorite)
  const handleLikeClick = async () => {
    if (status==='unauthenticated') {
      toast.error('Сначала войдите в аккаунт')
      return
    }
    if(!isLiked) {
      try {
        const response = await fetch("/api/favorites/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product.id, token: session?.user.access_token }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add to favorites");
        }
  
        const data = await response.json();
        console.log("Favorite added:", data);
        setIsLiked(true);
        toast.success('Товар добавлен в избранное')
      } catch (error) {
        console.error("Error adding to favorites:", error);
        toast.error('Error adding to favorites')
      }
    } else {
      setIsLiked(false)
    }
    

  };

  return (
    <Link href={`./products/${product.id}`} className="adverts__item item-advert">
      <div className="item-advert__image">
        {/* <Image src="/advert/01.jpg" alt="Image" width={1000} height={1000} /> */}
        <Image
          src={
            product.photos.length > 0 ? product.photos[0].url : "/advert/01.jpg"
          }
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
          {product.type_price === "by_arrangement" ? (
            <p>По договорённости</p>
          ) : (
            <div className="item-advert__price">
              <span>${product.price} грн</span>
            </div>
          )}

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
