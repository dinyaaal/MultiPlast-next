"use client";

import React, { useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
  className?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, className }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`read-more ${isActive ? "active" : ""} ${className ?? ""}`}>
      <p className="read-more__text">{children}</p>
      <button
        onClick={toggleActive}
        type="button"
        className="read-more__button"
      >
        {isActive ? "Сховати" : "Розгорнути повністю"}
      </button>
    </div>
  );
};

export default ReadMore;
