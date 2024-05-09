import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
import { User } from "./models/userModel";
import { compare } from "bcryptjs";
import { connectDatabase } from "./lib/utils";

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

        if (!email || !password)
          throw new CredentialsSignin({
            cause: "Please fill out all the empty fields.",
          });

        await connectDatabase();

        const user = await User.findOne({ email }).select("+password");

        if (!user)
          throw new CredentialsSignin({ cause: "Invalid credentials." });
        if (!user.password)
          throw new CredentialsSignin(
            "Invalid credentials or Signed in with a Provider"
          );
        const isMatch = await compare(password, user.password);
        if (!isMatch)
          throw new CredentialsSignin({ cause: "Incorrect Password" });

        return { user: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;
          await connectDatabase();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser)
            await User.create({
              email,
              name,
              googleID: id,
            });
          return true;
        } catch (error) {
          throw new AuthError("Error while creating user.");
        }
      }
      return true;
    },
  },
});
