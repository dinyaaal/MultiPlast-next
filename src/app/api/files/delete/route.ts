import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  const id = request.headers.get("id");

  if (!authHeader || !id) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://176.118.167.92/api/remove-file/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${authHeader}`,
      },
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
