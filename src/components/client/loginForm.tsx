"use client";
import { loginHandler } from "@/actions/login";
import { redirect } from "next/navigation";

const LoginForm = () => {
  return (
    <form
      className="space-y-6"
      action={async (formData) => {
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if (!email || !password) {
          throw new Error("Please fill out all the empty fields.");
        }
        const LoginError = await loginHandler(email, password);

        if (!LoginError) {
          console.log("success");
          redirect("/member");
        } else {
          console.log(LoginError);
        }
      }}
    >
      <div>
        <label htmlFor="email">Email address</label>
        <div>
          <input id="email" name="email" type="email" required></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <a href="#">Forgot password?</a>
          </div>
        </div>
        <div>
          <input id="password" name="password" type="password" required></input>
        </div>
      </div>

      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
};

export default LoginForm;
