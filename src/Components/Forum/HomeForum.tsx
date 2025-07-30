"use server";

import Image from "next/image";
import React from "react";
import { ForumPost } from "@/types/types";
import { ForumCard } from "./components/ForumCard";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function getForumPosts(): Promise<ForumPost[] | null> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", "1");
  queryParams.append("perPage", "3");

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/forum/get${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    return data.data as ForumPost[];
  } catch {
    return null;
  }
}

export default async function HomeForum() {
  const t = await getTranslations("HomeForum");
  const posts = await getForumPosts();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="home-forum">
      <div className="home-forum__container">
        <h2 className="home-forum__title title">{t("forum")}</h2>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
          {posts &&
            posts.map((post) => <ForumCard small key={post.id} post={post} />)}
        </div>
        <div className="home-forum__body body-home-forum">
          <div className="body-home-forum__block">
            <h3 className="body-home-forum__title title--small">
              {t("joinSpecializedForum")}
            </h3>
            <p className="body-home-forum__text">{t("chatShareExperience")}</p>
          </div>
          <Link href="/forum" className="body-home-forum__link button">
            {t("goToForum")}
          </Link>

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
