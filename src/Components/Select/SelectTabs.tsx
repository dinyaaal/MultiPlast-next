"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface Option {
  label: string;
  link: string;
}

interface SelectProps {
  options: Option[];
}

export default function SelectTabs({ options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<string | undefined>();

  const { rootEl } = useClickOutside(() => setIsOpen(false));
  const router = useRouter();
  const currentPath = usePathname();
  const localeActive = useLocale(); // Получаем текущую локаль

  useEffect(() => {
    const matchedOption = options.find(
      (option) => `/${localeActive}${option.link}` === currentPath
    );
    if (matchedOption) {
      setSelectedLink(matchedOption.link);
    }
  }, [options, currentPath, localeActive]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (link: string) => {
    const localizedLink = `/${localeActive}${link}`; // Формируем ссылку с локалью
    if (localizedLink !== currentPath) {
      setSelectedLink(link);
      setIsOpen(false);
      router.push(localizedLink); // Навигация с локализованной ссылкой
    }
  };

  return (
    <div className="select select_input" ref={rootEl}>
      <div className={`select__body ${isOpen ? "active" : ""}`}>
        <button onClick={toggleMenu} type="button" className="select__title">
          <div className="select__value">
            {selectedLink && (
              <span className="select__content">
                {options.find((option) => option.link === selectedLink)?.label}
              </span>
            )}
          </div>
        </button>

        <div className="select__wrapper">
          <div className="select__options">
            {options
              .filter((option) => option.link !== selectedLink)
              .map((option) => (
                <button
                  key={option.link}
                  className="select__option"
                  type="button"
                  onClick={() => handleOptionClick(option.link)}
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
