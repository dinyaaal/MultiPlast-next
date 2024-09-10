import Breadcrumbs from "@/Components/Breadcrumbs";
import ForumCard from "@/Components/Forum/components/ForumCard";
import ForumLayout from "@/Components/Forum/components/ForumLayout";
import Sections from "@/Components/Forum/components/Sections";
import Select from "@/Components/Select/Select";
import Image from "next/image";
import React from "react";

export default function Forum() {
  return (
    <>
      <ForumLayout>
        <div className="body-forum__container">
          <div className="body-forum__content">
            <Sections />

            <p className="body-forum__text">Виберіть тему форуму:</p>
            <div className="body-forum__items">
              <ForumCard />
              <ForumCard />
              <ForumCard />
              <ForumCard />
            </div>
            <div className="body-forum__pages pages">
              <button className="pages__arrow pages__arrow-prev disabled">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="3.5"
                    fill="#1858B8"
                    stroke="#1858B8"
                  ></rect>
                  <path
                    d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <div className="pages__body">
                <div className="pages__page active">1</div>
                <div className="pages__page">2</div>
                <div className="pages__page">...</div>
                <div className="pages__page">25</div>
              </div>
              <button className="pages__arrow pages__arrow-next">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="3.5"
                    fill="#1858B8"
                    stroke="#1858B8"
                  ></rect>
                  <path
                    d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </ForumLayout>
    </>
  );
}
