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

const units = [
  { key: "for_hour", label: "За годину" },
  { key: "for_minute", label: "За хвилину" },
  { key: "for_piece", label: "За штуку" },
  { key: "for_kg", label: "За кілограм" },
];

interface typePrice {
  type: "by_arrangement" | "for_minute" | "for_hour" | "for_piece" | "for_kg";
}

type Inputs = z.infer<typeof AdvertismentSchema>;

export default function Advertisement({ categories }: SellProps) {
  const t = useTranslations("Sell");
  const [categoryId, setCategoryId] = useState<number>(1);

  const [arrangement, setArrangement] = useState<boolean>(false);
  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { data: session, status } = useSession();

  const [photos, setPhotos] = useState<File[] | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [typePrice, setTypePrice] = useState<typePrice>({ type: "for_kg" });

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

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPhotos(Array.from(files));
    }
  };
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    if (Number(e.target.value) === 1 || Number(e.target.value) === 2) {
      setTypePrice({
        type: "for_kg",
      });
    } else if (Number(e.target.value) === 3 || Number(e.target.value) === 5) {
      setTypePrice({
        type: "for_piece",
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrangement(e.target.checked);
  };

  const handleChangeTypePrice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedKey = event.target.value;
    const selectedUnit = units.find((unit) => unit.key === selectedKey);
    if (selectedUnit) {
      setTypePrice({
        type: selectedUnit.key as typePrice["type"],
      });
    }
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token && !session?.user.id) {
      return;
    }

    const token = session.user.access_token;

    const formData = new FormData();

    const {
      name_of_enterprise,
      name,
      phone_number,
      address,
      city,
      area,
      mainCategory,
      type,
      polymer,
      title,
      text,
      price,
      volume,
      volume_price,
      arrangement,
    } = data;

    const categoriesData = {
      mainCategory,
      type,
      polymer,
    };

    const contactData = {
      name_of_enterprise,
      name,
      phone_number,
      address,
      city,
      area,
    };
    Object.entries(categoriesData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(`categories[${key}]`, value);
      }
    });

    Object.entries(contactData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(`contact_data[${key}]`, value);
      }
    });

    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        formData.append("photos[]", photo);
      });
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files[]", file);
      });
    }

    formData.append("title", title);
    if (text) {
      formData.append("text", text);
    }
    formData.append("type_of_product", "sell");
    if (arrangement) {
      formData.append("type_price", "by_arrangement");
    } else {
      formData.append("type_price", typePrice.type);
    }
    if (!arrangement && price) {
      formData.append("price", price);
    }

    try {
      const postResponse = await fetch(`/api/products/add`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });
      if (postResponse.ok) {
        toast.success("Оголошення подано");
      } else {
        throw new Error("Ошибка обновления информации пользователя");
      }
      const editResult = await postResponse.json();
      console.log(editResult);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error("Ошибка создания товара");
    }
  };

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
                        errors.mainCategory
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
                    {...register("mainCategory")}
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
                  <p>
                    {categoryId === 1 || categoryId === 2
                      ? t("price-per-kg")
                      : t("enter-price")}
                  </p>
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
                            className="real-checkbox"
                            checked={arrangement}
                            {...register("arrangement")}
                            onChange={handleCheckboxChange}
                          />
                          <span className="custom-checkbox"></span>
                          {t("negotiated-price")}
                        </label>
                      </div>
                      {categoryId === 4 && (
                        <Select
                          isDisabled={arrangement}
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
                          defaultSelectedKeys={["for_hour"]}
                          onChange={(selectedKey) =>
                            handleChangeTypePrice(selectedKey)
                          }
                        >
                          {units.map((unit) => (
                            <SelectItem key={unit.key}>{unit.label}</SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>

                    <div className="input-block">
                      <p>{t("fixed-price")}</p>
                      <div className="block-row__item">
                        <div
                          className={`input-body input ${
                            errors.price ? "input--error" : ""
                          }`}
                        >
                          <input
                            disabled={arrangement}
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                            {...register("price")}
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
                            disabled={arrangement}
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                            {...register("volume")}
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
                            disabled={arrangement}
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                            {...register("volume_price")}
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
                        accept="image/jpeg, image/png"
                        // {...register("photos")}
                        onChange={handlePhotosChange}
                        multiple
                      />
                    </label>
                    <div className="input-body-file__content">
                      <div className="input-body-file__downloads downloads-input-body-file">
                        <div className="downloads-input-body-file__image-box">
                          <div className="downloads-input-body-file__image"></div>
                        </div>
                        <p className="downloads-input-body-file__text">
                          <span>{photos?.length || 0} </span>{" "}
                          {t("photos-uploaded")}
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
                  {...register("text")}
                ></textarea>
              </div>
              <div className="input-block">
                <div className="input-body-file">
                  <div className="input-body-file__content advertisement-files">
                    <p>{t("upload-files")}</p>
                    <div className="input-body-file__actions">
                      <label className="input-body-file__button button">
                        <input
                          id="advertisement-files"
                          type="file"
                          className="advertisement-files__input"
                          onChange={handleFilesChange}
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