import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/contact-us`,
      {
        method: "POST",

        body: JSON.stringify(body),
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
