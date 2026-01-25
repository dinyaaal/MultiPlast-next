import { ButtonMain } from "@/components/ButtonMain";
import { MinimalProduct } from "@/types/types";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductLikeProps {
    liked?: boolean;
    product: MinimalProduct;
    onUnlike?: (id: number) => void;
}

export default function ProductLike({ liked, product, onUnlike }: ProductLikeProps) {
    const { data: session, status } = useSession();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const t = useTranslations("Product");

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
    }, [liked, status, product]);

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
            photos: product.photos.length > 0 ? [{ url: product.photos[0].url }] : [],
            type_price: product.type_price,
            price: product.price,
            author: product.author ? { id: product.author.id } : null,
            volume: product.volume,
            price_per_volume: product.price_per_volume,
            city: product.city,
            updated_at: product.updated_at,

        };

        if (action === "add") {
            if (!favorites.some((item: any) => item.id === product.id)) {
                const newFavorites = [...favorites, minimalProduct];
                const encoded = encodeURIComponent(JSON.stringify(newFavorites));
                document.cookie = `favorites=${encoded}; path=/; max-age=${365 * 24 * 60 * 60
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
            document.cookie = `favorites=${encoded}; path=/; max-age=${365 * 24 * 60 * 60
                }`;

            // Проверяем, что кука обновилась
            const updatedCookies = document.cookie
                .split("; ")
                .find((row) => row.startsWith("favorites="));

            if (!updatedCookies || !updatedCookies.includes(encoded)) {
                toast.error(t("toast.favorites-remove-error"));
                setIsLiked(true);
                return;
            }
            toast.success(t("toast.favorites-remove-success"));
            setIsLiked(false);
            onUnlike?.(product.id);
        }
    };

    const handleLikeClick = async () => {




        if (status === "authenticated") {
            if (!isLiked) {
                try {
                    const response = await fetch("/api/favorites/add", {
                        method: "POST",

                        body: JSON.stringify({
                            id: product.id,
                            token: session?.user.access_token,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to add to favorites");
                    }

                    const data = await response.json();
                    setIsLiked(true);
                    toast.success(t("toast.favorites-add-success"));
                    // dispatch(addFavorite(product.id));
                } catch (error) {
                    console.error("Error adding to favorites:", error);
                    toast.error(t("toast.favorites-add-error"));
                }
            } else {
                try {
                    const response = await fetch("/api/favorites/delete", {
                        method: "POST",

                        body: JSON.stringify({
                            id: product.id,
                            token: session?.user.access_token,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to remove from favorites");
                    }

                    const data = await response.json();
                    setIsLiked(false);
                    onUnlike?.(product.id);
                    toast.success(t("toast.favorites-remove-success"));
                } catch (error) {
                    toast.error(t("toast.favorites-remove-error"));
                }
                setIsLiked(false);
            }
        } else if (status === "unauthenticated") {
            handleFavoriteInCookies(isLiked ? "remove" : "add");
        }
    };

    return (
        <ButtonMain
            type="button"
            color='transparent'
            // className={` like ${isLiked ? "active" : ""}`}
            isIconOnly
            onClick={(e) => {
                e.preventDefault();
                handleLikeClick();
            }}
        >
            <Heart className={` size-8 text-redColor ${isLiked ? "fill-redColor" : "fill-transparent"}`} />

        </ButtonMain>
    );
}