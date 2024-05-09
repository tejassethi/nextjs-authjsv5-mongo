"use server";

import Link from "next/link";
import React from "react";
import LoginForm from "../../components/client/loginForm";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/member");

  return (
    <div>
      <div>
        <div>
          <h2>Sign in to your account</h2>
        </div>
        <LoginForm />
        <div>
          <form
            className="space-y-6 pt-4"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <div>
              <button type="submit">Sign in with Google</button>
            </div>
          </form>

          <Link href="/signup">
            Don't have an account?
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
