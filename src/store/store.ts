"use client";

import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
import categoriesReducer from "./categoriesSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    categories: categoriesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
