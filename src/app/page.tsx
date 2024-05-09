import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/member");
  } else {
    return <h1>Hello to all unauthenticated people.</h1>;
  }
}
