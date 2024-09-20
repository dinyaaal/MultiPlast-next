import Select from "@/Components/Select/Select";
import React from "react";

export default function Sell() {
  return (
    <>
      <div className="advertisement__wrapper wrapper-advertisement">
        <h2 className="wrapper-advertisement__title title title--small">
          Заповніть оголошення про продаж товару
        </h2>
        <div className="wrapper-advertisement__body body-advertisement">
          <div className="body-advertisement__wrapper">
            <div className="body-advertisement__block">
              <div className="input-block">
                <p>Виберіть категорію:</p>
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder="Виберіть категорію:"
                />
              </div>
              <div className="input-block">
                <p>Виберіть тип сировини:</p>
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder="Виберіть тип сировини:"
                />
              </div>
              <div className="input-block">
                <p>Виберіть полімер:</p>
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder=" Виберіть полімер:"
                />
              </div>
              <div className="input-block input-block--price">
                <p>Вкажіть ціну продукту за кг:</p>
                <div className="block-row block-row--nowrap">
                  <div className="input-block">
                    <p> За домовленістю:</p>
                    <div className="block-row__item">
                      <label className="check">
                        <input
                          type="checkbox"
                          name="remember"
                          className="real-checkbox"
                        />
                        <span className="custom-checkbox"></span>
                        Ціна за домовленістю
                      </label>
                    </div>
                  </div>
                  <div className="input-block">
                    <p>Або фіксована ціна:</p>
                    <div className="block-row__item">
                      <div className="input-body input">
                        <input
                          autoComplete="off"
                          type="number"
                          placeholder=""
                          className="input-body__input input-number"
                        />
                        <div className="input-body__item">грн</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block-row">
                <div className="block-row__item">
                  <div className="input-block">
                    <p>При обʼємі:</p>
                    <div className="input-body input">
                      <input
                        autoComplete="off"
                        type="number"
                        placeholder=""
                        className="input-body__input input-number"
                      />
                      <div className="input-body__item">кг</div>
                    </div>
                  </div>
                </div>

                <div className="block-row__item">
                  <div className="input-block">
                    <p>Ціна:</p>
                    <div className="input-body input">
                      <input
                        autoComplete="off"
                        type="number"
                        placeholder=""
                        className="input-body__input input-number"
                      />
                      <div className="input-body__item">грн</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-advertisement__block">
              <div className="input-block input-block-title">
                <p>Введіть заголовок обʼяви</p>
                <div className="input-body input-body--title">
                  <input
                    maxLength={150}
                    autoComplete="off"
                    type="text"
                    placeholder="Ваш заголовок"
                    className="input"
                  />
                  <div className="input-body__item">до 150 символів</div>
                </div>
              </div>
              <div className="input-block">
                <p>Завантажити фото</p>
                <div className="input-body-file">
                  <label className="input-body-file__input input">
                    <input
                      autoComplete="off"
                      type="file"
                      name=""
                      id="advertisement-photo"
                      data-error="Помилка"
                      placeholder=""
                      className=""
                      accept="image/jpeg, image/png"
                    />
                  </label>
                  <div className="input-body-file__content">
                    <div className="input-body-file__downloads downloads-input-body-file">
                      <div className="downloads-input-body-file__image-box">
                        <div className="downloads-input-body-file__image"></div>
                      </div>
                      <p className="downloads-input-body-file__text">
                        <span>0</span> фото завантажено
                      </p>
                    </div>
                    <div className="input-body-file__actions">
                      <label
                        htmlFor="advertisement-photo"
                        className="input-body-file__button button"
                      >
                        Завантажити
                      </label>
                      <button className="input-body-file__delete">
                        Видалити
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-advertisement__block">
            <div className="description input-block">
              <p>Введіть опис:</p>
              <textarea
                placeholder="Написати..."
                className="description__input input"
              ></textarea>
            </div>
            <div className="input-block">
              <div className="input-body-file">
                <div className="input-body-file__content advertisement-files">
                  <p>
                    Завантажити файли для скачування (прайс, каталог.
                    сертифікати)
                  </p>
                  <div className="input-body-file__actions">
                    <label className="input-body-file__button button">
                      <input
                        autoComplete="off"
                        id="advertisement-files"
                        type="file"
                        className="advertisement-files__input"
                      />
                      Завантажити
                    </label>
                    <button className="input-body-file__delete">
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="advertisement__contact contact-advertisement">
        <h2 className="contact-advertisement__title title title--small">
          Контактні дані
        </h2>
        <div className="contact-advertisement__body">
          <div className="contact-advertisement__content">
            <div className="input-block">
              <p>Введіть назву підприємства</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>Імʼя</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>Номер телефону</p>
              <input
                autoComplete="off"
                type="number"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>Адреса</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>Місто</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
            <div className="input-block">
              <p>Область</p>
              <input
                autoComplete="off"
                type="text"
                placeholder=""
                className="input"
              />
            </div>
          </div>
          <p className="contact-advertisement__text">
            *За замовчуванням тут вказується інформація, введена Вами в
            Особистому Кабінеті в розділі Контактні дані.
          </p>
        </div>
      </div>
      <div className="advertisement__actions actions-advertisement">
        <button className="actions-advertisement__save button">
          Зберегти та опублікувати
        </button>
        <button className="actions-advertisement__delete button button--secondary">
          Видалити оголошення
        </button>
      </div>
    </>
  );
}
