"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

const StepOneSchema = z.object({
  email: z.string().email("Невірний email"),
});

const StepTwoSchema = z
  .object({
    token: z.string().min(4, "Введіть код з пошти"),
    password: z.string().min(6, "Мінімум 6 символів"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Паролі не співпадають",
    path: ["confirm"],
  });

type StepOneInputs = z.infer<typeof StepOneSchema>;
type StepTwoInputs = z.infer<typeof StepTwoSchema>;

export default function ForgotPassword() {
  const t = useTranslations("Auth.forgot-password");

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  // Шаг 1 — Email
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errors1 },
  } = useForm<StepOneInputs>({
    resolver: zodResolver(StepOneSchema),
  });

  // Шаг 2 — Token и новый пароль
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errors2 },
  } = useForm<StepTwoInputs>({
    resolver: zodResolver(StepTwoSchema),
  });

  const handleEmailSubmit: SubmitHandler<StepOneInputs> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);

    try {
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(t("send-error"));
        return;
      }

      toast.success(t("send-instructions"));
      setEmail(data.email);
      setStep(2);
    } catch (err) {
      toast.error(t("send-error"));
    }
  };

  const handleResetSubmit: SubmitHandler<StepTwoInputs> = async (data) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", data.token);
    formData.append("password", data.password);

    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(t("update-error"));
        return;
      }

      toast.success(t("success"));
      // можно редирект на login или очищение формы
    } catch (err) {
      toast.error(t("update-error"));
    }
  };

  return (
    <>
      <div className="login__top">
        <Link href="/" className="body-header__logo logo">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link>
        <h2 className="login__title title">{t("title")}</h2>
        <p className="entry-login__text">{t("subtitle")}</p>
      </div>

      {step === 1 ? (
        <form
          onSubmit={handleSubmitStep1(handleEmailSubmit)}
          className="login__form form-login"
        >
          <div className="form-login__block">
            <div className="input-block">
              <p>{t("email")}</p>
              <input
                type="email"
                placeholder={t("email")}
                className={`form-login__input input ${
                  errors1.email ? "input--error" : ""
                }`}
                {...registerStep1("email")}
              />
            </div>
          </div>

          <button type="submit" className="form-login__button button">
            {t("button")}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitStep2(handleResetSubmit)}
          className="login__form form-login"
        >
          <div className="form-login__block">
            <div className="input-block">
              <p>Код з пошти</p>
              <input
                type="text"
                className={`form-login__input input ${
                  errors2.token ? "input--error" : ""
                }`}
                {...registerStep2("token")}
              />
            </div>
            <div className="input-block">
              <p>{t("new-password")}</p>
              <input
                type="password"
                className={`form-login__input input ${
                  errors2.password ? "input--error" : ""
                }`}
                {...registerStep2("password")}
              />
            </div>
            <div className="input-block">
              <p>{t("repeat-password")}</p>
              <input
                type="password"
                className={`form-login__input input ${
                  errors2.confirm ? "input--error" : ""
                }`}
                {...registerStep2("confirm")}
              />
            </div>
          </div>

          <button type="submit" className="form-login__button button">
            {t("save-button")}
          </button>
        </form>
      )}
    </>
  );
}
