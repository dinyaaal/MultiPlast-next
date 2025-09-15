"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition, FC } from "react";

const options = [
  { value: "ukr", label: "Укр" },
  { value: "ru", label: "Рус" },
];

interface LanguageProps {
  className?: string;
}

const Language: FC<LanguageProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rootEl } = useClickOutside(() => setIsOpen(false));

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname() || "";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setIsOpen(false);
    startTransition(() => {
      const cleanPath = pathname.replace(`/${localeActive}`, "");

      router.replace(`/${value}${cleanPath}`);
    });
  };

  return (
    <div className={`language ${className}`}>
      <div className="select select_input" ref={rootEl}>
        <div className={`select__body ${isOpen ? "active" : ""}`}>
          <button onClick={toggleMenu} type="button" className="select__title">
            <div className="select__value">
              <span className="select__content">
                {options.find((option) => option.value === localeActive)?.label}
              </span>
            </div>
          </button>

          <div className="select__wrapper">
            <div className="select__options">
              {options
                .filter((option) => option.value !== localeActive)
                .map((option) => (
                  <button
                    key={option.value}
                    className="select__option"
                    data-value={option.value}
                    type="button"
                    onClick={() => handleOptionClick(option.value)}
                    disabled={isPending}
                  >
                    {option.label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
