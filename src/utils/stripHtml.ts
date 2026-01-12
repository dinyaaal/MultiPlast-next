/**
 * Удаляет все HTML теги из строки
 * @param html - строка с HTML тегами
 * @returns очищенная строка без HTML тегов
 */

// export function stripHtml(html: string): string {
//   if (!html) return "";

//   // Если есть document — мы на клиенте
//   if (typeof document !== "undefined") {
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;
//     return tempDiv.textContent || tempDiv.innerText || "";
//   }

//   // Сервер: используем регэксп
//   return html.replace(/<[^>]*>/g, "");
// }

/**
 * Удаляет все HTML теги из строки (серверная версия)
 * Использует регулярное выражение для удаления тегов
 * @param html - строка с HTML тегами
 * @returns очищенная строка без HTML тегов
 */
// export function stripHtmlServer(html: string): string {
//   if (!html) return "";

//   // Удаляем все HTML теги с помощью регулярного выражения
//   return html.replace(/<[^>]*>/g, "");
// }
export function stripHtml(html: string): string {
  if (!html) return "";

  return (
    html
      // 1. Убираем image-upload блоки полностью
      .replace(/<div[^>]*data-type=["']image-upload["'][^>]*>.*?<\/div>/gi, "")

      // 2. Заменяем блочные теги на перенос строки
      .replace(/<\/?(p|div|h[1-6]|br)[^>]*>/gi, "\n")

      // 3. Убираем inline-теги, но сохраняем текст
      .replace(/<\/?(strong|em|u|code|span|a)[^>]*>/gi, "")

      // 4. Убираем все остальные теги
      .replace(/<[^>]*>/g, "")

      // 5. HTML entities
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")

      // 6. Убираем лишние пустые строки
      .replace(/\n\s*\n/g, "\n\n")

      // 7. Трим
      .trim()
  );
}
