import React, { MouseEventHandler, useState } from "react";

interface SectionProps {
  title: string;
  text: string;
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function Section({ title, text, isActive, onClick }: SectionProps) {

  const isActiveClass = isActive ? " active" : ""

  return (
    <div onClick={onClick} className={"sections-forum__item item-sections-forum" + isActiveClass}>
      <div dangerouslySetInnerHTML={{ __html: title }} className="item-sections-forum__title" />
      <p dangerouslySetInnerHTML={{ __html: text }} className="item-sections-forum__text" />
    </div>
  );
}
