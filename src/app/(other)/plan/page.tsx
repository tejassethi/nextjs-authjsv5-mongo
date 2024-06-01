"use server";

import {
  getAllPlans,
  getUserPlanFromStripe,
  getUserWithPlan,
} from "../../../lib/actions/user.actions";
import { auth } from "../../../auth";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import PlanButton from "@/components/client/planButton";

export default async function Plan() {
  const session = await auth();

  const plan = await getAllPlans();
  if (!plan.success) console.log(plan.message);

  let success, data, message;

  if (session?.user) {
    ({ success, data, message } = await getUserWithPlan(session?.user.email));
    if (!success) console.log(message);
  }

  console.log(data);

  const tiers = plan.plans;
  const currentPlanId = session?.user
    ? data?.plan?._id
    : "6648677b5167ea9cbc4310d0";

  const mostPopularTier = tiers?.reduce(
    (prev: any, current: any) =>
      parseFloat(current.price) > parseFloat(prev.price) ? current : prev,
    tiers[0]
  );

  const currentPlan = tiers.find((tier: any) => tier._id === currentPlanId);
  const currentPlanPrice = parseFloat(currentPlan?.price) || 0;

  return (
    <>
      <div className="flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative">
        <div className="w-full sm:px-10 px-5 xl:px-0">
          <div className="w-full flex justify-center place-items-center">
            <div className="w-full pt-6 md:pt-12">
              <h3 className=" text-3xl font-bold text-center text-green dark:text-yellow-dark">
                Pricing
              </h3>
              <div className="w-full flex justify-center pb-10">
                <div className="w-full md:w-max pt-10 flex flex-wrap justify-center place-items-center gap-5 ">
                  {tiers
                    .sort(
                      (a: any, b: any) =>
                        parseFloat(a.price) - parseFloat(b.price)
                    )
                    .map((tier: any) => {
                      if (parseFloat(tier.price) < currentPlanPrice) {
                        return null;
                      }
                      return (
                        <div
                          key={tier.name}
                          className={cn(
                            tier === mostPopularTier ? "border-4" : "border-2",
                            "rounded-3xl p-10 min-w-[315px] max-w-[380px] border-green dark:border-gray"
                          )}
                        >
                          <div className="flex items-center justify-between gap-x-4">
                            <h3
                              id={tier.id}
                              className={cn(
                                tier.mostPopular
                                  ? "text-green-dark dark:text-yellow-dark"
                                  : "text-green-dark dark:text-yellow-dark",
                                "text-xl font-bold leading-8"
                              )}
                            >
                              {tier.name} Plan
                            </h3>
                            {tier === mostPopularTier ? (
                              <p className="rounded-full bg-green dark:bg-yellow-dark text-white dark:text-black px-2.5 py-1 text-xs font-semibold leading-5">
                                Most popular
                              </p>
                            ) : null}
                          </div>
                          <p className="mt-4 text-sm leading-6 text-gray-600 h-[100px]">
                            {tier.description}
                          </p>
                          <p className="mt-6 flex items-baseline gap-x-1">
                            <span className="text-4xl font-bold tracking-tight text-gray-900">
                              {tier.price}
                            </span>
                            <span className="text-sm font-semibold leading-6 text-gray-600">
                              /month
                            </span>
                          </p>
                          <PlanButton
                            currentPlanId={currentPlanId}
                            tier={tier}
                          />
                          <ul
                            role="list"
                            className="mt-8 text-sm leading-6 space-y-3"
                          >
                            {tier.features.map((feature: any) => (
                              <li
                                key={feature}
                                className="flex gap-x-2 justify-start place-items-center"
                              >
                                <Check className="h-6 w-5 flex-none" />
                                <span className="">
                                  {feature.split(" / ")[0]}
                                </span>
                                {feature.split(" / ")[1] && (
                                  <span className="text-green-dark dark:text-yellow-dark">
                                    {" / "}
                                    {feature.split(" / ")[1]}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
