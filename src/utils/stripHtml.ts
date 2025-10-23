/**
 * Удаляет все HTML теги из строки
 * @param html - строка с HTML тегами
 * @returns очищенная строка без HTML тегов
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  
  // Создаем временный DOM элемент для парсинга HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Получаем только текстовое содержимое
  return tempDiv.textContent || tempDiv.innerText || '';
}

/**
 * Удаляет все HTML теги из строки (серверная версия)
 * Использует регулярное выражение для удаления тегов
 * @param html - строка с HTML тегами
 * @returns очищенная строка без HTML тегов
 */
export function stripHtmlServer(html: string): string {
  if (!html) return '';
  
  // Удаляем все HTML теги с помощью регулярного выражения
  return html.replace(/<[^>]*>/g, '');
}
