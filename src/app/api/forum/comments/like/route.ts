import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // Зчитуємо JSON-тіло з forum_id і comment_id
    const body = await request.json();
    const { forum_id, comment_id } = body;

    if (!forum_id || !comment_id) {
      return NextResponse.json(
        { error: "Missing forum_id or comment_id" },
        { status: 400 }
      );
    }

    const res = await fetch(`http://176.118.167.92/api/forums/comments/like`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forum_id, comment_id }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
