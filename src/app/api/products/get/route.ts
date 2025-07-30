import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = request.headers.get("token");
  // const typeOfProduct = url.searchParams.get("type_of_product");
  // const categoriesParam = url.searchParams.get("categories");
  // const perPage = url.searchParams.get("perPage");
  // const page = url.searchParams.get("page");

  // const queryParams = new URLSearchParams();

  // if (typeOfProduct) queryParams.append("type_of_product", typeOfProduct);
  // if (categoriesParam) queryParams.append("categories", categoriesParam);
  // if (perPage) queryParams.append("perPage", perPage);
  // if (page) queryParams.append("page", page);

  // console.log(queryParams.toString());

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/products?${url.searchParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: "Bearer " + token }),
        },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
