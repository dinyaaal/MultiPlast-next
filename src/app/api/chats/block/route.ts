import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const bodyData = await request.json();
  const token = request.headers.get("token");
  const id = request.headers.get("id");

  if (!token) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://13.60.7.255/api/chats/block/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(bodyData),
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
