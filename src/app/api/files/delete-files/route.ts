import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const { file_ids } = await request.json();
  if (!authHeader) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/remove-files`,
      {
        method: "POST",
        headers: {
          Authorization: `${authHeader}`,
        },
        body: JSON.stringify({ file_ids: file_ids }),
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
