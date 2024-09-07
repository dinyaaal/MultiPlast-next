import React from "react";

interface SectionProps {
  title: string;
  text: string;
}

export default function Section({ title, text }: SectionProps) {
  return (
    <div className="sections-forum__item item-sections-forum">
      <div className="item-sections-forum__title">{title}</div>
      <p className="item-sections-forum__text">{text}</p>
    </div>
  );
}
