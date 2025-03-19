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
        },
        body,
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
