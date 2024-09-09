import PasswordInput from "@/Components/PasswordInput";
import Select from "@/Components/Select/Select";
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
                      <div className="radio-group gender__items">
                        <div className="radio-group__item">
                          <label>
                            <input
                              className="real-radio"
                              type="radio"
                              name="sex"
                              value={"man"}
                            />
                            <span className="custom-radio gender__item">Ч</span>
                          </label>
                        </div>
                        <div className="radio-group__item">
                          <label>
                            <input
                              className="real-radio"
                              type="radio"
                              name="sex"
                              value={"woman"}
                            />
                            <span className="custom-radio gender__item">Ж</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <p>Дата народження</p>
                  <div className="birth-date">
                    <div className="birth-date__item">
                      <Select
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                        ]}
                      />
                    </div>
                    <div className="birth-date__item">
                      <Select
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                        ]}
                      />
                    </div>
                    <div className="birth-date__item">
                      <Select
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                        ]}
                      />
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
                      <PasswordInput />
                    </div>
                    <div className="input-block">
                      <p>Новий пароль</p>
                      <PasswordInput />
                    </div>
                    <div className="input-block">
                      <p>Підтвердження пароля</p>
                      <PasswordInput />
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
