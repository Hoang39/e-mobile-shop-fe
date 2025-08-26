import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signIn as login } from "./app/api/userApi";

export const authOptions = {
  providers: [GithubProvider],
  callbacks: {
    async signIn({ user }) {
      try {
        const email = user.email;

        const signInResponse = await login({
          email,
          password: email,
          type: "oauth",
          name: user.name || "",
        });

        if (signInResponse._id) {
          user.token = signInResponse.token;
          return true;
        }
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        return false;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user?.token) {
        token.token = user.token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      if (token?.token) {
        session.token = token.token;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
