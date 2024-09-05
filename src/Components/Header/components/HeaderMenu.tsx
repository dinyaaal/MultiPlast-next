"use client";

import { useClickOutside } from "@/hooks/ClickOutside";
import Image from "next/image";
import React, { useState } from "react";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rootEl } = useClickOutside(setIsOpen);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      ref={rootEl}
      onClick={toggleMenu}
      className={`bottom-header__menu menu-bottom-header ${
        isOpen ? "active" : ""
      } `}
    >
      <div className="menu-bottom-header__icon">
        <Image src="/icons/menu.svg" alt="Icon" width={18} height={18} />
      </div>
      <div className="menu-bottom-header__text">Меню</div>

      <div className="menu-bottom-header__body ">
        <div className="menu-bottom-header__items ">
          <a href="#" className="menu-bottom-header__item">
            Про проект
          </a>
          <a href="#" className="menu-bottom-header__item">
            Угода користувача
          </a>
          <a href="#" className="menu-bottom-header__item">
            Як продати й купити?
          </a>
        </div>
      </div>
    </div>
  );
}
