import ForumLayout from "@/Components/Forum/components/ForumLayout";
import ModalContact from "@/Components/Modals/ModalContact";
import React from "react";

export default function ForumAdd() {
  return (
    <>
      <ForumLayout>
        <div className="add-forum">
          <div className="add-forum__container">
            <div className="add-forum__block">
              <div className="input-block">
                <p>Введіть заголовок для вашої теми форуму</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Заголовок"
                  className="input"
                />
              </div>

              <div className="input-block editor">
                <textarea
                  id="editor"
                  className="description__input input"
                  placeholder="Написати..."
                ></textarea>
              </div>

              <div className="input-block input-block-title">
                <p>Введіть ключові слова вашої теми</p>
                <div className="input-body input-body--title">
                  <input
                    maxLength={150}
                    autoComplete="off"
                    type="text"
                    placeholder="Ключові слова"
                    className="input"
                  />
                  <div className="input-body__item">до 150 символів</div>
                </div>
              </div>

              <div className="add-forum__actions">
                <button className="add-forum__add button">Опублікувати</button>
                <button className="add-forum__delete button button--secondary">
                  Видалити тему
                </button>
              </div>
            </div>
            <div className="add-forum__info info-contact">
              <div className="info-contact__body">
                <p className="info-contact__text">
                  За всіма питаннями і пропозиціями, які у вас виникли,
                  зв'яжіться з адміністрацією форуму
                </p>
                <ModalContact />
              </div>
            </div>
          </div>
        </div>
      </ForumLayout>
    </>
  );
}
