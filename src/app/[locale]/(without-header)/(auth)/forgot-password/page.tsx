"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { ForgotPasswordSchema, ResetPasswordSchema } from "@/lib/schema";
import { Spinner } from "@heroui/react";

type StepOneInputs = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPassword() {
  const t = useTranslations("Auth.forgot-password");
  const [isSend, setIsSend] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Шаг 1 — Email
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errors1 },
  } = useForm<StepOneInputs>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleEmailSubmit: SubmitHandler<StepOneInputs> = async (data) => {
    setIsLoading(true);
    // const formData = new FormData();
    // formData.append("email", data.email);

    try {
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("❌ Forgot password error:", result);
        toast.error(result.message || t("send-error"));
        return;
      }

      // toast.success(t("send-instructions"));
      setIsSend(true);
      // setEmail(data.email);
    } catch (err) {
      toast.error(t("send-error"));
      setIsSend(false);
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
      {isSend ? (
        <p className=" text-center title title--small text-green-500">
          {t("send-instructions")}
        </p>
      ) : (
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

          <button
            type="submit"
            disabled={isLoading}
            className="form-login__button button"
          >
            {t("button")}
            {isLoading && <Spinner color="current" size="sm" />}
          </button>
        </form>
      )}
    </>
  );
}
