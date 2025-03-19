import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: number;
  access_token: string;
  email: string;
  first_name: string;
  city: string;
  phone_number: string;
  avatar: string;
  last_name: string;
}

const verifyGoogleToken = async (idToken: string, email: string) => {
  console.log("Sending Google token verification request...");
  console.log("ID Token:", idToken);
  console.log("Email:", email);
  const response = await fetch(
    "https://multiplast.web-hub.online/api/auth/google",
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
            const res = await fetch(
              "https://multiplast.web-hub.online/api/auth/login",
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

  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     // Если авторизация через Google
  //     if (account?.provider === "google") {
  //       if (account.id_token) {
  //         token.id_token = account.id_token; // Сохраняем Google ID Token
  //       }
  //     }
  //     // Если авторизация через Credentials
  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     // Передаем данные из токена в сессию
  //     if (token?.user) {
  //       session.user = token.user as any;
  //     }

  //     if (token?.id_token) {
  //       session.id_token = token.id_token; // Добавляем Google ID Token в сессию
  //     }
  //     return session;
  //   },
  // },

  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log("Account object:", account); // Логируем account

      if (account?.provider === "google") {
        console.log("Google Account Data:", account); // Дополнительное логирование для отладки
        console.log("Google Profile Data:", profile); // Дополнительное логирование для отладки

        if (!profile?.email) {
          throw new Error("No profile email"); // Проверка наличия email
        }

        if (account.id_token && profile.email) {
          // Если ID Token и email есть, отправляем запрос на верификацию
          console.log("Proceeding to Google token verification...");

          const verificationResponse = await verifyGoogleToken(
            account.id_token,
            profile.email
          );

          console.log(
            "Google token verification response:",
            verificationResponse
          );

          // Если ответ содержит нужные данные, сохраняем их в токен
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
        } else {
          console.error("Google ID Token or Email is missing", account);
        }
      }

      // Если авторизация через Credentials, сохраняем данные пользователя
      if (user && !token.user) {
        token.user = user; // Сохраняем данные о пользователе, если они не были уже сохранены через Google
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as User;
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
});

export { handler as GET, handler as POST };
