import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        access_token: { type: "text" },
      },
      async authorize(credentials, req) {
        if (credentials?.access_token) {
          const userResponse = await fetch(
            "http://95.164.45.89:1335/api/user/session/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${credentials.access_token}`,
              },
            }
          );

          const user = await userResponse.json();

          if (userResponse.ok && user) {
            return user;
          }
          return null;
        }

        if (credentials?.email && credentials?.password) {
          const res = await fetch(
            "http://95.164.45.89:1335/api/auth/sign_in/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};
