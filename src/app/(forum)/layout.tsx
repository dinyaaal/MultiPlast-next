import Breadcrumbs from "@/Components/Breadcrumbs";
import ForumCard from "@/Components/Forum/components/ForumCard";
import Sections from "@/Components/Forum/components/Sections";
import Select from "@/Components/Select/Select";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Breadcrumbs position="Форум" />
      <section className="forum">
        <div className="forum__top top-forum">
          <div className="top-forum__container">
            <div className="top-forum__title title">Форум</div>
            <div className="top-forum__block">
              <Select
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                ]}
              />

              <div className="top-forum__search search">
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Пошук по форуму"
                  className="search__input"
                />
                <button className="search__icon-body">
                  <div className="search__icon">
                    <Image
                      src="/icons/search.svg"
                      alt="Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="forum__body body-forum">
          <div className="body-forum__container">{children}</div>
        </div>
      </section>
    </>
  );
}
