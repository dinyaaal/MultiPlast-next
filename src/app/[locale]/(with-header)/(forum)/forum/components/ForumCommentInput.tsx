"use client";

import React, { useEffect, useState } from "react";

interface ForumCommentInputProps {
  postId: number;
}

export default function ForumCommentInput({ postId }: ForumCommentInputProps) {
  return (
    <div className="forum-comments__write write-forum-comments">
      <div className="write-forum-comments__block">
        <h3 className="forum-comments__title title--small">
          Написати відповідь
        </h3>

        <div className="input-block editor">
          <textarea
            id="editor"
            className="description__input input"
            placeholder="Написати..."
          ></textarea>
        </div>
      </div>
      <button className="write-forum-comments__button button">Надіслати</button>
    </div>
  );
}
