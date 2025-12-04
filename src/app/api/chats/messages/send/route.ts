import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Получаем formData из запроса
  const formData = await request.formData();
  // const token = request.headers.get("token");
  const authHeader = request.headers.get("authorization");
  const id = request.headers.get("id");
  if (!authHeader || !id) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/chats/${id}/send-message`,
      {
        method: "POST",
        headers: {
          Authorization: `${authHeader}`,
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
