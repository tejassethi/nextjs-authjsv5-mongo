"use server";

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  } else {
    return (
      <div>
        <h1>Welcome, {JSON.stringify(session.user)}</h1>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }
};

export default page;
