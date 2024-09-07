"use client";

import React, { useState } from "react";

export default function PasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={`password input `}>
      <input
        autoComplete="off"
        type={isPasswordVisible ? "text" : "password"}
        placeholder=""
        className="password__input"
      />

      <button
        type="button"
        className={`password__button ${isPasswordVisible ? "active" : ""}`}
        onClick={togglePasswordVisibility}
      >
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
            fill="#838383"
          />
          <path
            d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
            fill="#838383"
          />
        </svg>
      </button>
    </div>
  );
}
