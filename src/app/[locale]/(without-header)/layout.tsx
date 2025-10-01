import Footer from "@/components/Footer/Footer";
import React from "react";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <main className="page">{children}</main>
      <Footer />
    </div>
  );
}
