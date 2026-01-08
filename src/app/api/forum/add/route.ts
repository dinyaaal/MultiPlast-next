import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Получаем formData из запроса
  const formData = await request.formData();

  const token = request.headers.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://176.118.167.92/api/forums`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
