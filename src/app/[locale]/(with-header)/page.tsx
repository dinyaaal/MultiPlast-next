import HomeForum from "@/components/Forum/HomeForum";
import Hero from "@/components/Hero/Hero";
import Adverts from "@/components/Products/Adverts";
import React from "react";

export default function page() {
  return (
    <>
      <Hero />
      <Adverts />
      <HomeForum />
    </>
  );
}
