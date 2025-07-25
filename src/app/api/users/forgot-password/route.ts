import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast.web-hub.online/api/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("External API error:", data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        message: "Unexpected server error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
