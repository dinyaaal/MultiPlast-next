import { useLocale } from "next-intl";
import React from "react";

const localeMap: Record<string, string> = {
  ukr: "uk",
  ru: "ru",
};

export default function ProductMap({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  const locale = useLocale();
  const mapLocale = localeMap[locale] || "en";
  return (
    <iframe
      src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=${mapLocale}&z=14&output=embed`}
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
