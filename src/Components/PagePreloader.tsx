"use client";

import { usePathname } from "@/i18n/routing";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const excludedRoutes = ["/dashboard", "/about"];

  // Если путь начинается с одного из исключённых маршрутов — скрываем лоадер
  const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (isExcluded) return;

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname, isExcluded]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${
        loading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <Image
        src="/preloader/logo.svg"
        alt="Logo"
        className={`w-full max-w-[40vw] transition-transform duration-300 ${
          loading ? "scale-100" : "scale-0"
        }`}
      />
    </div>
  );
}
