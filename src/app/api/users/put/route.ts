import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, token, userInfo } = await request.json();

  try {
    const res = await fetch(`http://13.60.7.255/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
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
