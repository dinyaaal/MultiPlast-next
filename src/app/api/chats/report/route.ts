import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = request.headers.get("id");
  const authHeader = request.headers.get("authorization");

  if (!id || !authHeader) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://176.118.167.92/api/chats/report/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authHeader}`,
      },
      body: JSON.stringify(body),
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
