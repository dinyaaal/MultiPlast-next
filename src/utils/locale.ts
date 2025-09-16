export function getLocale(locale: string) {
  switch (locale) {
    case "ukr":
      return "uk"; // украинский
    case "ru":
      return "ru"; // русский
    default:
      return "uk"; // fallback
  }
}
