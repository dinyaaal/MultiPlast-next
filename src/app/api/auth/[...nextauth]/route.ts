import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        if (credentials.email && credentials.password) {
          try {
            const res = await fetch("http://13.60.7.255/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });

            const user = await res.json();

            if (!res.ok || ("success" in user && !user.success)) {
              throw new Error(user.message || "Login failed");
            }

            return { ...user };
          } catch (e) {
            console.error(e);
            return null;
          }
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // Если авторизация через Google
      if (account?.provider === "google" && account.access_token) {
        token.google_id = account.providerAccountId; // Сохраняем Google ID
        token.google_token = account.access_token; // Сохраняем Google Token
      }
      // Если авторизация через Credentials
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // Передаем данные из токена в сессию
      if (token?.user) {
        session.user = token.user as any;
      }
      // if (token?.google_id) {
      //   session.google_id = token.google_id;     // Добавляем Google ID в сессию
      // }
      // if (token?.google_token) {
      //   session.google_token = token.google_token; // Добавляем Google Token в сессию
      // }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
