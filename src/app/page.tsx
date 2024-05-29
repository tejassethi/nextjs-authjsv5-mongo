"use server";

import { getUserWithPlan } from "@/lib/actions/user.actions";
import { auth } from "../auth";
import MainForm from "../components/client/main/mainForm";
export default async function Home() {
  const session = await auth();
  const { success, data, message } = await getUserWithPlan(session?.user.email);

  if (!success) console.log(message);

  console.log(data);
  return (
    <>
      <div className="flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative">
        <div className="w-full sm:px-10 px-5 xl:px-0 pt-6 md:pt-12">
          <MainForm />
        </div>
      </div>
    </>
  );
}
