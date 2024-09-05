import Image from "next/image";
import React from "react";
import AdvertsSwiper from "./components/AdvertsSwiper";

export default function Adverts() {
  return (
    <section className="adverts">
      <div className="adverts__container">
        <div className="adverts__top">
          <h2 className="adverts__title title">Останні оголошення</h2>
          <a href="#" className="adverts__button button">
            Подати оголошення
          </a>
        </div>
        <div className="adverts__body">
          <AdvertsSwiper />
        </div>
        <a href="#" className="adverts__button adverts__button--mobile button">
          Подати оголошення
        </a>
      </div>
    </section>
  );
}
