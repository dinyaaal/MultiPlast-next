"use client";
import PasswordInput from "@/Components/PasswordInput";
import { UserInfoSchema } from "@/lib/schema";

import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@nextui-org/react";

type Inputs = z.infer<typeof UserInfoSchema>;

const months = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const years = Array.from({ length: 100 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisibleOld, setIsVisibleOld] = React.useState(false);
  const [isVisibleNew, setIsVisibleNew] = React.useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = React.useState(false);

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
    resolver: zodResolver(UserInfoSchema),
  });

  const fetchUserInfo = async () => {
    if (!session) return;

    // setLoading(true);
    setError(null);

    try {
      const responseOrderStatus = await fetch(
        `/api/users/get?token=${session?.user.access_token}&id=${session?.user.id}`
      );

      if (!responseOrderStatus.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await responseOrderStatus.json();

      if (data) {
        console.log(`User: ${JSON.stringify(data)} `);
        setUserInfo(data);
        setError(null);
      } else {
        setError("Unknown error occurred");
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      fetchUserInfo();
    }
  }, [session]);

  // console.log(userInfo);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGender = event.target.value;
    setUserInfo((prev) => (prev ? { ...prev, gender: newGender } : null));
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token && !session?.user.id) {
      return;
    }

    const token = session.user.access_token;
    const id = session.user.id;

    console.log(data);

    const { birthday_day, birthday_month, birthday_year, ...otherFields } =
      data;

    const userData = {
      ...otherFields,
      ...(birthday_day && birthday_month && birthday_year
        ? { birthday: `${birthday_year}-${birthday_month}-${birthday_day}` }
        : { birthday: "" }),
    };

    console.log(userData);
    try {
      const editResponse = await fetch(`/api/users/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          id,
          userInfo: userData,
        }),
      });

      if (!editResponse.ok) {
        throw new Error("Ошибка обновления информации пользователя");
      }
      const editResult = await editResponse.json();
      console.log(editResult);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
    }
  };

  if (status === "unauthenticated") {
    router.push("/");
  }

  // if (status === "loading") {
  //   return (
  //     <div className="flex w-full h-full flex-auto items-center justify-center">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="advertisement__wrapper wrapper-advertisement advertisement-contacts">
        <div className="wrapper-advertisement__body body-advertisement">
          <div className="body-advertisement__wrapper">
            <div className="advertisement-contacts__user user-advertisement-contacts user-advertisement-contacts--mobile">
              <div className="user-advertisement-contacts__block">
                <p className="user-advertisement-contacts__name">Дмитро</p>
                <p className="user-advertisement-contacts__surname">
                  Вишнивецький
                </p>
              </div>
              <div className="advertisement-contacts__photo photo-advertisement-contacts">
                <div className="photo-advertisement-contacts__image"></div>
                <label className="photo-advertisement-contacts__save button">
                  Завантажити фото
                  <input autoComplete="off" type="file" />
                </label>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(processForm)}
              className="advertisement-contacts__data data-advertisement-contacts"
            >
              <div className="data-advertisement-contacts__body body-advertisement__block">
                <h2 className="body-advertisement__title title title--small">
                  Контактні дані
                </h2>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Прізвище*</p>
                      <input
                        autoComplete="off"
                        {...register("last_name")}
                        value={userInfo?.last_name}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, last_name: e.target.value } : null
                          )
                        }
                        type="text"
                        placeholder=""
                        className={` input ${
                          errors.last_name ? "input--error" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Імʼя*</p>
                      <input
                        autoComplete="off"
                        value={userInfo?.first_name}
                        {...register("first_name")}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev
                              ? { ...prev, first_name: e.target.value }
                              : null
                          )
                        }
                        type="text"
                        placeholder=""
                        className={` input ${
                          errors.first_name ? "input--error" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>По батькові</p>
                      <input
                        autoComplete="off"
                        {...register("middle_name")}
                        value={
                          userInfo?.middle_name ? userInfo?.middle_name : ""
                        }
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev
                              ? { ...prev, middle_name: e.target.value }
                              : null
                          )
                        }
                        type="text"
                        placeholder=""
                        className={` input ${
                          errors.middle_name ? "input--error" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Стать</p>
                      <div className="radio-group gender__items">
                        <div className="radio-group__item">
                          <label>
                            <input
                              className="real-radio"
                              type="radio"
                              // name="sex"
                              {...register("gender")}
                              value={"male"}
                              checked={userInfo?.gender === "male"}
                              onChange={handleGenderChange}
                            />
                            <span
                              className={`custom-radio gender__item ${
                                errors.gender ? "custom-radio--error" : ""
                              }`}
                            >
                              Ч
                            </span>
                          </label>
                        </div>
                        <div className="radio-group__item">
                          <label>
                            <input
                              className="real-radio"
                              type="radio"
                              // name="sex"
                              value={"female"}
                              checked={userInfo?.gender === "female"}
                              {...register("gender")}
                              onChange={handleGenderChange}
                            />
                            <span
                              className={`custom-radio gender__item ${
                                errors.gender ? "custom-radio--error" : ""
                              }`}
                            >
                              Ж
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <p>Дата народження</p>
                  <div className="birth-date">
                    <div className="birth-date__item">
                      <Select
                        placeholder={"День"}
                        defaultSelectedKeys={
                          userInfo && userInfo.birthday
                            ? [userInfo.birthday.split(" ")[0].split("-")[2]]
                            : [""]
                        }
                        classNames={{
                          trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                            errors.birthday_day
                              ? "outline-[#FF0000]"
                              : "outline-[#B0BFD7]"
                          } `,
                          value: `${
                            errors.birthday_day ? "text-[#FF0000]" : ""
                          }`,
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
                        {...register("birthday_day")}
                      >
                        {days.map((day) => (
                          <SelectItem key={day}>{day}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="birth-date__item">
                      <Select
                        placeholder={"Месяц"}
                        defaultSelectedKeys={
                          userInfo && userInfo.birthday
                            ? [userInfo.birthday.split(" ")[0].split("-")[1]]
                            : [""]
                        }
                        classNames={{
                          trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                            errors.birthday_month
                              ? "outline-[#FF0000]"
                              : "outline-[#B0BFD7]"
                          } `,
                          value: `${
                            errors.birthday_month ? "text-[#FF0000]" : ""
                          }`,
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
                        {...register("birthday_month")}
                      >
                        {months.map((month) => (
                          <SelectItem key={month}>{month}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="birth-date__item">
                      <Select
                        placeholder={"Год"}
                        defaultSelectedKeys={
                          userInfo && userInfo.birthday
                            ? [userInfo.birthday.split(" ")[0].split("-")[0]]
                            : [""]
                        }
                        classNames={{
                          trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                            errors.birthday_year
                              ? "outline-[#FF0000]"
                              : "outline-[#B0BFD7]"
                          } `,
                          value: `${
                            errors.birthday_year ? "text-[#FF0000]" : ""
                          }`,
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
                        {...register("birthday_year")}
                      >
                        {years.map((year) => (
                          <SelectItem key={year}>{year}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Номер телефону*</p>
                      <input
                        autoComplete="off"
                        type="number"
                        {...register("phone_number")}
                        placeholder="Номер телефону"
                        className={` input ${
                          errors.phone_number ? "input--error" : ""
                        }`}
                        value={
                          userInfo?.phone_number ? userInfo?.phone_number : ""
                        }
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev
                              ? { ...prev, phone_number: e.target.value }
                              : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Пошта*</p>
                      <input
                        autoComplete="off"
                        type="email"
                        {...register("email")}
                        placeholder="Пошта"
                        className={` input ${
                          errors.email ? "input--error" : ""
                        }`}
                        value={userInfo?.email ? userInfo?.email : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, email: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Назва підприємства</p>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("name_of_enterprise")}
                        placeholder="Назва підприємства"
                        className={` input ${
                          errors.name_of_enterprise ? "input--error" : ""
                        }`}
                        value={
                          userInfo?.name_of_enterprise
                            ? userInfo?.name_of_enterprise
                            : ""
                        }
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev
                              ? { ...prev, name_of_enterprise: e.target.value }
                              : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на сайт</p>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("web_site")}
                        placeholder="Посилання на сайт"
                        className={` input ${
                          errors.web_site ? "input--error" : ""
                        }`}
                        value={userInfo?.web_site ? userInfo?.web_site : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, web_site: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Країна</p>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("country")}
                        placeholder="Країна"
                        className={` input ${
                          errors.country ? "input--error" : ""
                        }`}
                        value={userInfo?.country ? userInfo?.country : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, country: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Область</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Область"
                        {...register("area")}
                        className={` input ${
                          errors.area ? "input--error" : ""
                        }`}
                        value={userInfo?.area ? userInfo?.area : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, area: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Місто</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Місто"
                        className={` input ${
                          errors.city ? "input--error" : ""
                        }`}
                        {...register("city")}
                        value={userInfo?.city ? userInfo?.city : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, city: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Адреса</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Адреса"
                        {...register("address")}
                        className={` input ${
                          errors.address ? "input--error" : ""
                        }`}
                        value={userInfo?.address ? userInfo?.address : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, address: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на Instagram</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на Instagram"
                        className={` input ${
                          errors.ig_link ? "input--error" : ""
                        }`}
                        {...register("ig_link")}
                        value={userInfo?.ig_link ? userInfo?.ig_link : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, ig_link: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на Telegram/Viber</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на Telegram/Viber"
                        className={` input ${
                          errors.tg_link ? "input--error" : ""
                        }`}
                        {...register("tg_link")}
                        value={userInfo?.tg_link ? userInfo?.tg_link : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, tg_link: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на Facebook</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на Facebook"
                        className={` input ${
                          errors.fb_link ? "input--error" : ""
                        }`}
                        {...register("fb_link")}
                        value={userInfo?.fb_link ? userInfo?.fb_link : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, fb_link: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Посилання на YouTube</p>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Посилання на YouTube"
                        className={` input ${
                          errors.yt_link ? "input--error" : ""
                        }`}
                        {...register("yt_link")}
                        value={userInfo?.yt_link ? userInfo?.yt_link : ""}
                        onChange={(e) =>
                          setUserInfo((prev) =>
                            prev ? { ...prev, yt_link: e.target.value } : null
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <p className="data-advertisement-contacts__text">
                  Поля, що відмічені *, обовʼязкові для заповнення
                </p>
              </div>
              <button
                type="submit"
                className="data-advertisement-contacts__save button"
              >
                Зберегти
              </button>
            </form>

            <div className="body-advertisement__block advertisement-contacts__block">
              <div className="advertisement-contacts__user-block">
                <div className="advertisement-contacts__user user-advertisement-contacts">
                  <div className="user-advertisement-contacts__block">
                    <p className="user-advertisement-contacts__name">
                      {userInfo?.first_name}
                    </p>
                    <p className="user-advertisement-contacts__surname">
                      {userInfo?.last_name}
                    </p>
                  </div>
                  <div className="advertisement-contacts__photo photo-advertisement-contacts">
                    <div className="photo-advertisement-contacts__image"></div>
                    <label className="photo-advertisement-contacts__save button">
                      Завантажити фото
                      <input autoComplete="off" type="file" />
                    </label>
                  </div>
                </div>

                <div className="advertisement-contacts__password password-advertisement-contacts">
                  <div className="password-advertisement-contacts__title">
                    Зміна пароля
                  </div>
                  <div className="password-advertisement-contacts__body">
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
                  </div>
                  {/* <div className="password-advertisement-contacts__actions">
                    <button className="password-advertisement-contacts__save button">
                      Зберегти
                    </button>
                    <button className="password-advertisement-contacts__cancel">
                      Відміна
                    </button>
                  </div> */}
                </div>
              </div>
              <button className="advertisement-contacts__delete button button--secondary">
                Видалити акаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
