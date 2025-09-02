import NextAuth from "next-auth";
import { UserAuth } from "@/types/types";

declare module "next-auth" {
  interface Session {
    user: UserAuth;
  }

  interface Token {
    user?: UserAuth;
    exp?: number;
  }

  interface User extends UserAuth {}
}
