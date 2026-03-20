import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { UserAuth } from "@/types/types";
import { jwtDecode } from "jwt-decode";

const verifyGoogleToken = async (idToken: string, email: string) => {
  console.log("Sending Google token verification request...");
  console.log("ID Token:", idToken);
  console.log("Email:", email);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      google_token: idToken,
      email: email,
    }),
  });

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
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
          // return { error: e instanceof Error ? e.message : "Unknown error" };
          throw new Error(e instanceof Error ? e.message : "Login failed");
          // return null;
        }
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, account, profile, user }) {
    //   if (account?.provider === "google") {
    //     if (!profile?.email) throw new Error("No profile email");

    //     if (account.id_token && profile.email) {
    //       const verificationResponse = await verifyGoogleToken(
    //         account.id_token,
    //         profile.email
    //       );

    //       if (
    //         verificationResponse &&
    //         verificationResponse.id &&
    //         verificationResponse.access_token
    //       ) {
    //         token.user = {
    //           id: verificationResponse.id,
    //           access_token: verificationResponse.access_token,
    //           email: verificationResponse.email,
    //           first_name: verificationResponse.first_name,
    //           last_name: verificationResponse.last_name,
    //           city: verificationResponse.city,
    //           phone_number: verificationResponse.phone_number,
    //           avatar: verificationResponse.avatar,
    //         };
    //       } else {
    //         throw new Error(
    //           "Google token verification failed: Missing expected data"
    //         );
    //       }
    //     }
    //   }

    //   if (user && !token.user) {
    //     token.user = user;
    //   }

    //   return token;
    // },
    async jwt({ token, account, profile, user }) {
      // 1. Инициализация при первом входе
      if (user) {
        if (account?.provider === "google") {
          if (!profile?.email) throw new Error("No profile email");
          const verificationResponse = await verifyGoogleToken(account.id_token!, profile.email);

          if (verificationResponse?.access_token) {
            token.user = {
              ...verificationResponse,
              id: verificationResponse.id,
              access_token: verificationResponse.access_token,
            };
          } else {
            throw new Error("Google verification failed");
          }
        } else {
          token.user = user;
        }
      }

      // 2. ПРОВЕРКА СРОКА ДЕЙСТВИЯ ТОКЕНА (каждый вызов)
      const userTokens = token.user as any;
      if (userTokens?.access_token) {
        try {
          const decoded = jwtDecode<{ exp: number }>(userTokens.access_token);
          const now = Math.floor(Date.now() / 1000);

          const REFRESH_THRESHOLD = 300;
          const isAboutToExpire = (decoded.exp - now) < REFRESH_THRESHOLD;

          // Если токен просрочен (exp < текущего времени)
          if (isAboutToExpire) {
            console.warn("Token is about to expire or already expired. Triggering logout.");
            return { ...token, error: "AccessTokenError" };
          }
        } catch (e) {
          console.error("Error decoding token:", e);
          return { ...token, error: "AccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as UserAuth;
      }
      // Передаем статус ошибки на клиент, чтобы там вызвать signOut()
      (session as any).error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней (максимальный срок сессии)
  },
  secret: process.env.NEXTAUTH_SECRET,
};
