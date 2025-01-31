"use client";
import { Product } from "@/types/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function page() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    if (!session) return;

    try {
      const res = await fetch(`/api/products/my`);

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

  fetchProducts();

  return (
    <div className="advertisement__block my-advertisement__block">
      <h2 className="my-advertisement__title title title--small">
        Мої оголошення про купівлю
      </h2>
      <div className="my-advertisement__content"></div>
    </div>
  );
}
