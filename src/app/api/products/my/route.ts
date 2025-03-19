import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const status = url.searchParams.get("status");
  const perPage = url.searchParams.get("perPage");
  const page = url.searchParams.get("page");

  const queryParams = new URLSearchParams();
  if (status) queryParams.append("status", status);
  if (perPage) queryParams.append("perPage", perPage);
  if (page) queryParams.append("page", page);
  console.log(queryParams.toString());
  try {
    const res = await fetch(
      `https://multiplast.web-hub.online/api/products/my?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
