import React, { useEffect, useRef, useState } from "react";

interface SpoilerProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Spoiler: React.FC<SpoilerProps> = ({ className, title, children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isActive]);

  const toggleActive = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className={` spollers__item ${className} ${isActive ? "active" : ""}`}>
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
        }}
        className=" spollers__body"
      >
        <div className="spollers__content">{children}</div>
      </div>
    </div>
  );
};

export default Spoiler;
