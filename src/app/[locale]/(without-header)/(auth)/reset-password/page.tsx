"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { ResetPasswordSchema } from "@/lib/schema";
import { Spinner } from "@heroui/react";

type StepTwoInputs = z.infer<typeof ResetPasswordSchema>;

const RESET_PASSWORD_URL =
  "https://api.multiplast.com.ua/api/users/reset-password";

export default function ForgotPassword() {
  const t = useTranslations("Auth.forgot-password");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  // Шаг 2 — Token и новый пароль
  const {
    register: registerStep2,
    setValue: setValueStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errors2 },
  } = useForm<StepTwoInputs>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    if (email && token) {
      setValueStep2("email", email);
      setValueStep2("token", token);
    }
  }, [email, setValueStep2, token]);

  const handleResetSubmit: SubmitHandler<StepTwoInputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(RESET_PASSWORD_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          token: data.token,
          password: data.newPassword,
          password_confirmation: data.newPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || t("update-error"));
        return;
      }

      toast.success(t("success"));
      // можно редирект на login или очищение формы
    } catch (err) {
      toast.error(t("update-error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login__top">
        {/* <Link href="/" className="body-header__logo logo">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link> */}
        <h2 className="login__title title">{t("title")}</h2>
        <p className="entry-login__text">{t("subtitle")}</p>
      </div>

      <form
        onSubmit={handleSubmitStep2(handleResetSubmit)}
        className="login__form form-login"
      >
        <div className="form-login__block">
          <div className="input-block">
            <p>{t("new-password")}</p>
            <input
              type="password"
              className={`form-login__input input ${
                errors2.newPassword ? "input--error" : ""
              }`}
              {...registerStep2("newPassword")}
            />
          </div>
          <div className="input-block">
            <p>{t("repeat-password")}</p>
            <input
              type="password"
              className={`form-login__input input ${
                errors2.repeatPassword ? "input--error" : ""
              }`}
              {...registerStep2("repeatPassword")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="form-login__button button"
        >
          {t("save-button")}
          {isLoading && <Spinner color="current" size="sm" />}
        </button>
      </form>
    </>
  );
}
