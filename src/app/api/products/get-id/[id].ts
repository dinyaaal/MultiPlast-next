import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { id } = req.query;

  if (!id ) {
    return res.status(400).json({ error: "Неверный ID" });
  }

  try {
    const response = await fetch(`http://13.60.7.255/products/${id}`);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const product = await response.json();

    return res.status(200).json(product);
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
