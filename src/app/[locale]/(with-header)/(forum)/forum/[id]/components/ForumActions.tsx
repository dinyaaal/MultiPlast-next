"use client";

import { ButtonMain } from "@/components/ButtonMain";
import ShareBtn from "@/components/shareBtn";
import { Link } from "@/i18n/routing";
import { SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";

interface ForumActionsProps {
  id: number;
  author_id: number;
}

export default function ForumActions({ id, author_id }: ForumActionsProps) {
  const { data: session, status } = useSession();
  return (
    <div className="top-product__actions actions-top">
      {session?.user.id === author_id && (
        <ButtonMain type="button" color='transparent' isIconOnly as={Link} href={`/forum?tab=add&edit=${id}`} >
          <SquarePen className="size-8 text-blueColor" />
        </ButtonMain>
      )}
      <ShareBtn />
    </div>
  );
}
