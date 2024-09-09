import React, { useEffect, useRef, useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
  className?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, className }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("auto");
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      setHeight(
        isActive ? `${contentRef.current.scrollHeight}px` : `${lineHeight}px`
      );
    }
  }, [isActive]);

  const toggleActive = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className={`read-more ${isActive ? " active " : ""}`}>
      <p
        ref={contentRef}
        style={{
          maxHeight: height,
        }}
        className="read-more__text"
      >
        {children}
      </p>
      <button
        onClick={toggleActive}
        type="button"
        className="read-more__button"
      >
        {isActive ? <span>Сховати</span> : <span>Розгорнути повністю</span>}
      </button>
    </div>
  );
};

export default ReadMore;
