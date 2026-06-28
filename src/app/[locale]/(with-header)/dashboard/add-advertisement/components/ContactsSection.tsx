"use client";

import { AdvertisementInputs } from "@/lib/schema";
import { TrashIcon } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { ButtonMain } from "@/components/ButtonMain";
import { TelegramIcon, ViberIcon, WhatsappIcon } from "next-share";

interface ContactsSectionProps {
  register: UseFormRegister<AdvertisementInputs>;
  errors: FieldErrors<AdvertisementInputs>;
  setValue: UseFormSetValue<AdvertisementInputs>;
  watch: UseFormWatch<AdvertisementInputs>;
  fields: any[];
  append: any;
  remove: any;
}

type MessengerField = "telegram_info" | "viber_info" | "whatsapp_info";

const messengerIconClass = (active: boolean) =>
  `flex items-center justify-center w-11 h-11 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
    active
      ? "border-blueColor bg-secondaryColor shadow-sm"
      : "border-[#B0BFD7] bg-[#F8FBFF] hover:border-blueColor/40 opacity-70"
  }`;

const syncMessengerArray = (
  arr: boolean[] | undefined,
  length: number
): boolean[] => Array.from({ length }, (_, i) => !!arr?.[i]);

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

  const toggleMessenger = (
    contactIndex: number,
    phoneIndex: number,
    field: MessengerField
  ) => {
    const current = syncMessengerArray(
      watch(`contact_data.${contactIndex}.${field}`),
      (watch(`contact_data.${contactIndex}.phones`) || [""]).length
    );
    current[phoneIndex] = !current[phoneIndex];
    setValue(`contact_data.${contactIndex}.${field}`, current);
  };

  const renderMessengerToggles = (contactIndex: number, phoneIndex: number) => {
    const phones = watch(`contact_data.${contactIndex}.phones`) || [""];
    const telegramInfo = syncMessengerArray(
      watch(`contact_data.${contactIndex}.telegram_info`),
      phones.length
    );
    const viberInfo = syncMessengerArray(
      watch(`contact_data.${contactIndex}.viber_info`),
      phones.length
    );
    const whatsappInfo = syncMessengerArray(
      watch(`contact_data.${contactIndex}.whatsapp_info`),
      phones.length
    );

    const telegramActive = telegramInfo[phoneIndex];
    const viberActive = viberInfo[phoneIndex];
    const whatsappActive = whatsappInfo[phoneIndex];

    return (
      <div className="flex flex-col gap-2">
        <p>{t("contacts.messengers")}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              toggleMessenger(contactIndex, phoneIndex, "telegram_info")
            }
            className={messengerIconClass(telegramActive)}
            aria-pressed={telegramActive}
            aria-label="Telegram"
          >
            <TelegramIcon size={32} round />
          </button>
          <button
            type="button"
            onClick={() =>
              toggleMessenger(contactIndex, phoneIndex, "viber_info")
            }
            className={messengerIconClass(viberActive)}
            aria-pressed={viberActive}
            aria-label="Viber"
          >
            <ViberIcon size={32} round />
          </button>
          <button
            type="button"
            onClick={() =>
              toggleMessenger(contactIndex, phoneIndex, "whatsapp_info")
            }
            className={messengerIconClass(whatsappActive)}
            aria-pressed={whatsappActive}
            aria-label="WhatsApp"
          >
            <WhatsappIcon size={32} round />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard__contact contact-dashboard">
      <h2 className="contact-dashboard__title title title--small">
        {t("contact-details")}
      </h2>
      <div className="contact-dashboard__body">
        <div className="flex flex-col gap-8 w-full">
          {fields.map((field, index) => {
            const phones = watch(`contact_data.${index}.phones`) || [""];
            const telegramInfo = syncMessengerArray(
              watch(`contact_data.${index}.telegram_info`),
              phones.length
            );
            const viberInfo = syncMessengerArray(
              watch(`contact_data.${index}.viber_info`),
              phones.length
            );
            const whatsappInfo = syncMessengerArray(
              watch(`contact_data.${index}.whatsapp_info`),
              phones.length
            );

            const addPhone = () => {
              setValue(`contact_data.${index}.phones`, [...phones, ""]);
              setValue(`contact_data.${index}.telegram_info`, [
                ...telegramInfo,
                false,
              ]);
              setValue(`contact_data.${index}.viber_info`, [
                ...viberInfo,
                false,
              ]);
              setValue(`contact_data.${index}.whatsapp_info`, [
                ...whatsappInfo,
                false,
              ]);
            };

            const removePhone = (phoneIndex: number) => {
              if (phones.length <= 1) return;

              setValue(
                `contact_data.${index}.phones`,
                phones.filter((_, i) => i !== phoneIndex) as [
                  string,
                  ...string[],
                ]
              );
              setValue(
                `contact_data.${index}.telegram_info`,
                telegramInfo.filter((_, i) => i !== phoneIndex)
              );
              setValue(
                `contact_data.${index}.viber_info`,
                viberInfo.filter((_, i) => i !== phoneIndex)
              );
              setValue(
                `contact_data.${index}.whatsapp_info`,
                whatsappInfo.filter((_, i) => i !== phoneIndex)
              );
            };

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
                    <div className="input-block">
                      <p>{t("contacts.name")}*</p>
                      <input
                        minLength={3}
                        autoComplete="off"
                        type="text"
                        className={`input ${
                          errors.contact_data?.[index]?.name
                            ? "input--error"
                            : ""
                        }`}
                        {...register(`contact_data.${index}.name`)}
                      />
                    </div>

                    <div className="input-block">
                      <p>{t("contacts.position")}</p>
                      <input
                        autoComplete="off"
                        type="text"
                        className={`input ${
                          errors.contact_data?.[index]?.position
                            ? "input--error"
                            : ""
                        }`}
                        {...register(`contact_data.${index}.position`)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-5">
                    <div className="flex flex-col w-full gap-5">
                      {phones.map((phone, phoneIndex) => (
                        <div key={phoneIndex} className="input-block">
                          <p>
                            {t("contacts.phone")} №{phoneIndex + 1}
                          </p>

                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex gap-2 items-center w-full">
                              <input
                                type="tel"
                                {...register(
                                  `contact_data.${index}.phones.${phoneIndex}`
                                )}
                                className={`input ${
                                  errors.contact_data?.[index]?.phones?.[
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
                                  color="danger"
                                >
                                  <TrashIcon />
                                </ButtonMain>
                              )}
                            </div>

                            {renderMessengerToggles(index, phoneIndex)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <ButtonMain
                      type="button"
                      className="w-full!"
                      color="secondary"
                      variant="bordered"
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
            color="secondary"
            variant="bordered"
            onPress={() =>
              append({
                name: "",
                position: "",
                phones: [""],
                telegram_info: [false],
                viber_info: [false],
                whatsapp_info: [false],
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
              color="danger"
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
