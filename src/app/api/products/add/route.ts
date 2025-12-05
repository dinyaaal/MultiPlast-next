// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   // Получаем formData из запроса
//   const formData = await request.formData();

//   const token = request.headers.get("token");

//   if (!token) {
//     return NextResponse.json({ error: "Missing id or token" }, { status: 400 });
//   }

//   try {
//     const res = await fetch(
//       `https://multiplast-api.web-hub.online/api/products`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return NextResponse.error();
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = request.headers.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://multiplast-api.web-hub.online/api/products`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const text = await res.text(); // ← читаем как текст

    if (!res.ok) {
      console.error("Backend error HTML:", text);
      return NextResponse.json(
        { error: "Backend responded with error", backend: text },
        { status: res.status }
      );
    }

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (err) {
      console.error("Invalid JSON from backend:", text);
      return NextResponse.json(
        { error: "Invalid JSON", backend: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Fetch failed", details: String(error) },
      { status: 500 }
    );
  }
}
