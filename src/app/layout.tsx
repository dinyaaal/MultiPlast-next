import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import "../assets/scss/style.scss";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { NextUIProvider } from "@nextui-org/system";

const rubikFont = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "MultiPlast",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikFont.className} `}>
        <NextUIProvider>
          <main>{children}</main>
        </NextUIProvider>
      </body>
    </html>
  );
}
