import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const id = request.headers.get("id");
  if (!authHeader || !authHeader.startsWith("Bearer ") || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/chats/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${authHeader}`,
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
