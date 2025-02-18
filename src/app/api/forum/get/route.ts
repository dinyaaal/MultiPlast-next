import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  try {
    const res = await fetch(
      `http://13.60.7.255/api/forums`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
