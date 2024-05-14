"use server";

import { auth, signOut } from "@/auth";
import Navbar from "@/components/server/navbar";
import { redirect } from "next/navigation";

const page = async () => {
  const session: any = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  return <>{<Navbar />}</>;
};

export default page;
