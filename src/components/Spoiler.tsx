import React, { useEffect, useRef, useState } from "react";

interface SpoilerProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean
}

const Spoiler: React.FC<SpoilerProps> = ({ className, title, children, isOpen = false }) => {
  const [isActive, setIsActive] = useState<boolean>(isOpen);
  const [height, setHeight] = useState<string>("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(isActive ? `${contentRef.current.scrollHeight}px` : "0px");
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      if (isActive) {
        updateHeight();
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [isActive]);

  const toggleActive = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className={`spollers__item ${className} ${isActive ? "active" : ""}`}>
      <div
        className={`spollers__title ${isActive ? "active" : ""}`}
        onClick={toggleActive}
      >
        {title}
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 0.3s ease",
        }}
        className="spollers__body"
      >
        <div className="spollers__content">{children}</div>
      </div>
    </div>
  );
};

export default Spoiler;
