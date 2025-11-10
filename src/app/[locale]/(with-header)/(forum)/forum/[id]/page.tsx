import notFound from "@/app/[locale]/not-found";
import ModalContact from "@/components/Modals/ModalContact";
import { ForumPost } from "@/types/types";
import React from "react";
import Gallery from "@/components/Gallery";
import ForumComments from "../components/ForumComments";
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
            <h2 className="top-body-forum-topic__title title"><span className="text-base text-gray-500">ID: {post.id}</span> {post.title}</h2>
            <ForumActions id={params.id} />
            {/* <div className="top-product__actions actions-top">
              <a href="#" className="actions-top__item edit">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0395 3.24608L26.7539 3.96054C27.309 4.51557 27.309 5.41308 26.7539 5.96221L25.0357 7.68637L22.3136 4.96433L24.0319 3.24608C24.5869 2.69104 25.4844 2.69104 26.0336 3.24608H26.0395ZM12.3879 14.8959L20.312 6.966L23.034 9.68804L15.1041 17.6121C14.9328 17.7833 14.7203 17.9073 14.49 17.9722L11.0358 18.9583L12.0218 15.5041C12.0868 15.2738 12.2108 15.0613 12.382 14.89L12.3879 14.8959ZM22.0302 1.2444L10.3804 12.8884C9.86665 13.4021 9.49466 14.0339 9.29981 14.7247L7.61108 20.6293C7.46937 21.1253 7.60518 21.6567 7.97126 22.0228C8.33735 22.3889 8.86877 22.5247 9.36476 22.383L15.2694 20.6943C15.9661 20.4935 16.5979 20.1215 17.1057 19.6137L28.7556 7.96979C30.4148 6.31058 30.4148 3.61807 28.7556 1.95886L28.0411 1.2444C26.3819 -0.414801 23.6894 -0.414801 22.0302 1.2444ZM5.19608 3.54721C2.32643 3.54721 0 5.87364 0 8.7433V24.8039C0 27.6736 2.32643 30 5.19608 30H21.2567C24.1264 30 26.4528 27.6736 26.4528 24.8039V18.1907C26.4528 17.4054 25.821 16.7736 25.0357 16.7736C24.2504 16.7736 23.6186 17.4054 23.6186 18.1907V24.8039C23.6186 26.1088 22.5616 27.1658 21.2567 27.1658H5.19608C3.89116 27.1658 2.83423 26.1088 2.83423 24.8039V8.7433C2.83423 7.43837 3.89116 6.38144 5.19608 6.38144H11.8093C12.5946 6.38144 13.2264 5.74964 13.2264 4.96433C13.2264 4.17901 12.5946 3.54721 11.8093 3.54721H5.19608Z"
                    fill="#B0BFD7"
                  />
                </svg>
              </a>
              <a href="#" className="actions-top__item share">
                <svg
                  width="27"
                  height="30"
                  viewBox="0 0 27 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5 30C21.25 30 20.1875 29.5625 19.3125 28.6875C18.4375 27.8125 18 26.75 18 25.5C18 25.325 18.0125 25.1435 18.0375 24.9555C18.0625 24.7675 18.1 24.599 18.15 24.45L7.575 18.3C7.15 18.675 6.675 18.969 6.15 19.182C5.625 19.395 5.075 19.501 4.5 19.5C3.25 19.5 2.1875 19.0625 1.3125 18.1875C0.4375 17.3125 0 16.25 0 15C0 13.75 0.4375 12.6875 1.3125 11.8125C2.1875 10.9375 3.25 10.5 4.5 10.5C5.075 10.5 5.625 10.6065 6.15 10.8195C6.675 11.0325 7.15 11.326 7.575 11.7L18.15 5.55C18.1 5.4 18.0625 5.2315 18.0375 5.0445C18.0125 4.8575 18 4.676 18 4.5C18 3.25 18.4375 2.1875 19.3125 1.3125C20.1875 0.4375 21.25 0 22.5 0C23.75 0 24.8125 0.4375 25.6875 1.3125C26.5625 2.1875 27 3.25 27 4.5C27 5.75 26.5625 6.8125 25.6875 7.6875C24.8125 8.5625 23.75 9 22.5 9C21.925 9 21.375 8.894 20.85 8.682C20.325 8.47 19.85 8.176 19.425 7.8L8.85 13.95C8.9 14.1 8.9375 14.269 8.9625 14.457C8.9875 14.645 9 14.826 9 15C9 15.175 8.9875 15.3565 8.9625 15.5445C8.9375 15.7325 8.9 15.901 8.85 16.05L19.425 22.2C19.85 21.825 20.325 21.5315 20.85 21.3195C21.375 21.1075 21.925 21.001 22.5 21C23.75 21 24.8125 21.4375 25.6875 22.3125C26.5625 23.1875 27 24.25 27 25.5C27 26.75 26.5625 27.8125 25.6875 28.6875C24.8125 29.5625 23.75 30 22.5 30Z"
                    fill="#1858B8"
                  ></path>
                </svg>
              </a>
            </div> */}
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
