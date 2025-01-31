"use client";
import { ProductCard } from "@/Components/Products/components/ProductCard";
import { Product } from "@/types/types";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import router from "next/router";
import React, { useEffect, useState } from "react";

export default function page() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    if (!session) return;

    try {
      const res = await fetch(
        `/api/products/my?token=${session.user.access_token}&status=1`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if (data) {
        console.log(data.data);
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts();
    }
  }, [status]);

  if (status === "unauthenticated") {
    <div className="advertisement__block my-advertisement__block">
      <h2 className="my-advertisement__title title title--small">
        Мої оголошення про купівлю
      </h2>
      <div className="my-advertisement__content"></div>
    </div>;
  }

  if (status === "loading") {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="advertisement__block my-advertisement__block">
      <h2 className="my-advertisement__title title title--small">
        Мої оголошення про купівлю
      </h2>
      <div className="my-advertisement__content">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Нет товаров</p>
        )}
      </div>
    </div>
  );
}
