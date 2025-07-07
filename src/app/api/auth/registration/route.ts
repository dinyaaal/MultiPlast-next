import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    city,
    agreement,
    password,
    passwordConfirmation,
  } = await request.json();

  const body = JSON.stringify({
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    city: city,
    verify_cookie: agreement,
    password: password,
    password_confirmation: passwordConfirmation,
  });

  try {
    const res = await fetch(
      "https://multiplast.web-hub.online/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
      }
    );

    const data = await res.json(); // всегда парсим json, даже если ошибка

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
