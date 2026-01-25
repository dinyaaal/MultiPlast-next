"use client";

import { AdvertisementInputs } from "@/lib/schema";
import { Button } from "@heroui/react";
import { TrashIcon } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { ButtonMain } from "@/components/ButtonMain";

interface ContactsSectionProps {
  register: UseFormRegister<AdvertisementInputs>;
  errors: FieldErrors<AdvertisementInputs>;
  setValue: UseFormSetValue<AdvertisementInputs>;
  watch: UseFormWatch<AdvertisementInputs>;
  fields: any[];
  append: any;
  remove: any;
}

export default function ContactsSection({
  register,
  errors,
  setValue,
  watch,
  fields,
  append,
  remove,
}: ContactsSectionProps) {
  const t = useTranslations("Dashboard.Sell");

  return (
    <div className="dashboard__contact contact-dashboard">
      <h2 className="contact-dashboard__title title title--small">
        {t("contact-details")}
      </h2>
      <div className="contact-dashboard__body">
        <div className="flex flex-col gap-8 w-full">
          {fields.map((field, index) => {
            const phones = watch(`contact_data.${index}.phones`) || [""];

            const addPhone = () =>
              setValue(`contact_data.${index}.phones`, [...phones, ""]);

            const removePhone = (phoneIndex: number) => {
              if (phones.length <= 1) return; // нельзя удалить последний
              const newPhones = phones.filter((_, i) => i !== phoneIndex);
              setValue(
                `contact_data.${index}.phones`,
                newPhones as [string, ...string[]]
              );
            };
            // let phones = watch(`contact_data.${index}.phone_numbers`) || [];

            // // Если массив пустой, создаём один элемент
            // // if (phones.length === 0) {
            // //   phones = [""]; // минимально одно поле
            // //   setValue(`contact_data.${index}.phone_numbers`, phones);
            // // }
            // const addPhone = () =>
            //   setValue(`contact_data.${index}.phone_numbers`, [...phones, ""]);

            // const removePhone = (phoneIndex: number) => {
            //   if (phones.length <= 1) return; // нельзя удалять последний номер

            //   const newPhones = phones.filter((_, i) => i !== phoneIndex);

            //   // Приведение к типу [string, ...string[]], безопасно, потому что newPhones.length >= 1
            //   setValue(
            //     `contact_data.${index}.phone_numbers`,
            //     newPhones as [string, ...string[]]
            //   );
            // };

            return (
              <div
                key={field.id}
                className="flex flex-col w-full items-center gap-5"
              >
                <h4 className="title title--small">
                  {t("contacts.contact")} №{index + 1}
                </h4>
                <div className="flex flex-col gap-5 w-full">
                  <div className="grid grid-cols-2 w-full gap-5 items-center">
                    {/* Имя */}
                    <div className="input-block">
                      <p>{t("contacts.name")}*</p>
                      <input
                        minLength={3}
                        autoComplete="off"
                        type="text"
                        className={`input ${errors.contact_data?.[index]?.name
                          ? "input--error"
                          : ""
                          }`}
                        {...register(`contact_data.${index}.name`)}
                      />
                    </div>

                    {/* Должность */}
                    <div className="input-block">
                      <p>{t("contacts.position")}</p>
                      <input
                        autoComplete="off"
                        type="text"
                        className={`input ${errors.contact_data?.[index]?.position
                          ? "input--error"
                          : ""
                          }`}
                        {...register(`contact_data.${index}.position`)}
                      />
                    </div>
                  </div>
                  {/* Телефоны */}
                  <div className="flex flex-col w-full gap-5">
                    <div className="flex flex-col w-full gap-5">
                      {phones.map((phone, phoneIndex) => (
                        <div key={phoneIndex} className="input-block">
                          <p>
                            {t("contacts.phone")} №{phoneIndex + 1}
                          </p>

                          <div className="flex gap-2 items-center w-full ">
                            <input
                              type="tel"
                              {...register(
                                `contact_data.${index}.phones.${phoneIndex}`
                              )}
                              className={`input ${errors.contact_data?.[index]?.phones?.[
                                phoneIndex
                              ]
                                ? "input--error"
                                : ""
                                }`}
                            />
                            {phones.length > 1 && phoneIndex > 0 && (
                              <ButtonMain
                                onPress={() => removePhone(phoneIndex)}
                                isIconOnly
                                aria-label="Delete number"
                                color='danger'
                              // radius="sm"
                              // className="button--danger"
                              >
                                <TrashIcon />
                              </ButtonMain>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <ButtonMain
                      type="button"
                      className="w-full!"
                      color='secondary'
                      variant='bordered'
                      onPress={addPhone}
                    >
                      {t("contacts.add-phone")}
                    </ButtonMain>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <ButtonMain
            type="button"
            className="w-full!"
            color='secondary'
            variant='bordered'
            onPress={() =>
              append({
                name: "",
                position: "",
                // phone_numbers: [""],
                phones: [""],
              })
            }
          >
            {t("contacts.add-contact")}
          </ButtonMain>
          {fields.length > 1 && (
            <ButtonMain
              type="button"
              onPress={() => remove(fields.length - 1)}
              className="w-full!"
              color='danger'
            >
              {t("contacts.delete-contact")}
            </ButtonMain>
          )}
        </div>
        <p className="contact-dashboard__text">{t("default-info")}</p>
      </div>
    </div>
  );
}
