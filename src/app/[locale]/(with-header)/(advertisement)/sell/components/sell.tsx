"use client";

import { AdvertismentSchema } from "@/lib/schema";
import { RootState } from "@/store/store";
import { Category, User } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

interface SellProps {
  categories: Category[];
}

const units = ["За годину", "За хвилину", "За штуку", "За кілограм"];

type Inputs = z.infer<typeof AdvertismentSchema>;

export default function Sell({ categories }: SellProps) {
  const t = useTranslations("Sell");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [polymerId, setPolymerId] = useState<number | null>(null);
  const [typeError, setTypeError] = useState<boolean>(false);
  const [polymerError, setPolymerError] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userInformation, setUserInformation] = useState<User | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AdvertismentSchema),
  });

  useEffect(() => {
    // if (!userInformation) {
    //   setUserInformation(userInfo);
    // }
    if (userInfo) {
      setValue("name", userInfo?.first_name ? userInfo?.first_name : "");
      setValue(
        "name_of_enterprise",
        userInfo?.name_of_enterprise ? userInfo?.name_of_enterprise : ""
      );
      setValue("city", userInfo?.city ? userInfo?.city : "");
      setValue("address", userInfo?.address ? userInfo?.address : "");
      setValue("area", userInfo?.area ? userInfo?.area : "");
      setValue(
        "phone_number",
        userInfo?.phone_number ? userInfo?.phone_number : ""
      );
    }
  }, [userInfo]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setTypeId(null);
    // setPolymerId(null);
    // setTypeError(false);
    // setPolymerError(false);
    clearErrors();
    reset(
      {
        type: "",
        polymer: "",
      },
      {
        keepErrors: false, // ошибки тоже будут сброшены
      }
    );
    setCategoryId(Number(e.target.value));
  };

  // const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTypeId(Number(e.target.value));
  //   // setTypeError(false);
  // };
  // const handlePolymerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPolymerId(Number(e.target.value));
  //   // setPolymerError(false);
  // };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    toast.success("Оголошення подано");
  };

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "loading") {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <form
        className="advertisement__form"
        onSubmit={handleSubmit(processForm)}
      >
        <div className="advertisement__wrapper wrapper-advertisement">
          <h2 className="wrapper-advertisement__title title title--small">
            {t("fill-ad-title")}
          </h2>
          <div className="wrapper-advertisement__body body-advertisement">
            <div className="body-advertisement__wrapper">
              <div className="body-advertisement__block">
                <div className="input-block">
                  <p>{t("select-category")}</p>

                  <Select
                    placeholder={t("select-category")}
                    disallowEmptySelection
                    classNames={{
                      trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                        errors.category_id
                          ? "outline-[#FF0000]"
                          : "outline-[#B0BFD7]"
                      } `,

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
                    defaultSelectedKeys={[categoryId.toString()]}
                    {...register("category_id")}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                </div>
                {categoryId !== 1 && (
                  <div className="input-block">
                    <p>
                      {categoryId === 2
                        ? t("select-type")
                        : categoryId === 3
                        ? "Виберіть тип устаткування:"
                        : categoryId === 4
                        ? "Виберіть послугу:"
                        : categoryId === 5
                        ? "Виберіть тип оголошення:"
                        : ""}
                    </p>

                    <Select
                      disallowEmptySelection
                      placeholder={
                        categoryId === 2
                          ? t("select-type")
                          : categoryId === 3
                          ? "Виберіть тип устаткування:"
                          : categoryId === 4
                          ? "Виберіть послугу:"
                          : categoryId === 5
                          ? "Виберіть тип оголошення:"
                          : ""
                      }
                      classNames={{
                        trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                          errors.type
                            ? "outline-[#FF0000]"
                            : "outline-[#B0BFD7]"
                        } `,

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
                      {...register("type")}
                      // onChange={handleTypeChange}
                    >
                      {categories
                        .filter((category) => category.id === categoryId)
                        .flatMap((category) => category.categories)

                        .map((subCategory) => (
                          <SelectItem key={subCategory.id}>
                            {subCategory.name}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                )}

                {(categoryId === 1 || categoryId === 2) && (
                  <div className="input-block">
                    <p>{t("select-polymer")}</p>

                    <Select
                      disallowEmptySelection
                      placeholder={t("select-polymer")}
                      classNames={{
                        trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                          errors.polymer
                            ? "outline-[#FF0000]"
                            : "outline-[#B0BFD7]"
                        } `,

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
                      {...register("polymer")}
                      // onChange={handlePolymerChange}
                    >
                      {categories
                        .filter((category) => category.id === categoryId)
                        .flatMap((category) => category.categories)
                        .filter((subCategory) => subCategory.type === "Полімер")

                        .map((subCategory) => (
                          <SelectItem key={subCategory.id}>
                            {subCategory.name}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                )}

                <div className="input-block input-block--price">
                  <p>{t("price-per-kg")}</p>
                  <div className="block-row block-row--nowrap">
                    <div className="input-block">
                      {(categoryId === 1 ||
                        categoryId === 2 ||
                        categoryId === 3 ||
                        categoryId === 5) && <p>{t("negotiated-price")}</p>}
                      <div className="block-row__item">
                        <label className="check">
                          <input
                            type="checkbox"
                            name="remember"
                            className="real-checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <span className="custom-checkbox"></span>
                          {t("negotiated-price")}
                        </label>
                      </div>
                      {categoryId === 4 && (
                        <Select
                          disallowEmptySelection
                          placeholder={t("select-category")}
                          classNames={{
                            trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]`,

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
                          defaultSelectedKeys={["За годину"]}
                        >
                          {units.map((unit) => (
                            <SelectItem key={unit}>{unit}</SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>

                    <div className="input-block">
                      <p>{t("fixed-price")}</p>
                      <div className="block-row__item">
                        <div className="input-body input">
                          <input
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                          />
                          <div className="input-body__item">грн</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {(categoryId === 1 || categoryId === 2) && (
                  <div className="block-row">
                    <div className="block-row__item">
                      <div className="input-block">
                        <p>{t("enter-volume")}</p>
                        <div className="input-body input">
                          <input
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                          />
                          <div className="input-body__item">кг</div>
                        </div>
                      </div>
                    </div>

                    <div className="block-row__item">
                      <div className="input-block">
                        <p>{t("enter-price")}</p>
                        <div className="input-body input">
                          <input
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                          />
                          <div className="input-body__item">грн</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="body-advertisement__block">
                <div className="input-block input-block-title">
                  <p>{t("enter-ad-title")}</p>
                  <div className="input-body input-body--title">
                    <input
                      maxLength={150}
                      type="text"
                      placeholder={t("enter-ad-title")}
                      className={`input ${errors.title ? "input--error" : ""}`}
                      {...register("title")}
                    />
                    <div className="input-body__item">
                      {t("max-characters")}
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <p>{t("upload-photo")}</p>
                  <div className="input-body-file">
                    <label className="input-body-file__input input">
                      <input
                        type="file"
                        id="advertisement-photo"
                        data-error="Помилка"
                        placeholder=""
                        className=""
                        accept="image/jpeg, image/png"
                        // {...register("photos")}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            setValue("photos", Array.from(files), {
                              shouldValidate: true,
                            });
                          }
                        }}
                        multiple
                      />
                    </label>
                    <div className="input-body-file__content">
                      <div className="input-body-file__downloads downloads-input-body-file">
                        <div className="downloads-input-body-file__image-box">
                          <div className="downloads-input-body-file__image"></div>
                        </div>
                        <p className="downloads-input-body-file__text">
                          <span>0</span> {t("photos-uploaded")}
                        </p>
                      </div>
                      <div className="input-body-file__actions">
                        <label
                          htmlFor="advertisement-photo"
                          className="input-body-file__button button"
                        >
                          {t("upload")}
                        </label>
                        <button
                          type="button"
                          className="input-body-file__delete"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-advertisement__block">
              <div className="description input-block">
                <p>{t("enter-description")}</p>
                <textarea
                  placeholder="Написати..."
                  className="description__input input"
                  {...register("description")}
                ></textarea>
              </div>
              <div className="input-block">
                <div className="input-body-file">
                  <div className="input-body-file__content advertisement-files">
                    <p>{t("upload-files")}</p>
                    <div className="input-body-file__actions">
                      <label className="input-body-file__button button">
                        <input
                          autoComplete="off"
                          id="advertisement-files"
                          type="file"
                          className="advertisement-files__input"
                          // {...register("files")}
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              setValue("files", Array.from(files), {
                                shouldValidate: true,
                              });
                            }
                          }}
                          multiple
                        />
                        {t("upload")}
                      </label>
                      <button type="button" className="input-body-file__delete">
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="advertisement__contact contact-advertisement">
          <h2 className="contact-advertisement__title title title--small">
            {t("contact-details")}
          </h2>
          <div className="contact-advertisement__body">
            <div className="contact-advertisement__content">
              <div className="input-block">
                <p>{t("company-name")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${
                    errors.name_of_enterprise ? "input--error" : ""
                  }`}
                  {...register("name_of_enterprise")}
                  // value={
                  //   userInformation?.name_of_enterprise
                  //     ? userInformation?.name_of_enterprise
                  //     : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev
                  //       ? { ...prev, name_of_enterprise: e.target.value }
                  //       : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("name")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.name ? "input--error" : ""}`}
                  {...register("name")}
                  // value={
                  //   userInformation?.first_name
                  //     ? userInformation?.first_name
                  //     : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, name: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("phone")}</p>
                <input
                  autoComplete="off"
                  type="number"
                  placeholder=""
                  className={`input ${
                    errors.phone_number ? "input--error" : ""
                  }`}
                  {...register("phone_number")}
                  // value={
                  //   userInformation?.phone_number
                  //     ? userInformation?.phone_number
                  //     : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, phone_number: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("address")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.address ? "input--error" : ""}`}
                  {...register("address")}
                  // value={
                  //   userInformation?.address ? userInformation?.address : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, address: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("city")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.city ? "input--error" : ""}`}
                  {...register("city")}
                  // value={userInformation?.city ? userInformation?.city : ""}
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, city: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("region")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.area ? "input--error" : ""}`}
                  {...register("area")}
                  // value={userInformation?.area ? userInformation?.area : ""}
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, area: e.target.value } : null
                  //   )
                  // }
                />
              </div>
            </div>
            <p className="contact-advertisement__text">{t("default-info")}</p>
          </div>
        </div>
        <div className="advertisement__actions actions-advertisement">
          <button type="submit" className="actions-advertisement__save button">
            {t("save-publish")}
          </button>
          {/* <button
            type="button"
            className="actions-advertisement__delete button button--secondary"
          >
            {t("delete-ad")}
          </button> */}
        </div>
      </form>
    </>
  );
}
