import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  // Получаем formData из запроса
  // const formData = await request.formData();
  const jsonData = await request.json();

  const token = request.headers.get("token");
  const id = request.headers.get("id");

  if (!token) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://13.60.7.255/api/products/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    });

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
