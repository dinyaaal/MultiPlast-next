"use client";

import { User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: User = {
//   id: null,
//   first_name: "", // Пустая строка для имени
//   last_name: "", // Пустая строка для фамилии
//   middle_name: null, // Отчество может быть null
//   phone_number: "", // Пустая строка для телефона
//   email: "", // Пустая строка для email
//   city: "", // Пустая строка для города
//   avatar: "", // Пустая строка для URL аватара
//   name_of_enterprise: null, // null для названия предприятия
//   address: null, // null для адреса
//   area: null, // null для района
//   web_site: null, // null для сайта
//   country: null, // null для страны
//   ig_link: null, // null для Instagram
//   fb_link: null, // null для Facebook
//   yt_link: null, // null для YouTube
//   tg_link: null, // null для Telegram
//   birthday: null, // null для дня рождения
//   gender: null, // null для пола
// };

interface UserInfoState {
  data: User | null;
  error: string | null;
}

const initialState: UserInfoState = {
  data: null,
  error: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfoData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    setUserInfoError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearUserInfo(state) {
      state.data = null; // Очищаем данные пользователя
      state.error = null; // Сбрасываем ошибку
    },
  },
});

export const { setUserInfoData, setUserInfoError, clearUserInfo } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
