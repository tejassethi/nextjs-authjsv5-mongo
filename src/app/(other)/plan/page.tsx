"use server";

import {
  getAllPlans,
  getUserPlanFromStripe,
  getUserWithPlan,
} from "../../../lib/actions/user.actions";
import { auth } from "../../../auth";
import PlanCards from "../../../components/client/planCards";

export default async function Plan() {
  const session = await auth();

  const plan = await getAllPlans();
  if (!plan.success) console.log(plan.message);

  const { success, data, message } = await getUserWithPlan(session?.user.email);

  if (!success) console.log(message);

  console.log(data);

  return (
    <>
      <div className="flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative">
        <div className="w-full sm:px-10 px-5 xl:px-0">
          <div className="w-full flex justify-center place-items-center">
            <div className="w-full pt-6 md:pt-12">
              <h3 className=" text-3xl font-bold text-center text-green dark:text-yellow-dark">
                Pricing
              </h3>
              <PlanCards
                tiers={plan.plans}
                currentPlanId={session ? data?.plan?._id : ""}
                user={session?.user}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
