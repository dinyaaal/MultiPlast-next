import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("token");

  try {
    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products list:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
