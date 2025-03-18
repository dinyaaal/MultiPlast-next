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
        `/api/users/get?token=${session?.user.access_token}&id=${session?.user.id}`
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

  const fetchFavorites = async () => {
    if (!session) return;

    try {
      const responseFavorites = await fetch(
        `/api/favorites/get?token=${session?.user.access_token}`
      );

      if (!responseFavorites.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await responseFavorites.json();

      if (data) {
        dispatch(setFavorites(data));
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  // const fetchCategories = async () => {
  //   try {
  //     const res = await fetch(`/api/categories`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!res.ok) throw new Error("Failed to fetch categories");

  //     const data = await res.json();
  //     dispatch(setCategories(data));
  //   } catch (error) {
  //     console.error("Ошибка загрузки категорий:", error);
  //   }
  // };

  useEffect(() => {
    // if (categories.length === 0) {
    //   fetchCategories();
    // }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      fetchUserInfo();
    }
    // fetchFavorites();
  }, [session]);

  return <>{children}</>;
}
