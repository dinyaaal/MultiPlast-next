"use client";

import React, { useEffect, useState } from "react";
import ForumComment from "./ForumComment";
import { CommentType } from "@/types/types";

interface ForumCommentProps {
  postId: number;
}

export default function ForumComments({ postId }: ForumCommentProps) {
  const [visibleComments, setVisibleComments] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();

  const toggleComments = () => {
    if (showAll) {
      setVisibleComments(1);
    } else {
      setVisibleComments(comments.length);
    }
    setShowAll(!showAll);
  };

  const fetchComments = async () => {
    setIsLoading(true);
    let queryParams: string[] = [];

    queryParams.push(`page=${currentPage}`);
    queryParams.push(`forum_id=${postId}`);
    // queryParams.push(`perPage=5`);
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    try {
      const res = await fetch(`/api/forum/comments/get${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if (data) {
        setComments(data.data);
        setLastPage(data.last_page);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

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
