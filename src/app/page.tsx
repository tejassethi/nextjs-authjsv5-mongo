import { auth } from "@/auth";
import DropTop from "@/components/client/header";
import MainCard from "@/components/client/mainCard";
import Navbar from "@/components/server/navbar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/member");
  } else {
    return (
      <div className="bg-[#FFF2E1] relative h-full min-h-screen pb-6 md:pb-0">
        <Navbar />
        <div className="flex flex-col md:h-screen md:justify-center place-items-center pt-28 md:pt-0">
          <DropTop />
          <MainCard />
        </div>
      </div>
    );
  }
}
