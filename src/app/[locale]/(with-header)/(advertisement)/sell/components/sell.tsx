"use client";

import { AdvertismentSchema, UserInfoSchema } from "@/lib/schema";
import { Category } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface SellProps {
  categories: Category[];
}

const units = ["За годину", "За хвилину", "За штуку", "За кілограм"];

type Inputs = z.infer<typeof AdvertismentSchema>;

export default function Sell({ categories }: SellProps) {
  const t = useTranslations("Sell");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AdvertismentSchema),
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
    setValue("category_id", Number(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
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
                    // {...register("category_id")}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                </div>
                {categoryId === 2 && (
                  <div className="input-block">
                    <p>{t("select-type")}</p>

                    <Select
                      placeholder={t("select-type")}
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
                    >
                      {categories
                        .filter((category) => category.id === categoryId)
                        .flatMap((category) => category.categories)
                        .filter(
                          (subCategory) => subCategory.type === "Сировина"
                        )
                        .map((subCategory) => (
                          <SelectItem key={subCategory.id}>
                            {subCategory.name}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                )}

                {categoryId === 1 || categoryId === 2 ? (
                  <div className="input-block">
                    <p>{t("select-polymer")}</p>
                    <Select
                      placeholder={t("select-polymer")}
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
                    {/* <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                  placeholder={t("select-polymer")}
                /> */}
                  </div>
                ) : (
                  <div className="input-block">
                    <p></p>
                    {categoryId === 3
                      ? "Виберіть тип устаткування:"
                      : categoryId === 4
                      ? "Виберіть послугу:"
                      : categoryId === 5
                      ? "Виберіть тип оголошення:"
                      : ""}

                    <Select
                      placeholder={
                        categoryId === 3
                          ? "Виберіть тип устаткування"
                          : categoryId === 4
                          ? "Виберіть послугу"
                          : categoryId === 5
                          ? "Виберіть тип оголошення"
                          : ""
                      }
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
          <button
            type="button"
            className="actions-advertisement__delete button button--secondary"
          >
            {t("delete-ad")}
          </button>
        </div>
      </form>
    </>
  );
}
