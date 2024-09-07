import Image from "next/image";
import React from "react";
import ForumCard from "./components/ForumCard";

export default function HomeForum() {
  return (
    <section className="home-forum">
      <div className="home-forum__container">
        <h2 className="home-forum__title title">Форум</h2>
        <div className="home-forum__items">
          <ForumCard small />
          <ForumCard small />
          <ForumCard small />
        </div>
        <div className="home-forum__body body-home-forum">
          <div className="body-home-forum__block">
            <h3 className="body-home-forum__title title--small">
              Приєднутесь до першого спеціалізованого форуму для професіоналів
              полімерного ринку України!
            </h3>
            <p className="body-home-forum__text">
              Спілкуйтесь, діліться досвідом, набувайте нових знань та нових
              ділових партнерів!
            </p>
          </div>
          <a href="#" className="body-home-forum__link button">
            Перейти на форум
          </a>

          <div className="body-home-forum__decor">
            <Image
              src="/decor/molecules.png"
              alt="Image"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
