import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import React from "react";

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
