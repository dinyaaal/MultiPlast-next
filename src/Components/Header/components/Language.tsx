"use client";

import Select from "@/Components/Select/Select";
import React, { useState, FC } from "react";

const options = [
  { value: "UA", label: "Укр" },
  { value: "RU", label: "Рус" },
];

interface LanguageProps {
  className?: string;
}

const Language: FC<LanguageProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`language ${className}`}>
      <Select options={options} defaultValue="UA" />
    </div>
  );
};

export default Language;
