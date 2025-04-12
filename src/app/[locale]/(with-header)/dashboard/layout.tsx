import React from "react";
import Tabs from "./components/Tabs";

export default function AdvertismentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="advertisement">
        <div className="advertisement__container">
          <Tabs />

          <div className="advertisement__block">{children}</div>
        </div>
      </section>
    </>
  );
}
