import React from "react";

export default function Preloader() {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity opacity-100 duration-500 `}
    >
      <img
        src="/preloader/logo.svg"
        alt="Logo"
        className={`w-full max-w-[30vw] transition-transform duration-500 `}
      />
    </div>
  );
}
