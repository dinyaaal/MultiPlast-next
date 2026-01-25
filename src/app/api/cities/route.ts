// app/api/novaposhta/cities/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NOVAPOSHTA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "No API key provided" }, { status: 500 });
  }

  const body = {
    apiKey,
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: {},
  };

  try {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      // cache: "force-cache",
      next: { revalidate: 86400 },
    });

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    const cities = data.data.map((city: any) => ({
      name_ua: city.Description,
      name_ru: city.DescriptionRu,
    }));

    return NextResponse.json(cities);
  } catch (error) {
    return NextResponse.json(
      { error: "Request failed", details: error },
      { status: 500 }
    );
  }
}
