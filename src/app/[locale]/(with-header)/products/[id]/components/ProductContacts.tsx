"use client";

import { Link } from "@/i18n/routing";
import { ProductType } from "@/types/types";
import { Accordion, AccordionItem } from "@heroui/react";
import { ChevronDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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
            <div key={contact.id} className="flex w-full flex-col gap-4 ">
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-col gap-3">
                  <div className="">
                    <span className="font-medium">
                      {t(`info.contacts.name`)}:
                    </span>{" "}
                    {contact.name}
                  </div>
                  {contact.position && (
                    <p className="">
                      <span className="font-medium">
                        {t(`info.contacts.position`)}:
                      </span>{" "}
                      {contact.position}
                    </p>
                  )}
                </div>
                {contact.phones && (
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">
                      {t(`info.contacts.phone-number`)}:
                    </span>
                    <div className="flex flex-col gap-4">
                      {contact.phones.map((phone) => (
                        <Link
                          key={phone}
                          href={`tel:${phone}`}
                          className="link text-base"
                        >
                          {phone}
                        </Link>
                      ))}
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
