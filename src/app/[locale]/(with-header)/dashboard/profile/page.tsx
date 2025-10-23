"use client";
import { UserInfoSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem, Spinner } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
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
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Dashboard.Profile");
  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState<File | null>(null);
  const [userInformation, setUserInformation] = useState<User | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

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
    console.log(newGender);
    setValue("gender", newGender);
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

    setIsLoadingRequest(true);
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

    console.log(userData);

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
        toast.success(t("toast.change-success"));

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
      toast.error(t("toast.change-error"));
    } finally {
      setIsLoadingRequest(false);
    }
  };
  const handleDeleteAccount = async () => {
    if (!session?.user.access_token) {
      return;
    }

    try {
      const deleteResponse = await fetch(`/api/users/delete`, {
        method: "DELETE",
        headers: {
          token: session?.user.access_token,
        },
      });
      if (deleteResponse.ok) {
        toast.success(t("toast.delete-success"));
        signOut({ callbackUrl: "/" });
        // router.push("/");
      } else {
        throw new Error(t("toast.delete-error"));
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error(t("toast.delete-error"));
    }
  };

  const handleDeletePhoto = async () => {
    if (!session?.user.access_token) {
      return;
    }

    try {
      const deleteResponse = await fetch(`/api/users/delete-photo`, {
        method: "DELETE",
        headers: {
          token: session?.user.access_token,
          id: userInformation?.photos[0]?.id?.toString() || "",
        },
      });
      if (deleteResponse.ok) {
        toast.success(t("toast.photo-delete-success"));
        let _userInformation = {
          ...userInformation!,
          id: userInformation?.id!,
          photos: []
        };
        setUserInformation(_userInformation);
        dispatch(setUserInfoData(_userInformation));
      } else {
        throw new Error("Unknown error occurred");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error(t("toast.delete-photo-error"));
    }
  }

  if (!userInformation) {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  // console.log(userInfo);
  return (
    <>
      <div className="dashboard__wrapper wrapper-dashboard dashboard-contacts">
        <div className="wrapper-dashboard__body body-dashboard">
          <form
            onSubmit={handleSubmit(processForm)}
            className="body-dashboard__wrapper"
          >
            <div className="body-dashboard__block dashboard-contacts__block">
              <div className="dashboard-contacts__user-block">
                <div className="dashboard-contacts__user user-dashboard-contacts">
                  <div className="user-dashboard-contacts__block">
                    <p className="user-dashboard-contacts__name">
                      {userInfo?.first_name}
                    </p>
                    <p className="user-dashboard-contacts__surname">
                      {userInfo?.last_name}
                    </p>
                  </div>
                  <div className="dashboard-contacts__photo photo-dashboard-contacts">
                    <div className="photo-dashboard-contacts__image">
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
                          src={
                            userInformation?.photos[0]?.url || "/icons/image.svg"
                          }
                          className="ibg"
                          alt="User image"
                          width={600}
                          height={600}
                        />
                      )}
                    </div>
                    <label className="photo-dashboard-contacts__save button">
                      {t("upload-photo")}
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    {userInformation?.photos[0]?.id && <button type="button" onClick={handleDeletePhoto} className="dashboard-contacts__delete button button--danger">
                      Delete photo
                    </button>}
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-contacts__data data-dashboard-contacts">
              <div className="data-dashboard-contacts__body body-dashboard__block">
                <h2 className="body-dashboard__title title title--small">
                  {t("contact-details.title")}
                </h2>
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>{t("contact-details.last-name")}*</p>
                      <input
                        {...register("last_name")}
                        value={userInformation?.last_name ?? ""}
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
                      <p>{t("contact-details.first-name")}*</p>
                      <input
                        value={userInformation?.first_name ?? ""}
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
                      <p>{t("contact-details.middle-name")}</p>
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
                      <p>{t("contact-details.gender")}</p>
                      <div className="radio-group gender__items">
                        <div className="radio-group__item">
                          <label>
                            <input
                              className="real-radio"
                              type="radio"
                              value={"male"}
                              checked={userInformation?.gender === "male"}
                              onChange={handleGenderChange}
                            />
                            <span
                              className={`custom-radio gender__item ${
                                errors.gender ? "custom-radio--error" : ""
                              }`}
                            >
                              {t("contact-details.gender-male")}
                            </span>
                          </label>
                        </div>
                        <div className="radio-group__item">
                          <label>
                            <input
                              className="real-radio"
                              type="radio"
                              value={"female"}
                              checked={userInformation?.gender === "female"}
                              onChange={handleGenderChange}
                            />
                            <span
                              className={`custom-radio gender__item ${
                                errors.gender ? "custom-radio--error" : ""
                              }`}
                            >
                              {t("contact-details.gender-female")}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <p>{t("contact-details.birthday")}</p>
                  <div className="birth-date">
                    <div className="birth-date__item">
                      <Select
                        placeholder={t("contact-details.day")}
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
                        placeholder={t("contact-details.month")}
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
                        placeholder={t("contact-details.year")}
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
                      <p>{t("contact-details.phone-number")}*</p>
                      <input
                        type="tel"
                        {...register("phone_number")}
                        placeholder={t("contact-details.phone-number")}
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
                      <p>{t("contact-details.email")}*</p>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder={t("contact-details.email")}
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
                      <p>{t("contact-details.name-of-enterprise")}</p>
                      <input
                        type="text"
                        {...register("name_of_enterprise")}
                        placeholder={t("contact-details.name-of-enterprise")}
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
                      <p>{t("contact-details.website-link")}</p>
                      <input
                        type="text"
                        {...register("web_site")}
                        placeholder={t("contact-details.website-link")}
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
                      <p>{t("contact-details.country")}</p>
                      <input
                        type="text"
                        {...register("country")}
                        placeholder={t("contact-details.country")}
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
                      <p>{t("contact-details.region")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.region")}
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
                      <p>{t("contact-details.city")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.city")}
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
                      <p>{t("contact-details.address")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.address")}
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
                      <p>{t("contact-details.ig-link")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.ig-link")}
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
                      <p>{t("contact-details.tg-link")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.tg-link")}
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
                      <p>{t("contact-details.fb-link")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.fb-link")}
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
                      <p>{t("contact-details.yt-link")}</p>
                      <input
                        type="text"
                        placeholder={t("contact-details.yt-link")}
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
                <p className="data-dashboard-contacts__text">
                  {t("contact-details.required-fields")}
                </p>
              </div>
              <div className="block-row">
                <button
                  type="submit"
                  className="data-dashboard-contacts__save button"
                >
                  {t("save")}
                  {isLoadingRequest && <Spinner color="current" size="sm" />}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    toast(t("toast.delete-confirm"), {
                      classNames: {
                        actionButton: "bg-red-600! p-4!",
                      },
                      action: {
                        label: t("toast.delete-account"),
                        onClick: () => handleDeleteAccount(),
                      },
                    });
                  }}
                  className="dashboard-contacts__delete button button--danger"
                >
                  {t("toast.delete-account")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
