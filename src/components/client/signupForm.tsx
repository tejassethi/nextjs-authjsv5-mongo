"use client";

import { loginHandler } from "@/actions/login";
import { signupHandler } from "@/actions/signup";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  return (
    <form
      className="space-y-6"
      action={async (formData) => {
        const name = formData.get("name") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if (!name || !email || !password) {
          throw new Error("Please fill out all the empty fields.");
        }

        const singupError = await signupHandler(name, email, password);
        const LoginError = await loginHandler(email, password);

        if (!singupError && !LoginError) {
          console.log("success");
          redirect("/member");
        } else {
          console.log(singupError || LoginError);
        }
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <div>
          <input id="name" name="name" type="text" required></input>
        </div>
      </div>
      <div>
        <label htmlFor="email">Email address</label>
        <div>
          <input id="email" name="email" type="email" required></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input id="password" name="password" type="password" required></input>
        </div>
      </div>

      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
