import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      access_token: string;
      email: string;
      first_name: string;
      city: string;
      phone_number: string;
      avatar: string;
      last_name: string;
    };
  }
}
