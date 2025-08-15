"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // при монтировании включаем видимость
    setVisible(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="/preloader/logo.svg"
        alt="Logo"
        className={`w-full max-w-[30vw] transition-transform duration-500 ${
          visible ? "scale-100" : "scale-0"
        }`}
      />
    </div>
  );
}
