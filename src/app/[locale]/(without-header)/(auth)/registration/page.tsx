"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import React, { useEffect } from "react";
import { z } from "zod";
import { RegistrationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import PasswordInput from "@/Components/PasswordInput";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const cities = ["Киев", "Харьков"];

type Inputs = z.infer<typeof RegistrationFormSchema>;

export default function Registration() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  useEffect(() => {
    if (errors.password) {
      toast.error(errors.password.message);
    }
    if (errors.passwordConfirmation) {
      toast.error(errors.passwordConfirmation.message);
    }
    if (errors.agreement) {
      toast.error(errors.agreement.message);
    }
  }, [errors.password, errors.passwordConfirmation, errors.agreement]);

  const googleAuth = async () => {
    try {
      const response = await fetch("http://13.60.7.255/auth/google", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    // if (data.password.length && data.passwordConfirmation.length < 6) {
    //   toast.error("Password must be at least 6 characters long");
    //   return;
    // }

    // if (data.password !== data.passwordConfirmation) {
    //   toast.error("Passwords do not match");
    //   return;
    // }

    try {
      const response = await fetch("/api/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          city: data.city,
          agreement: data.agreement,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const result = await response.json();
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration error");
    }
  };

  return (
    <>
      <div className="login__top">
        <Link href="/" className="login__logo logo">
          л<span>ого</span>
        </Link>
        <h2 className="login__title title">{t("registration-title")}</h2>
        <div className="login__entry entry-login">
          <p className="entry-login__text">{t("registration-already")}</p>
          <Link href="/login" className="entry-login__link link">
            {t("registration-login")}
          </Link>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(processForm)}
        className="login__form form-login"
      >
        <div className="socials-auth">
          <p className="socials-auth__text">{t("registration-services")}</p>
          <div className="socials-auth__body">
            <button
              type="button"
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
            <button
              type="button"
              className="socials-auth__item item-socials-auth"
            >
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
          <p className="form-login__block-text">{t("registration-form")}</p>
          <div className="input-block">
            <p> {t("registration-name")}</p>
            <input
              autoComplete="off"
              type="text"
              placeholder={t("registration-name")}
              className={`form-login__input input ${
                errors.firstName ? "input--error" : ""
              }`}
              {...register("firstName")}
            />
          </div>
          <div className="input-block">
            <p>{t("registration-surname")}</p>
            <input
              autoComplete="off"
              type="text"
              placeholder={t("registration-surname")}
              className={`form-login__input input ${
                errors.lastName ? "input--error" : ""
              }`}
              {...register("lastName")}
            />
          </div>
          <div className="input-block">
            <p>{t("registration-number")}</p>
            <input
              autoComplete="off"
              type="number"
              placeholder={t("registration-number")}
              className={`form-login__input input ${
                errors.phoneNumber ? "input--error" : ""
              }`}
              {...register("phoneNumber")}
            />
          </div>
          <div className="input-block">
            <p>{t("registration-email")}</p>
            <input
              autoComplete="off"
              type="email"
              placeholder={t("registration-email")}
              className={`form-login__input input ${
                errors.email ? "input--error" : ""
              }`}
              {...register("email")}
            />
          </div>
          <div className="input-block">
            <p>{t("registration-city")}</p>
            <Select
              placeholder={t("registration-city")}
              classNames={{
                trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                  errors.city ? "outline-[#FF0000]" : "outline-[#B0BFD7]"
                } `,
                value: `${errors.city ? "text-[#FF0000]" : ""}`,
                popoverContent:
                  "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
                listbox: "p-0",
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "min-h-[39px]",
                    "px-[15px]",
                    "py-[5px]",
                    "rounded-none",
                    "bg-transparent",
                    "transition-colors",

                    "data-[hover=true]:bg-[#c4dbff]",
                    "data-[selectable=true]:focus:bg-[#c4dbff]",
                  ],
                },
              }}
              {...register("city")}
            >
              {cities.map((city) => (
                <SelectItem key={city}>{city}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="input-block">
            <p>{t("registration-password")}</p>
            <input
              autoComplete="off"
              type="password"
              placeholder={t("registration-password")}
              className={`form-login__input input ${
                errors.password ? "input--error" : ""
              }`}
              {...register("password")}
            />
          </div>
          <div className="input-block">
            <p>{t("registration-repeat-password")}</p>
            <input
              autoComplete="off"
              type="password"
              placeholder={t("registration-repeat-password")}
              className={`form-login__input input ${
                errors.passwordConfirmation ? "input--error" : ""
              }`}
              {...register("passwordConfirmation")}
            />
          </div>
          <label className="check">
            <input
              type="checkbox"
              className="real-checkbox"
              {...register("agreement")}
            />
            <span
              className={`custom-checkbox ${
                errors.agreement ? "custom-checkbox--error" : ""
              }`}
            ></span>
            {t("registration-checkbox")}
          </label>
        </div>

        <button type="submit" className="form-login__button button">
          {t("registration-button")}
        </button>
      </form>
    </>
  );
}
