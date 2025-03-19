import React from "react";
import FavoritesBody from "./components/FavoritesBody";

export default function Favorite() {
  return (
    <>
      <section className="favorite">
        <div className="favorite__container">
          <div className="favorite__top">
            <h1 className="favorite__title title">Обране</h1>
          </div>
          <FavoritesBody />
        </div>
      </section>
      {/* <Adverts /> */}
    </>
  );
}
