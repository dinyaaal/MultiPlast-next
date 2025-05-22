"use client";

import React, { useEffect, useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
  className?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, className }) => {
  const [isActive, setIsActive] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const [descriptionLenght] = useState(50);

  useEffect(() => {
    if (!children?.toString()?.length) return;

    setIsLongText(children?.toString()?.length >= descriptionLenght);
  }, []);

  const text = children
    ?.toString()
    .slice(0, !isActive ? descriptionLenght : -1);

  return (
    <div className={`read-more ${isActive ? "active" : ""} ${className ?? ""}`}>
      <p className="read-more__text">{text}</p>
      {isLongText && (
        <button
          onClick={(_) => setIsActive(!isActive)}
          type="button"
          className="read-more__button"
        >
          {isActive ? "Сховати" : "Розгорнути повністю"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
