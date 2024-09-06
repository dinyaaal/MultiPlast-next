import React from "react";

export default function Profile() {
  return (
    <>
      <div className="advertisement__wrapper wrapper-advertisement advertisement-contacts">
        <div className="wrapper-advertisement__body body-advertisement">
          <div className="body-advertisement__wrapper">
            <div className="advertisement-contacts__user user-advertisement-contacts user-advertisement-contacts--mobile">
              <div className="user-advertisement-contacts__block">
                <p className="user-advertisement-contacts__name">Дмитро</p>
                <p className="user-advertisement-contacts__surname">
                  Вишнивецький
                </p>
              </div>
              <div className="advertisement-contacts__photo photo-advertisement-contacts">
                <div className="photo-advertisement-contacts__image"></div>
                <label className="photo-advertisement-contacts__save button">
                  Завантажити фото
                  <input autoComplete="off" type="file" />
                </label>
              </div>
            </div>

            <div className="advertisement-contacts__data data-advertisement-contacts">
              <div className="data-advertisement-contacts__body body-advertisement__block">
                <h2 className="body-advertisement__title title title--small">
                  Контактні дані
                </h2>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Прізвище*</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder=""
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Імʼя*</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder=""
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>По батькові*</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder=""
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Стать</p>
                      <div className="gender__items">
                        <div className="gender__item">Ч</div>
                        <div className="gender__item">Ж</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <p>Дата народження</p>
                  <div className="birth-date">
                    <div className="birth-date__item">
                      <select
                        name="form[]"
                        data-scroll="130"
                        data-class-modif="input"
                      >
                        <option
                          value=""
                          data-class="select__placeholder"
                          selected
                        ></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div className="birth-date__item">
                      <select
                        name="form[]"
                        data-scroll="130"
                        data-class-modif="input"
                      >
                        <option
                          value=""
                          data-class="select__placeholder"
                          selected
                        ></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div className="birth-date__item">
                      <select
                        name="form[]"
                        data-scroll="130"
                        data-class-modif="input"
                      >
                        <option
                          value=""
                          data-class="select__placeholder"
                          selected
                        ></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Номер телефону*</p>
                      <input
                        autoComplete="off"
                        type="number"
                        placeholder="Номер телефону"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Пошта*</p>
                      <input
                        autoComplete="off"
                        type="email"
                        placeholder="Пошта"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Назва підприємства</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Назва підприємства"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на сайт</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на сайт"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Країна</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Країна"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Область</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Область"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Місто</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Місто"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Адреса</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Адреса"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на Instagram</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на Instagram"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на Telegram/Viber</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на Telegram/Viber"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на Facebook</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на Facebook"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на YouTube</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на YouTube"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <p className="data-advertisement-contacts__text">
                  Поля, що відмічені *, обовʼязкові для заповнення
                </p>
              </div>
              <button className="data-advertisement-contacts__save button">
                Зберегти
              </button>
            </div>

            <div className="body-advertisement__block advertisement-contacts__block">
              <div className="advertisement-contacts__user-block">
                <div className="advertisement-contacts__user user-advertisement-contacts">
                  <div className="user-advertisement-contacts__block">
                    <p className="user-advertisement-contacts__name">Дмитро</p>
                    <p className="user-advertisement-contacts__surname">
                      Вишнивецький
                    </p>
                  </div>
                  <div className="advertisement-contacts__photo photo-advertisement-contacts">
                    <div className="photo-advertisement-contacts__image"></div>
                    <label className="photo-advertisement-contacts__save button">
                      Завантажити фото
                      <input autoComplete="off" type="file" />
                    </label>
                  </div>
                </div>

                <div className="advertisement-contacts__password password-advertisement-contacts">
                  <div className="password-advertisement-contacts__title">
                    Зміна пароля
                  </div>
                  <div className="password-advertisement-contacts__body">
                    <div className="input-block">
                      <p>Старий пароль</p>
                      <div className="password input">
                        <input
                          autoComplete="off"
                          type="password"
                          placeholder=""
                          className="password__input"
                        />

                        <button className="password__button">
                          <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
                              fill="#838383"
                            />
                            <path
                              d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
                              fill="#838383"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="input-block">
                      <p>Новий пароль</p>
                      <div className="password input">
                        <input
                          autoComplete="off"
                          type="password"
                          placeholder=""
                          className="password__input"
                        />
                        <button className="password__button">
                          <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
                              fill="#838383"
                            />
                            <path
                              d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
                              fill="#838383"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="input-block">
                      <p>Підтвердження пароля</p>
                      <div className="password input">
                        <input
                          autoComplete="off"
                          type="password"
                          placeholder=""
                          className="password__input"
                        />

                        <button className="password__button">
                          <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
                              fill="#838383"
                            />
                            <path
                              d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
                              fill="#838383"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="password-advertisement-contacts__actions">
                    <button className="password-advertisement-contacts__save button">
                      Зберегти
                    </button>
                    <button className="password-advertisement-contacts__cancel">
                      Відміна
                    </button>
                  </div>
                </div>
              </div>
              <button className="advertisement-contacts__delete button button--secondary">
                Видалити акаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
