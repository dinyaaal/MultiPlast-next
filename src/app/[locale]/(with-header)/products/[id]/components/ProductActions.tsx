"use client";

import { ProductType } from "@/types/types";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/routing";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { saveToRecentProducts } from "@/utils/saveToRecentProducts";
import { useTranslations } from "next-intl";

export function ProductActions({ product }: { product: ProductType }) {
  const t = useTranslations("Product");
  const [isLiked, setIsLiked] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const minimalProduct = {
      id: product.id, // или `${product.id}`
      title: product.title,
      photos: product.photos,
      type_price: product.type_price,
      price: product.price,
      author: product.author,
      is_liked: product.is_liked,
      volume: product.volume,
      price_per_volume: product.price_per_volume,
    };

    saveToRecentProducts(minimalProduct);
  }, [product]);

  useEffect(() => {
    if (status === "unauthenticated") {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("favorites="));

      const favorites = cookies
        ? JSON.parse(decodeURIComponent(cookies.split("=")[1]))
        : [];

      const likedFromCookies = favorites.some(
        (item: any) => item.id === product.id
      );

      setIsLiked(likedFromCookies);
    } else {
      setIsLiked(product.is_liked);
    }
  }, [status, product]);

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

      const minimalProduct = {
        id: product.id,
        title: product.title,
        photos:
          product.photos.length > 0 ? [{ url: product.photos[0].url }] : [],
        type_price: product.type_price,
        price: product.price,
        author: product.author ? { id: product.author.id } : null,
        volume: product.volume,
        price_per_volume: product.price_per_volume,
      };

      if (action === "add") {
        if (!favorites.some((item: any) => item.id === product.id)) {
          const newFavorites = [...favorites, minimalProduct];
          const encoded = encodeURIComponent(JSON.stringify(newFavorites));
          document.cookie = `favorites=${encoded}; path=/; max-age=${
            365 * 24 * 60 * 60
          }`;

          // Проверяем, сохранилась ли кука
          const updatedCookies = document.cookie
            .split("; ")
            .find((row) => row.startsWith("favorites="));

          if (!updatedCookies || !updatedCookies.includes(encoded)) {
            toast.error(t("toast.favorites-add-error"));
            setIsLiked(false);
            return;
          }

          toast.success(t("toast.favorites-add-success"));

          setIsLiked(true);
        }
      } else {
        favorites = favorites.filter((item: any) => item.id !== product.id);
        const encoded = encodeURIComponent(JSON.stringify(favorites));
        document.cookie = `favorites=${encoded}; path=/; max-age=${
          365 * 24 * 60 * 60
        }`;

        // Проверяем, что кука обновилась
        const updatedCookies = document.cookie
          .split("; ")
          .find((row) => row.startsWith("favorites="));

        if (!updatedCookies || !updatedCookies.includes(encoded)) {
          toast.success(t("toast.favorites-remove-error"));

          setIsLiked(true);
          return;
        }

        toast.success(t("toast.favorites-remove-success"));

        setIsLiked(false);
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
          toast.error(t("toast.favorites-add-success"));

          setIsLiked(!isLiked);
          // dispatch(addFavorite(product.id));
        } catch (error) {
          console.error("Error adding to favorites:", error);
          toast.error(t("toast.favorites-add-error"));
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
          toast.success(t("toast.favorites-remove-success"));
        } catch (error) {
          toast.success(t("toast.favorites-remove-error"));
        }
        setIsLiked(false);
      }
    } else if (status === "unauthenticated") {
      handleFavoriteInCookies(isLiked ? "remove" : "add");
    }
  };

  return (
    <>
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
              strokeWidth="3"
            />
          </svg>
        </button>
      )}
    </>
  );
}
