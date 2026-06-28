import { ProductPhone } from "@/types/types";

export type { ProductPhone };

export function isProductPhone(
  phone: string | ProductPhone
): phone is ProductPhone {
  return typeof phone === "object" && phone !== null && "value" in phone;
}

export function getPhoneValue(phone: string | ProductPhone): string {
  return isProductPhone(phone) ? phone.value : phone;
}

export function normalizePhoneForMessenger(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `38${digits}`;
  }

  return digits;
}

export function getTelegramLink(phone: string): string {
  return `https://t.me/+${normalizePhoneForMessenger(phone)}`;
}

export function getViberLink(phone: string): string {
  return `viber://chat/?number=%2B${normalizePhoneForMessenger(phone)}`;
}

export function getWhatsappLink(phone: string): string {
  return `https://wa.me/${normalizePhoneForMessenger(phone)}`;
}
