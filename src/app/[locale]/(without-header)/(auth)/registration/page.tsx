"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { RegistrationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof RegistrationFormSchema>;
type City = { name_ua: string; name_ru: string };

export default function Registration() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/cities", {
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (error) {
        console.error("Failed to load cities:", error);
        toast.error(t("toast.cities-error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const myFilter = (textValue: string, inputValue: string) => {
    if (inputValue.length === 0) {
      return true;
    }

    // Normalize both strings so we can slice safely
    // take into account the ignorePunctuation option as well...
    textValue = textValue.normalize("NFC").toLocaleLowerCase();
    inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

    return textValue.slice(0, inputValue.length) === inputValue;
  };

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

  const processForm: SubmitHandler<Inputs> = async (data) => {
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

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Registration error:", result);
        toast.error(result.message || t("toast.error"));
        return;
      }

      // ✅ Регистрация успешна
      toast.success(t("toast.success"));

      // ⚡ Автовход
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error(res.error || t("toast.login-error"));
        console.error("❌ Login error:", res.error);
        return;
      }

      toast.success(t("toast.login-success"));
      router.push("/");
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      toast.error(t("toast.error"));
    }
  };

  return (
    <>
      <div className="login__top">
        {/* <Link href="/" className="body-header__logo logo">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link> */}
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
              className="socials-auth__item item-socials-auth"
              onClick={() => signIn("google", { callbackUrl: "/" })}
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
              type="tel"
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

            <Autocomplete
              allowsCustomValue
              isVirtualized
              defaultFilter={myFilter}
              label={t("registration-city")}
              defaultItems={cities}
              isLoading={isLoading}
              autoComplete="off"
              classNames={{
                listbox: "p-0",
              }}
              popoverProps={{
                classNames: {
                  base: "p-0",
                  content: "p-0",
                },
              }}
              inputProps={{
                autoComplete: "off",
                classNames: {
                  inputWrapper: `h-[45px] text-black px-[12px]  bg-[#F8FBFF]! rounded-[5px] outline-offset-0 outline-[1px]  ${
                    errors.city ? "outline-[#FF0000]" : "outline-[#B0BFD7]"
                  } `,
                },
              }}
              listboxProps={{
                classNames: {
                  base: "p-0",
                },
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
              {(item) => (
                <AutocompleteItem
                  key={locale === "ru" ? item.name_ru : item.name_ua}
                >
                  {locale === "ru" ? item.name_ru : item.name_ua}
                </AutocompleteItem>
              )}
            </Autocomplete>
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
