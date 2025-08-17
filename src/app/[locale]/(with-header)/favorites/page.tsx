import React from "react";
import FavoritesBody from "./components/FavoritesBody";
import AdvertsWatched from "@/Components/Products/AdvertsWatched";

export default function Favorite() {
  return (
    <>
      <section className="favorite">
        <div className="favorite__container main-container">
          <div className="favorite__top">
            <h1 className="favorite__title title">Обране</h1>
          </div>
          <FavoritesBody />
        </div>
      </section>
      <AdvertsWatched />
      {/* <Adverts /> */}
    </>
  );
}
