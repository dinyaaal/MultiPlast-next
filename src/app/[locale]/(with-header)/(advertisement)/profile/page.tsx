"use client";
import PasswordInput from "@/Components/PasswordInput";
import { UserInfoSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem, Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@heroui/react";
import { User } from "@/types/types";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Image from "next/image";
import { setUserInfoData, setUserInfoError } from "@/store/userInfoSlice";

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
  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState<File | null>(null);
  const [userInformation, setUserInformation] = useState<User | null>(null);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userInformation) {
      setUserInformation(userInfo);
    }
  }, [userInfo]);

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

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGender = event.target.value;
    setUserInformation((prev) =>
      prev ? { ...prev, gender: newGender } : null
    );
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token && !session?.user.id) {
      return;
    }

    const token = session.user.access_token;
    const id = session.user.id;

    const { birthday_day, birthday_month, birthday_year, ...otherFields } =
      data;

    const userData = {
      ...otherFields,
      ...(birthday_day && birthday_month && birthday_year
        ? { birthday: `${birthday_year}-${birthday_month}-${birthday_day}` }
        : { birthday: "" }),
    };

    const formData = new FormData();

    if (photo) {
      formData.append("photo", photo);
    }

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
      if (editResponse.ok) {
        const editResult = await editResponse.json();
        toast.success("Данные успешно изменены");

        if (editResult) {
          dispatch(setUserInfoData(editResult));
        } else {
          dispatch(setUserInfoError("Unknown error occurred"));
        }
      } else {
        throw new Error("Ошибка обновления информации пользователя");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error("Ошибка обновления информации пользователя");
    }
  };
  const handleDeleteAccount = () => {
    toast("Вы уверены, что хотите удалить свой аккаунт?", {
      classNames: {
        actionButton: "!bg-red-600 !p-4",
      },
      action: {
        label: "Удалить",
        onClick: () => console.log("Удалить"),
      },
    });
  };

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (!userInformation) {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  console.log(userInfo);
  return (
    <>
      <div className="advertisement__wrapper wrapper-advertisement advertisement-contacts">
        <div className="wrapper-advertisement__body body-advertisement">
          <form
            onSubmit={handleSubmit(processForm)}
            className="body-advertisement__wrapper"
          >
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
                    <div className="photo-advertisement-contacts__image">
                      {photo ? (
                        <Image
                          src={URL.createObjectURL(photo)}
                          className="ibg"
                          alt="Uploaded image"
                          width={600}
                          height={600}
                        />
                      ) : (
                        <Image
                          src={userInformation.photo.url || "/icons/image.svg"}
                          className="ibg"
                          alt="User image"
                          width={600}
                          height={600}
                        />
                      )}
                    </div>
                    <label className="photo-advertisement-contacts__save button">
                      Завантажити фото
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="advertisement-contacts__data data-advertisement-contacts">
              <div className="data-advertisement-contacts__body body-advertisement__block">
                <h2 className="body-advertisement__title title title--small">
                  Контактні дані
                </h2>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>Прізвище*</p>
                      <input
                        {...register("last_name")}
                        value={userInformation?.last_name}
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        value={userInformation?.first_name}
                        {...register("first_name")}
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        {...register("middle_name")}
                        value={
                          userInformation?.middle_name
                            ? userInformation?.middle_name
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                              checked={userInformation?.gender === "male"}
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
                              checked={userInformation?.gender === "female"}
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
                          userInformation && userInformation.birthday
                            ? [
                                userInformation.birthday
                                  .split(" ")[0]
                                  .split("-")[2],
                              ]
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
                        type="number"
                        {...register("phone_number")}
                        placeholder="Номер телефону"
                        className={` input ${
                          errors.phone_number ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.phone_number
                            ? userInformation?.phone_number
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="email"
                        {...register("email")}
                        placeholder="Пошта"
                        className={` input ${
                          errors.email ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.email ? userInformation?.email : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        {...register("name_of_enterprise")}
                        placeholder="Назва підприємства"
                        className={` input ${
                          errors.name_of_enterprise ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.name_of_enterprise
                            ? userInformation?.name_of_enterprise
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        {...register("web_site")}
                        placeholder="Посилання на сайт"
                        className={` input ${
                          errors.web_site ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.web_site
                            ? userInformation?.web_site
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        {...register("country")}
                        placeholder="Країна"
                        className={` input ${
                          errors.country ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.country
                            ? userInformation?.country
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Область"
                        {...register("area")}
                        className={` input ${
                          errors.area ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.area ? userInformation?.area : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Місто"
                        className={` input ${
                          errors.city ? "input--error" : ""
                        }`}
                        {...register("city")}
                        value={
                          userInformation?.city ? userInformation?.city : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Адреса"
                        {...register("address")}
                        className={` input ${
                          errors.address ? "input--error" : ""
                        }`}
                        value={
                          userInformation?.address
                            ? userInformation?.address
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Посилання на Instagram"
                        className={` input ${
                          errors.ig_link ? "input--error" : ""
                        }`}
                        {...register("ig_link")}
                        value={
                          userInformation?.ig_link
                            ? userInformation?.ig_link
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Посилання на Telegram/Viber"
                        className={` input ${
                          errors.tg_link ? "input--error" : ""
                        }`}
                        {...register("tg_link")}
                        value={
                          userInformation?.tg_link
                            ? userInformation?.tg_link
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Посилання на Facebook"
                        className={` input ${
                          errors.fb_link ? "input--error" : ""
                        }`}
                        {...register("fb_link")}
                        value={
                          userInformation?.fb_link
                            ? userInformation?.fb_link
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
                        type="text"
                        placeholder="Посилання на YouTube"
                        className={` input ${
                          errors.yt_link ? "input--error" : ""
                        }`}
                        {...register("yt_link")}
                        value={
                          userInformation?.yt_link
                            ? userInformation?.yt_link
                            : ""
                        }
                        onChange={(e) =>
                          setUserInformation((prev) =>
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
              <div className="block-row">
                <button
                  type="submit"
                  className="data-advertisement-contacts__save button"
                >
                  Зберегти
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="advertisement-contacts__delete button button--secondary"
                >
                  Видалити акаунт
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
