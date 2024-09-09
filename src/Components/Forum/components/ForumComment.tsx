"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function ForumComment() {
  const [isAnswersOpen, setIsAnswersOpen] = useState<boolean>(false);

  const toggleAnswers = () => {
    setIsAnswersOpen(!isAnswersOpen);
  };

  return (
    <div className="forum-comments__comment comment comment-main">
      <div className="comment__user user-chat">
        <div className="user-chat__image item-block-chat__image"></div>
        <div className="user-chat__name">Дмитро Вишнивецький</div>
      </div>
      <div className="comment__block">
        <div className="comment__body body-comment">
          <div className="body-comment__content">
            <p>
              Добрий день, зараз займаюсь будівлею теплиці і полікарбонат обрав,
              як найпідходящу сировину. На мою думку, це неймовірне рішення, і
              тепло, і свілто вдень буде потрапляти. На майбутнє, можливо ще
              полагоджу навіс на дворі, бо бачив на роботі такий дах і його
              стійкість вражає. Якщо комусь знадобиться порада по будівництву
              теплиці, пишіть, розповім.
            </p>
            <a
              href="#"
              data-popup="#popup-images"
              className="body-comment__images"
            >
              <div className="body-comment__image">
                <Image
                  src="/product/01.jpg"
                  alt="Image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="body-comment__image">
                <Image
                  src="/product/01.jpg"
                  alt="Image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="body-comment__image">
                <Image
                  src="/product/01.jpg"
                  alt="Image"
                  width={100}
                  height={100}
                />
              </div>
            </a>
          </div>
          <div className="body-comment__bottom bottom-body-comment">
            <div className="bottom-body-comment__actions">
              <div className="bottom-body-comment__answer-button answer-button">
                <span className="answer-button__text">Відповісти</span>
                <div
                  onClick={toggleAnswers}
                  className={`answer-button__arrow ${
                    isAnswersOpen ? "active" : ""
                  }`}
                >
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989592 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989592 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5L5.25 6L6.75 6L6.75 5L5.25 5Z"
                      fill="#0E274D"
                    />
                  </svg>
                </div>
              </div>
              <a href="#" className="bottom-body-comment__write">
                Написати особисте повідомлення
              </a>
            </div>
            <div className="bottom-body-comment__block">
              <div className="bottom-body-comment__info info-item-forum">
                <div className="info-item-forum__item">
                  <div className="info-item-forum__icon">
                    <Image
                      src="/icons/comments.svg"
                      alt="Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                  <span className="info-item-forum__value">4</span>
                </div>
                <div className="info-item-forum__item">
                  <div className="info-item-forum__icon">
                    <button className="like active">
                      <svg
                        width="33"
                        height="30"
                        viewBox="0 0 33 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.0002 26.7323L14.998 26.7303C10.7549 22.8862 7.35391 19.7972 4.9962 16.9153C2.65494 14.0535 1.5 11.58 1.5 8.99183C1.5 4.77155 4.78535 1.5 9 1.5C11.3943 1.5 13.7168 2.62136 15.2258 4.37798L16.3636 5.70249L17.5015 4.37798C19.0105 2.62136 21.3329 1.5 23.7273 1.5C27.9419 1.5 31.2273 4.77155 31.2273 8.99183C31.2273 11.58 30.0723 14.0535 27.7311 16.9153C25.3734 19.7972 21.9724 22.8862 17.7293 26.7303L17.7271 26.7323L16.3636 27.9724L15.0002 26.7323Z"
                          fill="white"
                          stroke="#BA360C"
                          stroke-width="3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <span className="info-item-forum__value">8</span>
                </div>
              </div>
              <span className="bottom-body-comment__date">
                21 березня 17:47
              </span>
            </div>
          </div>
        </div>
        {isAnswersOpen && (
          <div className={`comment__answers answers-comment `}>
            <div className="forum-comments__comment comment">
              <div className="comment__user user-chat">
                <div className="user-chat__image item-block-chat__image"></div>
                <div className="user-chat__name">Дмитро Вишнивецький</div>
              </div>
              <div className="comment__block">
                <div className="comment__body body-comment">
                  <div className="body-comment__content">
                    <p>
                      Добрий день, зараз займаюсь будівлею теплиці і
                      полікарбонат обрав, як найпідходящу сировину. На мою
                      думку, це неймовірне рішення, і тепло, і свілто вдень буде
                      потрапляти. На майбутнє, можливо ще полагоджу навіс на
                      дворі, бо бачив на роботі такий дах і його стійкість
                      вражає. Якщо комусь знадобиться порада по будівництву
                      теплиці, пишіть, розповім.
                    </p>
                  </div>
                  <div className="body-comment__bottom bottom-body-comment">
                    <div className="bottom-body-comment__actions">
                      <div className="bottom-body-comment__answer-button answer-button">
                        <span className="answer-button__text">Відповісти</span>
                      </div>
                      <a href="#" className="bottom-body-comment__write">
                        Написати особисте повідомлення
                      </a>
                    </div>
                    <div className="bottom-body-comment__block">
                      <div className="bottom-body-comment__info info-item-forum">
                        <div className="info-item-forum__item">
                          <div className="info-item-forum__icon">
                            <Image
                              src="/icons/comments.svg"
                              alt="Icon"
                              width={100}
                              height={100}
                            />
                          </div>
                          <span className="info-item-forum__value">4</span>
                        </div>
                        <div className="info-item-forum__item">
                          <div className="info-item-forum__icon">
                            <button className="like active">
                              <svg
                                width="33"
                                height="30"
                                viewBox="0 0 33 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.0002 26.7323L14.998 26.7303C10.7549 22.8862 7.35391 19.7972 4.9962 16.9153C2.65494 14.0535 1.5 11.58 1.5 8.99183C1.5 4.77155 4.78535 1.5 9 1.5C11.3943 1.5 13.7168 2.62136 15.2258 4.37798L16.3636 5.70249L17.5015 4.37798C19.0105 2.62136 21.3329 1.5 23.7273 1.5C27.9419 1.5 31.2273 4.77155 31.2273 8.99183C31.2273 11.58 30.0723 14.0535 27.7311 16.9153C25.3734 19.7972 21.9724 22.8862 17.7293 26.7303L17.7271 26.7323L16.3636 27.9724L15.0002 26.7323Z"
                                  fill="white"
                                  stroke="#BA360C"
                                  stroke-width="3"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          <span className="info-item-forum__value">8</span>
                        </div>
                      </div>
                      <span className="bottom-body-comment__date">
                        21 березня 17:47
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="forum-comments__comment comment">
              <div className="comment__user user-chat">
                <div className="user-chat__image item-block-chat__image"></div>
                <div className="user-chat__name">Дмитро Вишнивецький</div>
              </div>
              <div className="comment__block">
                <div className="comment__body body-comment">
                  <div className="body-comment__content">
                    <p>
                      Добрий день, зараз займаюсь будівлею теплиці і
                      полікарбонат обрав, як найпідходящу сировину. На мою
                      думку, це неймовірне рішення, і тепло, і свілто вдень буде
                      потрапляти. На майбутнє, можливо ще полагоджу навіс на
                      дворі, бо бачив на роботі такий дах і його стійкість
                      вражає. Якщо комусь знадобиться порада по будівництву
                      теплиці, пишіть, розповім.
                    </p>
                  </div>
                  <div className="body-comment__bottom bottom-body-comment">
                    <div className="bottom-body-comment__actions">
                      <div className="bottom-body-comment__answer-button answer-button">
                        <span className="answer-button__text">Відповісти</span>
                      </div>
                      <a href="#" className="bottom-body-comment__write">
                        Написати особисте повідомлення
                      </a>
                    </div>
                    <div className="bottom-body-comment__block">
                      <div className="bottom-body-comment__info info-item-forum">
                        <div className="info-item-forum__item">
                          <div className="info-item-forum__icon">
                            <Image
                              src="/icons/comments.svg"
                              alt="Icon"
                              width={100}
                              height={100}
                            />
                          </div>
                          <span className="info-item-forum__value">4</span>
                        </div>
                        <div className="info-item-forum__item">
                          <div className="info-item-forum__icon">
                            <button className="like active">
                              <svg
                                width="33"
                                height="30"
                                viewBox="0 0 33 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.0002 26.7323L14.998 26.7303C10.7549 22.8862 7.35391 19.7972 4.9962 16.9153C2.65494 14.0535 1.5 11.58 1.5 8.99183C1.5 4.77155 4.78535 1.5 9 1.5C11.3943 1.5 13.7168 2.62136 15.2258 4.37798L16.3636 5.70249L17.5015 4.37798C19.0105 2.62136 21.3329 1.5 23.7273 1.5C27.9419 1.5 31.2273 4.77155 31.2273 8.99183C31.2273 11.58 30.0723 14.0535 27.7311 16.9153C25.3734 19.7972 21.9724 22.8862 17.7293 26.7303L17.7271 26.7323L16.3636 27.9724L15.0002 26.7323Z"
                                  fill="white"
                                  stroke="#BA360C"
                                  stroke-width="3"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          <span className="info-item-forum__value">8</span>
                        </div>
                      </div>
                      <span className="bottom-body-comment__date">
                        21 березня 17:47
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
