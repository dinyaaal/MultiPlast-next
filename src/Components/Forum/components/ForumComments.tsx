"use client";

import React, { useState } from "react";
import ForumComment from "./ForumComment";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface ForumCommentsProps {
  comments: Comment[];
}

export default function ForumComments({ comments }: ForumCommentsProps) {
  const [visibleComments, setVisibleComments] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const toggleComments = () => {
    if (showAll) {
      setVisibleComments(1);
    } else {
      setVisibleComments(comments.length);
    }
    setShowAll(!showAll);
  };

  return (
    <div className="forum-comments__body">
      <h3 className="forum-comments__title title--small">Обговорення</h3>
      <div className="forum-comments__content">
        {comments.slice(0, visibleComments).map((comment) => (
          <ForumComment key={comment.id} comment={comment} />
        ))}
      </div>
      <button
        type="button"
        className="forum-comments__more block__more button"
        onClick={toggleComments}
      >
        <span>{showAll ? "Сховати" : "Дивитися ще"}</span>
      </button>
    </div>
  );
}
