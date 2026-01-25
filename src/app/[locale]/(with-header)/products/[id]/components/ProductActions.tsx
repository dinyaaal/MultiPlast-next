"use client";

import { ProductType } from "@/types/types";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/routing";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { saveToRecentProducts } from "@/utils/saveToRecentProducts";
import { useTranslations } from "next-intl";
import ShareBtn from "@/components/shareBtn";
import { ButtonMain } from "@/components/ButtonMain";
import { Heart, SquarePen } from "lucide-react";
import ProductLike from "@/components/Products/components/ProductLike";
import ProductEdit from "@/components/Products/components/ProductEdit";

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
      city: product.city,
      updated_at: product.updated_at,
    };

    saveToRecentProducts(minimalProduct);
  }, [product]);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     const cookies = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("favorites="));

  //     const favorites = cookies
  //       ? JSON.parse(decodeURIComponent(cookies.split("=")[1]))
  //       : [];

  //     const likedFromCookies = favorites.some(
  //       (item: any) => item.id === product.id
  //     );

  //     setIsLiked(likedFromCookies);
  //   } else {
  //     setIsLiked(product.is_liked);
  //   }
  // }, [status, product]);

  // const handleLikeClick = async () => {
  //   if (!product) {
  //     return;
  //   }

  //   const handleFavoriteInCookies = (action: "add" | "remove") => {
  //     const cookies = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("favorites="));

  //     let favorites = cookies
  //       ? JSON.parse(decodeURIComponent(cookies.split("=")[1]))
  //       : [];

  //     const minimalProduct = {
  //       id: product.id,
  //       title: product.title,
  //       photos:
  //         product.photos.length > 0 ? [{ url: product.photos[0].url }] : [],
  //       type_price: product.type_price,
  //       price: product.price,
  //       author: product.author ? { id: product.author.id } : null,
  //       volume: product.volume,
  //       price_per_volume: product.price_per_volume,
  //     };

  //     if (action === "add") {
  //       if (!favorites.some((item: any) => item.id === product.id)) {
  //         const newFavorites = [...favorites, minimalProduct];
  //         const encoded = encodeURIComponent(JSON.stringify(newFavorites));
  //         document.cookie = `favorites=${encoded}; path=/; max-age=${365 * 24 * 60 * 60
  //           }`;

  //         // Проверяем, сохранилась ли кука
  //         const updatedCookies = document.cookie
  //           .split("; ")
  //           .find((row) => row.startsWith("favorites="));

  //         if (!updatedCookies || !updatedCookies.includes(encoded)) {
  //           toast.error(t("toast.favorites-add-error"));
  //           setIsLiked(false);
  //           return;
  //         }

  //         toast.success(t("toast.favorites-add-success"));

  //         setIsLiked(true);
  //       }
  //     } else {
  //       favorites = favorites.filter((item: any) => item.id !== product.id);
  //       const encoded = encodeURIComponent(JSON.stringify(favorites));
  //       document.cookie = `favorites=${encoded}; path=/; max-age=${365 * 24 * 60 * 60
  //         }`;

  //       // Проверяем, что кука обновилась
  //       const updatedCookies = document.cookie
  //         .split("; ")
  //         .find((row) => row.startsWith("favorites="));

  //       if (!updatedCookies || !updatedCookies.includes(encoded)) {
  //         toast.success(t("toast.favorites-remove-error"));

  //         setIsLiked(true);
  //         return;
  //       }

  //       toast.success(t("toast.favorites-remove-success"));

  //       setIsLiked(false);
  //     }
  //   };

  //   if (status === "authenticated") {
  //     if (!isLiked) {
  //       try {
  //         const response = await fetch("/api/favorites/add", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             id: product.id,
  //             token: session?.user.access_token,
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to add to favorites");
  //         }

  //         const data = await response.json();
  //         console.log("Favorite added:", data);
  //         setIsLiked(true);
  //         toast.success(t("toast.favorites-add-success"));

  //         setIsLiked(!isLiked);
  //         // dispatch(addFavorite(product.id));
  //       } catch (error) {
  //         console.error("Error adding to favorites:", error);
  //         toast.error(t("toast.favorites-add-error"));
  //       }
  //     } else {
  //       try {
  //         const response = await fetch("/api/favorites/delete", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             id: product.id,
  //             token: session?.user.access_token,
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to remove from favorites");
  //         }

  //         const data = await response.json();
  //         setIsLiked(!isLiked);
  //         // onUnlike?.(product.id);
  //         toast.success(t("toast.favorites-remove-success"));
  //       } catch (error) {
  //         toast.success(t("toast.favorites-remove-error"));
  //       }
  //       setIsLiked(false);
  //     }
  //   } else if (status === "unauthenticated") {
  //     handleFavoriteInCookies(isLiked ? "remove" : "add");
  //   }
  // };

  return (
    <>
      <div className="top-product__actions">
        {session?.user.id === product.author.id ? (
          <ProductEdit productId={product.id} />
          // <ButtonMain as={Link} href={`/dashboard/add-advertisement?edit=${product.id}`} color='transparent' isIconOnly>

          //   <SquarePen className="size-8 text-border" />
          // </ButtonMain>
        ) : (
          <ProductLike product={product} />
          // <ButtonMain
          //   isIconOnly

          //   className={`  ${isLiked ? "active" : ""}`}
          //   type="button"
          //   onPress={handleLikeClick}
          //   color='transparent'
          // // variant='bordered'
          // >
          //   <Heart className={` size-8 text-redColor ${isLiked ? "fill-redColor" : "fill-transparent"}`} />
          // </ButtonMain>
        )}
        <ShareBtn />
      </div>


    </>
  );
}
