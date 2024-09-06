import Select from "@/Components/Select/Select";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

export default function Registration() {
  return (
    <>
      <div className="login__top">
        <div className="login__logo logo">
          л<span>ого</span>
        </div>
        <h2 className="login__title title">Реєстрація</h2>
        <div className="login__entry entry-login">
          <p className="entry-login__text">Вже є обліковий запис?</p>
          <Link href="/login" className="entry-login__link link">
            Увійдіть
          </Link>
        </div>
      </div>
      <div className="login__form form-login">
        <div className="socials-auth">
          <p className="socials-auth__text">
            Зареєструйтеся на сайті за допомогою облікового запису:
          </p>
          <div className="socials-auth__body">
            <a href="#" className="socials-auth__item item-socials-auth">
              <div className="item-socials-auth__image">
                <Image
                  src="/socials/google.png"
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="item-socials-auth__name">Google</div>
            </a>
            <a href="#" className="socials-auth__item item-socials-auth">
              <div className="item-socials-auth__image">
                <Image
                  src="/socials/facebook.svg"
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="item-socials-auth__name">Facebook</div>
            </a>
          </div>
        </div>
        <div className="form-login__block">
          <p className="form-login__block-text">Або заповніть форму:</p>
          <div className="input-block">
            <p>Імʼя</p>
            <input
              autoComplete="off"
              type="text"
              name="form[]"
              placeholder="Імʼя"
              className="form-login__input input"
            />
          </div>
          <div className="input-block">
            <p>Прізвище</p>
            <input
              autoComplete="off"
              type="text"
              name="form[]"
              placeholder="Прізвище"
              className="form-login__input input"
            />
          </div>
          <div className="input-block">
            <p>Ваш телефон</p>
            <input
              autoComplete="off"
              type="number"
              name="form[]"
              placeholder="Ваш телефон"
              className="form-login__input input"
            />
          </div>
          <div className="input-block">
            <p>Ваша пошта</p>
            <input
              autoComplete="off"
              type="email"
              name="form[]"
              placeholder="Ваша пошта"
              className="form-login__input input"
            />
          </div>
          <div className="input-block">
            <p>Вибір міста</p>
            <Select options={options} placeholder="Вибір міста"></Select>
          </div>
          <div className="input-block">
            <p>Пароль</p>
            <input
              autoComplete="off"
              type="password"
              name="form[]"
              placeholder="Введіть пароль"
              className="form-login__input input"
            />
          </div>
          <div className="input-block">
            <p>Повторіть пароль</p>
            <input
              autoComplete="off"
              type="password"
              name="form[]"
              placeholder="Повторіть пароль"
              className="form-login__input input"
            />
          </div>
          <label className="check">
            <input type="checkbox" name="remember" className="real-checkbox" />
            <span className="custom-checkbox"></span>
            Реєструючись на сайті я підтверджую, що ознайомлений і згоден з
            умовами Угоди користувача та Політикою конфіденційності і
            використання файлів cookie
          </label>
        </div>

        <a href="#" className="form-login__button button">
          Зареєструватися
        </a>
      </div>
    </>
  );
}
