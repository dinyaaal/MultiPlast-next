import { NextRequest, NextResponse } from "next/server";

const RESET_PASSWORD_URL =
  "https://api.multiplast.com.ua/api/users/reset-password";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const body: Record<string, unknown> = contentType.includes("application/json")
    ? await request.json()
    : Object.fromEntries(await request.formData());

  try {
    const res = await fetch(RESET_PASSWORD_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        password_confirmation: body.password_confirmation || body.password,
      }),
    });

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
