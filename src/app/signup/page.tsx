"use server";

import { auth, signIn } from "@/auth";
import SignUpForm from "@/components/client/signupForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/member");

  return (
    <div>
      <div>
        <div>
          <h2>Sign Up</h2>
        </div>
        <SignUpForm />
        <div>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <div>
              <button type="submit">Sign up with Google</button>
            </div>
          </form>
          <Link href="/login">
            Already have an account?
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
