"use client";

import { Link } from "@/i18n/routing";
import { ProductType } from "@/types/types";
import {
  getPhoneValue,
  getTelegramLink,
  getViberLink,
  getWhatsappLink,
  isProductPhone,
} from "@/utils/phoneMessengers";
import { Accordion, AccordionItem } from "@heroui/react";
import { ChevronDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { TelegramIcon, ViberIcon, WhatsappIcon } from "next-share";

const messengerLinkClass =
  "flex items-center justify-center w-10 h-10 rounded-lg border-2 border-blueColor bg-secondaryColor transition-opacity hover:opacity-80";

export default function ProductContacts({ product }: { product: ProductType }) {
  const t = useTranslations("Product");

  return (
    <Accordion selectionMode="single" showDivider={false}>
      <AccordionItem
        classNames={{
          base: "p-5 border border-border rounded-lg w-full",
          trigger: "p-0 cursor-pointer",
          title: "title title--small",
          indicator: "data-[open=true]:-rotate-180 text-black",
          content: "p-0 pt-5",
        }}
        indicator={<ChevronDownIcon />}
        key="contacts"
        aria-label={t(`info.contacts.title`)}
        title={t(`info.contacts.title`)}
      >
        <div className="flex flex-col gap-5 w-full">
          {product.contacts.map((contact) => (
            <div key={contact.id} className="flex w-full flex-col gap-4">
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="font-medium">
                      {t(`info.contacts.name`)}:
                    </span>{" "}
                    {contact.name}
                  </div>
                  {contact.position && (
                    <p>
                      <span className="font-medium">
                        {t(`info.contacts.position`)}:
                      </span>{" "}
                      {contact.position}
                    </p>
                  )}
                </div>

                {contact.phones && contact.phones.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {/* <span className="font-medium">
                      {t(`info.contacts.phone-number`)}:
                    </span> */}
                    <div className="flex flex-col gap-10">
                      {contact.phones.map((phone, phoneIndex) => {
                        const value = getPhoneValue(phone);
                        const telegram =
                          isProductPhone(phone) && phone.telegram_info;
                        const viber =
                          isProductPhone(phone) && phone.viber_info;
                        const whatsapp =
                          isProductPhone(phone) && phone.whatsapp_info;

                        return (
                          <div
                            key={`${value}-${phoneIndex}`}
                            className="flex flex-col gap-6"
                          >
                            <Link
                              href={`tel:${value}`}
                              className="link text-base"
                            >
                              {value}
                            </Link>

                            {(telegram || viber || whatsapp) && (
                              <div className="flex gap-4 flex-wrap">
                                {telegram && (
                                  <a
                                    href={getTelegramLink(value)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={messengerLinkClass}
                                    aria-label="Telegram"
                                  >
                                    <TelegramIcon size={28} round />
                                  </a>
                                )}
                                {viber && (
                                  <a
                                    href={getViberLink(value)}
                                    className={messengerLinkClass}
                                    aria-label="Viber"
                                  >
                                    <ViberIcon size={28} round />
                                  </a>
                                )}
                                {whatsapp && (
                                  <a
                                    href={getWhatsappLink(value)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={messengerLinkClass}
                                    aria-label="WhatsApp"
                                  >
                                    <WhatsappIcon size={28} round />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
