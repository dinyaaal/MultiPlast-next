"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: string; // defaultValue теперь необязательный
  placeholder?: string; // Добавляем placeholder
}

export default function Select({
  options,
  defaultValue,
  placeholder = "Select an option", // Дефолтное значение для placeholder
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const { rootEl } = useClickOutside(() => setIsOpen(false));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="select select_input" ref={rootEl}>
      <div className={`select__body ${isOpen ? "active" : ""}`}>
        <button onClick={toggleMenu} type="button" className="select__title">
          <div className="select__value">
            {selectedValue ? (
              <span className="select__content">
                {
                  options.find((option) => option.value === selectedValue)
                    ?.label
                }
              </span>
            ) : (
              <span className="select__placeholder">{placeholder}</span>
            )}
          </div>
        </button>

        <div className="select__wrapper">
          <div className="select__options">
            {options
              .filter((option) => option.value !== selectedValue)
              .map((option) => (
                <button
                  key={option.value}
                  className="select__option"
                  data-value={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
