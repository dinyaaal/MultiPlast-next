"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoData, setUserInfoError } from "@/store/userInfoSlice";
import { RootState } from "@/store/store";
import { setFavorites } from "@/store/favoritesSlice";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);

  console.log(session);

  const fetchUserInfo = async () => {
    if (!session) return;

    dispatch(setUserInfoError(null));

    try {
      const responseUserInfo = await fetch(
        `/api/users/get?id=${session?.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );

      if (!responseUserInfo.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await responseUserInfo.json();

      if (data) {
        console.log(`User: ${JSON.stringify(data)} `);
        dispatch(setUserInfoData(data));
      } else {
        dispatch(setUserInfoError("Unknown error occurred"));
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
      dispatch(setUserInfoError("Error"));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      fetchUserInfo();
    }
  }, [session]);

  return <>{children}</>;
}
