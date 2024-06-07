"use server";

import { getUserWithPlan } from "@/lib/actions/user.actions";
import { auth } from "../auth";
import UpdatePeriodEnded from "@/lib/actions/stripe.actions";
import Header from "@/components/header";
export default async function Home() {
  // const session = await auth();

  // const { success, data, message } = await getUserWithPlan(session?.user.email);

  // if (!success) console.log(message);

  // console.log(data);

  // const getuserupdate = await UpdatePeriodEnded(session?.user.email);

  // console.log(getuserupdate?.message);

  return (
    <>
      <Header />
    </>
  );
}
