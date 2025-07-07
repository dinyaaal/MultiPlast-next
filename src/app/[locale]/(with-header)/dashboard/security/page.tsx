"use client";

import { UserSecuritySchema } from "@/lib/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";

type Inputs = z.infer<typeof UserSecuritySchema>;

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isVisibleOld, setIsVisibleOld] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const toggleVisibilityOld = () => setIsVisibleOld(!isVisibleOld);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(UserSecuritySchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token && !session?.user.id) {
      return;
    }

    setIsLoadingRequest(true);

    const token = session.user.access_token;
    const id = session.user.id;

    console.log(data);

    const { oldPassword, newPassword } = data;

    const userData = {
      password_confirmation: oldPassword,
      password: newPassword,
    };

    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      const editResponse = await fetch(`/api/users/edit`, {
        method: "POST",
        headers: {
          id: id.toString(),
          token: token,
        },
        body: formData,
      });
      const result = await editResponse.json();

      if (!editResponse.ok) {
        console.error("❌ Registration error:", result);

        toast.error(result.message || "Unknown registration error");

        return;
      }
      toast.success("Пароль успешно изменен");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error("Ошибка обновления информации пользователя");
    } finally {
      setIsLoadingRequest(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <>
      <div className="dashboard__wrapper wrapper-dashboard dashboard-contacts">
        <div className="wrapper-dashboard__body body-dashboard">
          <form
            onSubmit={handleSubmit(processForm)}
            className="body-dashboard__wrapper"
          >
            <div className="dashboard-contacts__user-block">
              <div className="dashboard-contacts__password password-dashboard-contacts">
                <div className="password-dashboard-contacts__title">
                  Зміна пароля
                </div>
                <div className="password-dashboard-contacts__body">
                  <div className="input-block">
                    <p>Старий пароль</p>
                    <div
                      className={`password input ${
                        errors.oldPassword ? "input--error" : ""
                      } `}
                    >
                      <input
                        autoComplete="off"
                        type={isVisibleOld ? "text" : "password"}
                        placeholder=""
                        className="password__input"
                        {...register("oldPassword")}
                      />

                      <button
                        type="button"
                        className={`password__button ${
                          isVisibleOld ? "active" : ""
                        }`}
                        onClick={toggleVisibilityOld}
                      >
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 18 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
                            fill="#838383"
                          />
                          <path
                            d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
                            fill="#838383"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* <PasswordInput /> */}
                  </div>
                  <div className="input-block">
                    <p>Новий пароль</p>
                    <div
                      className={`password input ${
                        errors.newPassword ? "input--error" : ""
                      } `}
                    >
                      <input
                        autoComplete="off"
                        type={isVisibleNew ? "text" : "password"}
                        placeholder=""
                        className="password__input"
                        {...register("newPassword")}
                      />

                      <button
                        type="button"
                        className={`password__button ${
                          isVisibleNew ? "active" : ""
                        }`}
                        onClick={toggleVisibilityNew}
                      >
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 18 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
                            fill="#838383"
                          />
                          <path
                            d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
                            fill="#838383"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* <PasswordInput /> */}
                  </div>
                  <div className="input-block">
                    <p>Підтвердження пароля</p>
                    <div
                      className={`password input ${
                        errors.repeatPassword ? "input--error" : ""
                      } `}
                    >
                      <input
                        autoComplete="off"
                        type={isVisibleRepeat ? "text" : "password"}
                        placeholder=""
                        className="password__input"
                        {...register("repeatPassword")}
                      />

                      <button
                        type="button"
                        className={`password__button ${
                          isVisibleRepeat ? "active" : ""
                        }`}
                        onClick={toggleVisibilityRepeat}
                      >
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 18 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4545 6.00022C11.4545 6.72354 11.1672 7.41723 10.6557 7.9287C10.1443 8.44016 9.45059 8.72749 8.72727 8.72749C8.00396 8.72749 7.31026 8.44016 6.7988 7.9287C6.28734 7.41723 6 6.72354 6 6.00022C6 5.2769 6.28734 4.58321 6.7988 4.07175C7.31026 3.56029 8.00396 3.27295 8.72727 3.27295C9.45059 3.27295 10.1443 3.56029 10.6557 4.07175C11.1672 4.58321 11.4545 5.2769 11.4545 6.00022Z"
                            fill="#838383"
                          />
                          <path
                            d="M0 6C0 6 3.27273 0 8.72727 0C14.1818 0 17.4545 6 17.4545 6C17.4545 6 14.1818 12 8.72727 12C3.27273 12 0 6 0 6ZM8.72727 9.81818C9.73992 9.81818 10.7111 9.41591 11.4271 8.69986C12.1432 7.98381 12.5455 7.01264 12.5455 6C12.5455 4.98736 12.1432 4.01619 11.4271 3.30014C10.7111 2.58409 9.73992 2.18182 8.72727 2.18182C7.71463 2.18182 6.74346 2.58409 6.02741 3.30014C5.31136 4.01619 4.90909 4.98736 4.90909 6C4.90909 7.01264 5.31136 7.98381 6.02741 8.69986C6.74346 9.41591 7.71463 9.81818 8.72727 9.81818Z"
                            fill="#838383"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* <PasswordInput /> */}
                  </div>
                  <p>Мінімальна довжина паролю - 6 символів</p>
                </div>
                <div className="password-dashboard-contacts__actions">
                  <button
                    type="submit"
                    className="password-dashboard-contacts__save button"
                  >
                    Зберегти
                    {isLoadingRequest && <Spinner color="current" size="sm" />}
                  </button>
                  {/* <button className="password-dashboard-contacts__cancel">
                      Відміна
                    </button> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
