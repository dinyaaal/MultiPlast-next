import NextAuth from "next-auth";
import { UserAuth } from "@/types/types";

declare module "next-auth" {
  interface Session {
    user: UserAuth;
    // Добавляем поле ошибки, чтобы фронтенд знал, когда токен протух
    error?: "AccessTokenError";
  }

  interface JWT {
    user?: UserAuth;
    // Добавляем ошибку и сюда для колбэка jwt
    error?: "AccessTokenError";
  }

  // Расширяем стандартный объект User данными из твоего UserAuth
  interface User extends UserAuth { }
}
