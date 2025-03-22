import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import "../../assets/scss/style.scss";
import { HeroUIProvider } from "@heroui/system";
import { getMessages, setRequestLocale } from "next-intl/server";
import { AuthProviders } from "@/Components/AuthProviders";

import { ReduxProvider } from "@/store/provider";
import { Toaster } from "sonner";
import { NextIntlClientProvider, Locale, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const rubikFont = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "MultiPlast",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={`${rubikFont.className} `}>
        <ReduxProvider>
          <AuthProviders>
            <NextIntlClientProvider>
              <HeroUIProvider className=" w-full h-full">
                {children}
                <Toaster
                  position="top-right"
                  closeButton
                  richColors
                  duration={5000}
                />
              </HeroUIProvider>
            </NextIntlClientProvider>
          </AuthProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
