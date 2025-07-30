import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { UserAuth } from "@/types/types";

const verifyGoogleToken = async (idToken: string, email: string) => {
  console.log("Sending Google token verification request...");
  console.log("ID Token:", idToken);
  console.log("Email:", email);
  const response = await fetch(
    "https://multiplast-api.web-hub.online/api/auth/google",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_token: idToken,
        email: email,
      }),
    }
  );

  const data = await response.json();
  return data; // В ответе может быть информация о пользователе или статус верификации
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(
            "https://multiplast-api.web-hub.online/api/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const user = await res.json();
          if (!res.ok || ("success" in user && !user.success)) {
            throw new Error(user.message || "Login failed");
          }

          return { ...user };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "google") {
        if (!profile?.email) throw new Error("No profile email");

        if (account.id_token && profile.email) {
          const verificationResponse = await verifyGoogleToken(
            account.id_token,
            profile.email
          );

          if (
            verificationResponse &&
            verificationResponse.id &&
            verificationResponse.access_token
          ) {
            token.user = {
              id: verificationResponse.id,
              access_token: verificationResponse.access_token,
              email: verificationResponse.email,
              first_name: verificationResponse.first_name,
              last_name: verificationResponse.last_name,
              city: verificationResponse.city,
              phone_number: verificationResponse.phone_number,
              avatar: verificationResponse.avatar,
            };
          } else {
            throw new Error(
              "Google token verification failed: Missing expected data"
            );
          }
        }
      }

      if (user && !token.user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as UserAuth;
      }
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
};
