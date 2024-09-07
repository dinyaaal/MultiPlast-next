"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Filters() {
  const [isPrimarySelected, setIsPrimarySelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handlePrimaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrimarySelected(event.target.checked);
  };
  return (
    <div className="trade__filters filters-trade">
      <button onClick={toggleMenu} className="filters-trade__button button">
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9999 14.3936C17.9999 14.5711 17.9288 14.7413 17.8022 14.8668C17.6756 14.9923 17.504 15.0628 17.3249 15.0628H12.735C12.5846 15.6186 12.2535 16.1097 11.793 16.4599C11.3325 16.8102 10.7684 17 10.188 17C9.60757 17 9.04339 16.8102 8.58289 16.4599C8.12239 16.1097 7.79131 15.6186 7.64097 15.0628H0.674998C0.495977 15.0628 0.324289 14.9923 0.197702 14.8668C0.0711155 14.7413 0 14.5711 0 14.3936C0 14.2161 0.0711155 14.0459 0.197702 13.9204C0.324289 13.7949 0.495977 13.7244 0.674998 13.7244H7.64097C7.79131 13.1686 8.12239 12.6775 8.58289 12.3272C9.04339 11.977 9.60757 11.7871 10.188 11.7871C10.7684 11.7871 11.3325 11.977 11.793 12.3272C12.2535 12.6775 12.5846 13.1686 12.735 13.7244H17.3249C17.504 13.7244 17.6756 13.7949 17.8022 13.9204C17.9288 14.0459 17.9999 14.2161 17.9999 14.3936ZM17.9999 2.60643C17.9999 2.78391 17.9288 2.95413 17.8022 3.07963C17.6756 3.20514 17.504 3.27564 17.3249 3.27564H15.1199C14.9696 3.83143 14.6385 4.32252 14.178 4.67276C13.7175 5.02301 13.1534 5.21285 12.573 5.21285C11.9926 5.21285 11.4284 5.02301 10.9679 4.67276C10.5074 4.32252 10.1763 3.83143 10.026 3.27564H0.674998C0.586356 3.27564 0.498582 3.25833 0.416687 3.2247C0.334793 3.19107 0.260381 3.14178 0.197702 3.07963C0.135023 3.01749 0.0853029 2.94372 0.0513811 2.86252C0.0174593 2.78133 0 2.69431 0 2.60643C0 2.51854 0.0174593 2.43152 0.0513811 2.35033C0.0853029 2.26913 0.135023 2.19536 0.197702 2.13322C0.260381 2.07108 0.334793 2.02178 0.416687 1.98815C0.498582 1.95452 0.586356 1.93721 0.674998 1.93721H10.026C10.1763 1.38142 10.5074 0.890336 10.9679 0.540088C11.4284 0.189841 11.9926 0 12.573 0C13.1534 0 13.7175 0.189841 14.178 0.540088C14.6385 0.890336 14.9696 1.38142 15.1199 1.93721H17.3249C17.4139 1.93601 17.5022 1.9525 17.5847 1.9857C17.6671 2.01891 17.742 2.06816 17.8049 2.13054C17.8679 2.19293 17.9175 2.26718 17.951 2.34891C17.9845 2.43065 18.0012 2.51821 17.9999 2.60643ZM17.9999 8.49554C18.0012 8.58375 17.9845 8.67132 17.951 8.75305C17.9175 8.83479 17.8679 8.90904 17.8049 8.97142C17.742 9.03381 17.6671 9.08305 17.5847 9.11626C17.5022 9.14947 17.4139 9.16596 17.3249 9.16476H6.79498C6.64464 9.72054 6.31356 10.2116 5.85306 10.5619C5.39256 10.9121 4.82838 11.102 4.24799 11.102C3.66759 11.102 3.10341 10.9121 2.64291 10.5619C2.18242 10.2116 1.85133 9.72054 1.70099 9.16476H0.674998C0.495977 9.16476 0.324289 9.09425 0.197702 8.96875C0.0711155 8.84325 0 8.67303 0 8.49554C0 8.31805 0.0711155 8.14783 0.197702 8.02233C0.324289 7.89683 0.495977 7.82632 0.674998 7.82632H1.70099C1.85133 7.27054 2.18242 6.77945 2.64291 6.4292C3.10341 6.07895 3.66759 5.88911 4.24799 5.88911C4.82838 5.88911 5.39256 6.07895 5.85306 6.4292C6.31356 6.77945 6.64464 7.27054 6.79498 7.82632H17.3249C17.504 7.82632 17.6756 7.89683 17.8022 8.02233C17.9288 8.14783 17.9999 8.31805 17.9999 8.49554Z"
            fill="#0E274D"
          />
        </svg>
        <span>Фільтри</span>
      </button>
      <div
        className={`filters-trade__body body-filters-trade ${
          isOpen ? "active" : ""
        }`}
      >
        <div className="body-filters-trade__wrapper">
          <button onClick={closeMenu} className="body-filters-trade__back">
            <Image
              src="/icons/arrow-back.svg"
              alt="Icon"
              width={1000}
              height={1000}
            />
            До товарів
          </button>
          <button onClick={toggleMenu} className="filters-trade__button button">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9999 14.3936C17.9999 14.5711 17.9288 14.7413 17.8022 14.8668C17.6756 14.9923 17.504 15.0628 17.3249 15.0628H12.735C12.5846 15.6186 12.2535 16.1097 11.793 16.4599C11.3325 16.8102 10.7684 17 10.188 17C9.60757 17 9.04339 16.8102 8.58289 16.4599C8.12239 16.1097 7.79131 15.6186 7.64097 15.0628H0.674998C0.495977 15.0628 0.324289 14.9923 0.197702 14.8668C0.0711155 14.7413 0 14.5711 0 14.3936C0 14.2161 0.0711155 14.0459 0.197702 13.9204C0.324289 13.7949 0.495977 13.7244 0.674998 13.7244H7.64097C7.79131 13.1686 8.12239 12.6775 8.58289 12.3272C9.04339 11.977 9.60757 11.7871 10.188 11.7871C10.7684 11.7871 11.3325 11.977 11.793 12.3272C12.2535 12.6775 12.5846 13.1686 12.735 13.7244H17.3249C17.504 13.7244 17.6756 13.7949 17.8022 13.9204C17.9288 14.0459 17.9999 14.2161 17.9999 14.3936ZM17.9999 2.60643C17.9999 2.78391 17.9288 2.95413 17.8022 3.07963C17.6756 3.20514 17.504 3.27564 17.3249 3.27564H15.1199C14.9696 3.83143 14.6385 4.32252 14.178 4.67276C13.7175 5.02301 13.1534 5.21285 12.573 5.21285C11.9926 5.21285 11.4284 5.02301 10.9679 4.67276C10.5074 4.32252 10.1763 3.83143 10.026 3.27564H0.674998C0.586356 3.27564 0.498582 3.25833 0.416687 3.2247C0.334793 3.19107 0.260381 3.14178 0.197702 3.07963C0.135023 3.01749 0.0853029 2.94372 0.0513811 2.86252C0.0174593 2.78133 0 2.69431 0 2.60643C0 2.51854 0.0174593 2.43152 0.0513811 2.35033C0.0853029 2.26913 0.135023 2.19536 0.197702 2.13322C0.260381 2.07108 0.334793 2.02178 0.416687 1.98815C0.498582 1.95452 0.586356 1.93721 0.674998 1.93721H10.026C10.1763 1.38142 10.5074 0.890336 10.9679 0.540088C11.4284 0.189841 11.9926 0 12.573 0C13.1534 0 13.7175 0.189841 14.178 0.540088C14.6385 0.890336 14.9696 1.38142 15.1199 1.93721H17.3249C17.4139 1.93601 17.5022 1.9525 17.5847 1.9857C17.6671 2.01891 17.742 2.06816 17.8049 2.13054C17.8679 2.19293 17.9175 2.26718 17.951 2.34891C17.9845 2.43065 18.0012 2.51821 17.9999 2.60643ZM17.9999 8.49554C18.0012 8.58375 17.9845 8.67132 17.951 8.75305C17.9175 8.83479 17.8679 8.90904 17.8049 8.97142C17.742 9.03381 17.6671 9.08305 17.5847 9.11626C17.5022 9.14947 17.4139 9.16596 17.3249 9.16476H6.79498C6.64464 9.72054 6.31356 10.2116 5.85306 10.5619C5.39256 10.9121 4.82838 11.102 4.24799 11.102C3.66759 11.102 3.10341 10.9121 2.64291 10.5619C2.18242 10.2116 1.85133 9.72054 1.70099 9.16476H0.674998C0.495977 9.16476 0.324289 9.09425 0.197702 8.96875C0.0711155 8.84325 0 8.67303 0 8.49554C0 8.31805 0.0711155 8.14783 0.197702 8.02233C0.324289 7.89683 0.495977 7.82632 0.674998 7.82632H1.70099C1.85133 7.27054 2.18242 6.77945 2.64291 6.4292C3.10341 6.07895 3.66759 5.88911 4.24799 5.88911C4.82838 5.88911 5.39256 6.07895 5.85306 6.4292C6.31356 6.77945 6.64464 7.27054 6.79498 7.82632H17.3249C17.504 7.82632 17.6756 7.89683 17.8022 8.02233C17.9288 8.14783 17.9999 8.31805 17.9999 8.49554Z"
                fill="#0E274D"
              />
            </svg>
            <span>Фільтри</span>
          </button>
          <div className="body-filters-trade__items spollers">
            <details className="item-filter spollers__item">
              <summary className="item-filter__title spollers__title">
                Тип оголошення
              </summary>
              <div className="item-filter__body spollers__body">
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Про продаж
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Про купівлю
                </label>
              </div>
            </details>
            <details className="item-filter spollers__item">
              <summary className="item-filter__title spollers__title">
                Сировина
              </summary>
              <div className="item-filter__body spollers__body">
                <label id="primary-raw" className="check">
                  <input
                    onChange={handlePrimaryChange}
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Первинна сировина
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Вторинна сировина
                </label>
                {isPrimarySelected && (
                  <div className="item-filter__block item-filter__block--primary active">
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      HDPE (полиэтилен низкого давления)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      LDPE (полиэтилен высокого давления)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      LLDPE (линейный полиэтилен высокого давления)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      PP (полипропилен)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      PS (полистирол)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      ABS пластик (акрилонитрил бутадиен стирол)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      PET (полиэтилентерефталат)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      PA (полиамид)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      POM (полиацеталь)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      PC (поликарбонат)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      PVC (поливинилхлорид)
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      Другие полимеры
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="real-checkbox"
                      />
                      <span className="custom-checkbox"></span>
                      Процессинговые добавки и красители для полимеров
                    </label>
                  </div>
                )}
              </div>
            </details>

            <details className="item-filter spollers__item">
              <summary className="item-filter__title spollers__title">
                Обладнання для переробки полімерів
              </summary>
              <div className="item-filter__body spollers__body">
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Гранулятор
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Дробарка
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Міксер
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Устаткування для миття полімерів
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Лінія по переробці відходів
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Термопластавтомат
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Литні форми і преформи
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Видувне устаткування
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Автозавантажувач і сушка для полімерів
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Екструдер
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Устаткування для виробництва пакетів
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Устаткування для виробництва одноразового посуду
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Устаткування для видува ПЕТ тари
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Машина для різання бобін
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Машина для флексадруку
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Інші машини
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Запасні частини та комплектуючі
                </label>
              </div>
            </details>
            <details className="item-filter spollers__item">
              <summary className="item-filter__title spollers__title">
                Послуги
              </summary>
              <div className="item-filter__body spollers__body">
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Лиття на термопластавтоматах
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Друк на полімерній плівці
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Порізка полімерної плівки
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Миття, дроблення, агломерація, грануляція
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Виготовлення ливарних форм та преформ
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Виготовлення, налагодження та модернізація обладнання
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Ремонт та відновлення обладнання
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Інші послуги
                </label>
              </div>
            </details>

            <div className="item-filter">
              <div className="item-filter__title">
                <label className="check">
                  <input
                    type="checkbox"
                    name="remember"
                    className="real-checkbox"
                  />
                  <span className="custom-checkbox"></span>
                  Діючий бізнес
                </label>
              </div>
            </div>
          </div>
          <button className="body-filters-trade__button button">
            Застосувати фільтри
          </button>
        </div>
      </div>
    </div>
  );
}
