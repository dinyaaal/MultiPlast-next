import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const token = request.headers.get("token");
  const id = request.headers.get("id");

  if (!token && !id) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast.web-hub.online/api/products/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
