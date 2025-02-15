import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, token } = await request.json();

    if (!id || !token) {
      return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
    }

    const res = await fetch(`http://13.60.7.255/api/favorites/add/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
