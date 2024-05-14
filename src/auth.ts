import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
import {
  authorizeUser,
  createUserWithGoogle,
  getUser,
} from "./lib/actions/user.actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credential({
      name: "Credentails",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await authorizeUser(email, password);
        if (!user.success) throw new CredentialsSignin({ cause: user.message });
        return { data: user.data };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;

          const existingUser = await getUser(email);

          if (!existingUser.success) {
            const createdUser = await createUserWithGoogle(name, email, id);
            if (createdUser.success) {
              const newUser = await getUser(email);
              if (newUser.success) {
                console.log("New user created:", newUser);
                user.data = newUser.data;
                return true;
              }
            }
          }
          user.data = existingUser.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.data = user.data;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.data) {
        session.user = token.data;
      }
      return session;
    },
  },
});
