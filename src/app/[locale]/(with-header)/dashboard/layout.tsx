import React from "react";
import Tabs from "./components/Tabs";

export default function AdvertismentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="dashboard">
        <div className="dashboard__container main-container">
          <Tabs />

          <div className="dashboard__block">{children}</div>
        </div>
      </section>
    </>
  );
}
