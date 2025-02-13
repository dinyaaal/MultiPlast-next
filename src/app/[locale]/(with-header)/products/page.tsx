
import React from "react";
import { ProductsBody } from "./components/ProductsBody";


const fetchCategories = async () => {
  const res = await fetch(`http://13.60.7.255/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};



export default async function Products() {

  const categories = await fetchCategories();




  return (
    <>
      <ProductsBody categories={categories}/>

      {/* <Adverts /> */}
    </>
  );
}
