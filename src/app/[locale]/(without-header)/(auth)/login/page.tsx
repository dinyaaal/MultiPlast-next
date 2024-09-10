import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <>
      <div className="login__top">
        <div className="login__logo logo">
          л<span>ого</span>
        </div>
        <h2 className="login__title title">Вхід</h2>
        <div className="login__entry entry-login">
          <p className="entry-login__text">Нема облікового запису?</p>
          <Link href="/registration" className="entry-login__link link">
            Зареєструйтесь
          </Link>
        </div>
      </div>
      <div className="login__form form-login">
        <div className="socials-auth">
          <p className="socials-auth__text">
            Увійдіть на сайт за допомогою облікового запису:
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
          <p className="form-login__block-text">
            Або вкажіть email та поточній пароль:
          </p>

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
            <p>Пароль</p>
            <input
              autoComplete="off"
              type="password"
              name="form[]"
              placeholder="Введіть пароль"
              className="form-login__input input"
            />
          </div>
        </div>
        <div className="form-login__actions">
          <label className="check">
            <input type="checkbox" name="remember" className="real-checkbox" />
            <span className="custom-checkbox"></span>
            Запамʼятати мене
          </label>
          <a href="#" className="form-login__forget link">
            Забули пароль?
          </a>
        </div>

        <a href="#" className="form-login__button button">
          Увійти
        </a>
      </div>
    </>
  );
}
