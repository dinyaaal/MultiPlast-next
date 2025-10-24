import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const id = request.headers.get("id");

  if (!authHeader) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    // Получаем FormData из запроса
    const formData = await request.formData();
    
    // Логируем содержимое для отладки
    console.log('Received FormData:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    // Создаем новый FormData для отправки на API
    const apiFormData = new FormData();
    
    // Копируем все поля из исходного FormData
    for (const [key, value] of formData.entries()) {
      apiFormData.append(key, value);
    }
    
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/chats/${id}/send-message`,
      {
        method: "POST",
        headers: {
          Authorization: `${authHeader}`,
        },
        body: apiFormData,
      }
    );

    // if (!res?.ok) {
    //   throw new Error(res?.statusText);
    // }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
