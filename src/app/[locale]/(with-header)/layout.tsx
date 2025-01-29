import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/components/Header";
import UserProvider from "@/Components/UserProvider";

import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <Header />
      <UserProvider>
        <main className="page">{children}</main>
      </UserProvider>
      <Footer />
    </div>
  );
}
