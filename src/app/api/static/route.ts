import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.headers.get("id");

  try {
    const res = id ? await fetch(
      `https://multiplast-api.web-hub.online/api/static-data/${id}`,
      {
        method: "GET",
      }
    ) : await fetch(
      `https://multiplast-api.web-hub.online/api/static-data`,
      {
        method: "GET",
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
