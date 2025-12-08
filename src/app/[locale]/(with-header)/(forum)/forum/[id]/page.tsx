import notFound from "@/app/[locale]/not-found";
import ModalContact from "@/components/Modals/ModalContact";
import { ForumPost } from "@/types/types";
import React from "react";
import Gallery from "@/components/Gallery";
import ForumComments from "./components/ForumComments";
import ForumActions from "./components/ForumActions";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-templates/simple/simple-editor.scss";

type Params = Promise<{ id: string }>;

async function getPost(id: string): Promise<ForumPost | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/forum/post?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // cache: "force-cache",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    return data as ForumPost;
  } catch {
    return null;
  }
}

export default async function ForumTopicPage(props: { params: Params }) {
  const params = await props.params;
  const post = await getPost(params.id);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!post) {
    return notFound();
  }

  return (
    <section className="forum-topic">
      <div className="forum-topic__container main-container">
        <div className="forum-topic__body body-forum-topic">
          <div className="body-forum-topic__top top-body-forum-topic">
            <h2 className="top-body-forum-topic__title title text-start">
              {/* <span className="text-base text-gray-500">ID: {post.id}</span>{" "} */}
              {post.title}
            </h2>
            <ForumActions id={post.id} author_id={post.author_id} />
          </div>

          {/* <div className="body-forum-topic__image">
            <Gallery src={"/product/01.jpg"} thumb={"/product/01.jpg"} />
          </div> */}
          <div className="simple-editor-content !p-0">
            <div
              className=" tiptap ProseMirror simple-editor"
              dangerouslySetInnerHTML={{ __html: post.text }}
            />
          </div>
          <ForumComments postId={post.id} />
          {/* <div className="forum-comments">
            <ForumCommentInput postId={post.id} />
            <ForumComments postId={post.id} />
          </div> */}
        </div>
        <div className="forum-topic__block block-forum-topic">
          <div className="add-forum__info info-contact">
            <div className="info-contact__body">
              <p className="info-contact__text">
                За всіма питаннями і пропозиціями, які у вас виникли, зв'яжіться
                з адміністрацією форуму
              </p>
              <ModalContact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="forum-topic__topics topics-forum-topic">
<h3 className="topics-forum-topic__title title--small">
  Наступні теми:
</h3>
<div className="topics-forum-topic__items">
  <div className="topics-forum-topic__item item-topic">
    <p className="item-topic__title">
      Яке обладнання більш підходить для обробки гранули?
    </p>
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
        ></path>
      </svg>
    </a>
  </div>
  <div className="topics-forum-topic__item item-topic">
    <p className="item-topic__title">
      Яке обладнання більш підходить для обробки гранули?
    </p>
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
        ></path>
      </svg>
    </a>
  </div>
  <div className="topics-forum-topic__item item-topic">
    <p className="item-topic__title">
      Яке обладнання більш підходить для обробки гранули?
    </p>
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
        ></path>
      </svg>
    </a>
  </div>
</div>
</div> */
}
{
  /* <div className="forum-topic__words words-forum-topic">
<h3 className="words-forum-topic__title title--small">
  Ключові слова:
</h3>
<div className="words-forum-topic__items">
  <div className="words-forum-topic__item">властивості</div>
  <div className="words-forum-topic__item">сировина</div>
  <div className="words-forum-topic__item">властивості</div>
  <div className="words-forum-topic__item">сировина</div>
  <div className="words-forum-topic__item">властивості</div>
  <div className="words-forum-topic__item">сировина</div>
</div>
</div> */
}
