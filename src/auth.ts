import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
import { User } from "./models/userModel";
import { compare } from "bcryptjs";
import { connectDatabase } from "./lib/utils";
import Resend from "next-auth/providers/resend";

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

        await connectDatabase();

        const user = await User.findOneAndUpdate(
          { email: email },
          { last_login: Date.now() },
          { new: true }
        )
          .select("+password")
          .populate("plan");

        if (!user)
          throw new CredentialsSignin({
            cause: "Invalid credentials",
          });
        if (!user.password)
          throw new CredentialsSignin({
            cause: "Please sign in with your provider",
          });
        const isMatch = await compare(password, user.password);
        if (!isMatch)
          throw new CredentialsSignin({ cause: "Incorrect Password" });

        const userObject = user.toObject();
        const { password: userPassword, ...userSafe } = userObject;
        console.log("User logged in:", userSafe);
        return { data: userSafe };
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
          await connectDatabase();
          const existingUser = await User.findOneAndUpdate(
            { email: email },
            { is_verified: true, last_login: Date.now() },
            { new: true }
          ).populate("plan");
          console.log("Existing user updated:", existingUser);

          if (!existingUser) {
            await User.create({
              email,
              name,
              googleID: id,
              is_verified: true,
            });
            const newUser = await User.findOne({ email: email }).populate(
              "plan"
            );
            console.log("New user created:", newUser);
            user.data = newUser;
            return true;
          }
          user.data = existingUser;
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
