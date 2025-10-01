import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PagePreloader from "@/components/PagePreloader";
import UserProvider from "@/components/UserProvider";

import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="wrapper">
        <Header />
        <UserProvider>
          <main className="page">{children}</main>
        </UserProvider>
        <Footer />
      </div>
      {/* <PagePreloader /> */}
    </>
  );
}
