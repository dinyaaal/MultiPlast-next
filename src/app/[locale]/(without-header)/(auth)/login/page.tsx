"use client";
import { LoginFormSchema, RegistrationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof LoginFormSchema>;

export default function Login() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const googleAuth = async () => {
    try {
      const response = await fetch(
        "http://ec2-13-60-7-255.eu-north-1.compute.amazonaws.com/auth/google",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const result = await response.json();
      console.log("Registration successful:", result);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      console.error("Ошибка входа:", res.error);
      setError("Неверный логин или пароль");
    } else {
      setError(null);
      router.push("/");
    }
  };

  return (
    <>
      <div className="login__top">
        <Link href="/" className="login__logo logo">
          л<span>ого</span>
        </Link>
        <h2 className="login__title title">{t("login-title")}</h2>
        <div className="login__entry entry-login">
          <p className="entry-login__text">{t("login-not")}</p>
          <Link href="/registration" className="entry-login__link link">
            {t("login-registration")}
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(processForm)}
        className="login__form form-login"
      >
        <div className="socials-auth">
          <p className="socials-auth__text">{t("login-services")}</p>
          <div className="socials-auth__body">
            <button
              onClick={googleAuth}
              className="socials-auth__item item-socials-auth"
            >
              <div className="item-socials-auth__image">
                <Image
                  src="/socials/google.png"
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="item-socials-auth__name">Google</div>
            </button>
            <button className="socials-auth__item item-socials-auth">
              <div className="item-socials-auth__image">
                <Image
                  src="/socials/facebook.svg"
                  alt="Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="item-socials-auth__name">Facebook</div>
            </button>
          </div>
        </div>
        <div className="form-login__block">
          <p className="form-login__block-text">{t("login-form")}</p>

          <div className="input-block">
            <p>{t("registration-email")}</p>
            <input
              type="email"
              placeholder={t("registration-email")}
              className={`form-login__input input ${
                errors.email ? "input--error" : ""
              }`}
              {...register("email")}
            />
          </div>
          <div className="input-block">
            <p>{t("registration-password")}</p>
            <input
              type="password"
              placeholder={t("registration-password")}
              className={`form-login__input input ${
                errors.password ? "input--error" : ""
              }`}
              {...register("password")}
            />
          </div>
        </div>
        <div className="form-login__actions">
          <label className="check">
            <input
              {...register("remember")}
              type="checkbox"
              name="remember"
              className="real-checkbox"
            />
            <span className="custom-checkbox"></span>
            {t("login-checkbox")}
          </label>
          <a href="#" className="form-login__forget link">
            {t("login-forgot")}
          </a>
        </div>

        <button type="submit" className="form-login__button button">
          {t("login-button")}
        </button>
      </form>
    </>
  );
}
