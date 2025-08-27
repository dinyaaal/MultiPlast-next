"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let minDelayPassed = false;
    let pageLoaded = false;

    const hidePreloader = () => {
      if (minDelayPassed && pageLoaded) {
        setVisible(false);
      }
    };

    const timer = setTimeout(() => {
      minDelayPassed = true;
      hidePreloader();
    }, 2000);

    if (document.readyState === "complete") {
      pageLoaded = true;
      hidePreloader();
    } else {
      window.addEventListener("load", () => {
        pageLoaded = true;
        hidePreloader();
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", hidePreloader);
    };
  }, []);

  //  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
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
