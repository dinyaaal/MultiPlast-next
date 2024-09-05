import React from "react";

export default function ForumCard() {
  return (
    <div className="home-forum__item item-forum">
      <div className="item-forum__body">
        <div className="item-forum__block">
          <h4 className="item-forum__title">
            Ключові властивості полікарбонату
          </h4>
          <p className="item-forum__text">
            Ключовими властивостями полікарбонату є висока прозорість, відносно
            мала вага та дуже висока ударна в'язкість...{" "}
          </p>
        </div>
        <a href="#" className="item-forum__more">
          <span>Детальніше</span>
          <svg
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z"
              fill="#1858B8"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
