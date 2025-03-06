"use client";

import Image from "next/image";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Link } from "@/i18n/routing";

export default function ChatItem() {
  return (
    <Link href="/messages/19" className="block-chat__item item-block-chat">
      {/* <div className="item-block-chat__topic topic-message">
        <div className="topic-message__block">
          <p className="topic-message__title">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            dolorum libero odit sed fugit consequatur obcaecati vero repellat
            eius fuga.
          </p>
          <div className="topic-message__user">
            <p>
              Контактна особа: <span>Дмитро Вишнивецький</span>
            </p>
          </div>
        </div>
        <div className="topic-message__image">
          <Image src="/advert/01.jpg" alt="Image" width={100} height={100} />
        </div>
      </div> */}
      <div className="item-block-chat__message">
        <div className="item-block-chat__image">
          <div className="notification-value">
            <span className="notification-value__number">99</span>
          </div>
        </div>
        <div className="item-block-chat__body">
          <div className="item-block-chat__info">
            <div className="item-block-chat__block">
              <div className="item-block-chat__name">Дмитро В.</div>
              <span className="item-block-chat__date">23.01.24</span>
            </div>
            <Popover
              placement="bottom-end"
              className="item-block-chat__actions actions-menu"
              classNames={{
                content: ["p-0"],
              }}
            >
              <PopoverTrigger>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="actions-menu__icon"
                >
                  <svg
                    width="13"
                    height="3"
                    viewBox="0 0 13 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="1.5" cy="1.5" r="1.5" fill="#0E274D" />
                    <circle cx="6.5" cy="1.5" r="1.5" fill="#0E274D" />
                    <circle cx="11.5" cy="1.5" r="1.5" fill="#0E274D" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="actions-menu__body body-actions-menu">
                  <menu className="body-actions-menu__list">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="body-actions-menu__item"
                    >
                      Поскаржитися
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="body-actions-menu__item"
                    >
                      Заблокувати
                    </button>

                    <button
                      onClick={(e) => e.preventDefault()}
                      className="body-actions-menu__item body-actions-menu__item--red"
                    >
                      Видалити
                    </button>
                  </menu>
                </div>
              </PopoverContent>
            </Popover>
            {/* <div className="item-block-chat__actions actions-menu">
              <div className="actions-menu__icon">
                <svg
                  width="13"
                  height="3"
                  viewBox="0 0 13 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#0E274D" />
                  <circle cx="6.5" cy="1.5" r="1.5" fill="#0E274D" />
                  <circle cx="11.5" cy="1.5" r="1.5" fill="#0E274D" />
                </svg>
              </div>
              <div className="actions-menu__body body-actions-menu">
                <ul className="body-actions-menu__list">
                  <li className="body-actions-menu__item">
                    <a href="#" className="body-actions-menu__button">
                      Поскаржитися
                    </a>
                  </li>
                  <li className="body-actions-menu__item">
                    <a href="#" className="body-actions-menu__button">
                      Заблокувати
                    </a>
                  </li>
                  <li className="body-actions-menu__item body-actions-menu__item--red">
                    <a href="#" className="body-actions-menu__button">
                      Видалити
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
          <p className="item-block-chat__text">
            Вітаю! Потрібна допомога в здісненні платежу....
          </p>
        </div>
      </div>
    </Link>
  );
}
