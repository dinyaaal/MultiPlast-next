"use client";

import React, { useEffect, useRef, useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
  className?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * 3; // высота 3 строк

    // Если высота текста больше чем высота двух строк — показываем кнопку
    setShowButton(el.scrollHeight > maxHeight);
  }, [children]);
  return (
    <div
      className={`read-more whitespace-pre-wrap ${
        isExpanded ? "active" : ""
      }  ${className ?? ""}`}
    >
      {/* <p className="read-more__text">{text}</p> */}
      <p ref={textRef} className={`read-more__text`}>
        {children}
      </p>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          className="read-more__button"
        >
          {isExpanded ? "Сховати" : "Розгорнути повністю"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
