import NextAuth from "next-auth";
import { DefaulUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { data: any };
  }
  interface User extends DefaultUser {
    data: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    data?: any;
  }
}
