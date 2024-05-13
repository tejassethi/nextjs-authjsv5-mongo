"use server";

import { auth, signOut } from "@/auth";
import Navbar from "@/components/server/navbar";
import { redirect } from "next/navigation";

const page = async () => {
  const session: any = await auth();
  console.log(session);
  if (!session?.user) {
    redirect("/auth/login");
  }
  console.log(session);
  return <>{<Navbar role={session?.user?.plan?.name} />}</>;
};

export default page;
