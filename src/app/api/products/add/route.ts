import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  // const token = request.headers.get("token");
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/products`,
      {
        method: "POST",
        headers: {
          Authorization: `${authHeader}`,
        },
        body: formData,
      }
    );

    const text = await res.text(); // ← читаем как текст

    if (!res.ok) {
      console.error("Backend error HTML:", text);
      return NextResponse.json(
        { error: "Backend responded with error", backend: text },
        { status: res.status }
      );
    }

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (err) {
      console.error("Invalid JSON from backend:", text);
      return NextResponse.json(
        { error: "Invalid JSON", backend: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Fetch failed", details: String(error) },
      { status: 500 }
    );
  }
}
