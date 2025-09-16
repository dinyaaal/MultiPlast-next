import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const bodyData = await request.json();
  const authHeader = request.headers.get("authorization");
  const id = request.headers.get("id");

  if (!authHeader) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/chats/${id}/send-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authHeader}`,
        },
        body: JSON.stringify(bodyData),
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
