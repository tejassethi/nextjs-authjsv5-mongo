"use client";

import { manageStripeSubscriptionAction } from "../../lib/actions/stripe.actions";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { UseCurrentUser } from "@/lib/use-current-user";
import { useRouter } from "next/navigation";

export default function PlanCards({ tiers, currentPlanId, user }: any) {
  const router = useRouter();
  const handleSubmit = async (selectedStripePriceId: any) => {
    try {
      const session = await manageStripeSubscriptionAction([
        {
          price: selectedStripePriceId,
          quantity: 1,
        },
      ]);
      if (session) {
        window.location.href = session.url ?? "/plan";
      }
    } catch (err) {
      console.error((err as Error).message);
      toast.error("Something went wrong, please try again later.");
    }
  };

  const mostPopularTier = tiers.reduce(
    (prev: any, current: any) =>
      parseFloat(current.price) > parseFloat(prev.price) ? current : prev,
    tiers[0]
  );

  const currentPlan = tiers.find((tier: any) => tier._id === currentPlanId);
  const currentPlanPrice = parseFloat(currentPlan?.price) || 0;

  return (
    <div className="w-full flex justify-center pb-10">
      <div className="w-full md:w-max pt-10 flex flex-wrap justify-center place-items-center gap-5 ">
        {tiers
          .sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price))
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
                <button
                  onClick={() => {
                    if (!user) {
                      return router.push("/login");
                    }
                    if (parseFloat(tier.price) > 0) {
                      handleSubmit(tier.stripePriceId);
                    }
                  }}
                  className={cn(
                    tier._id !== currentPlanId
                      ? "border-2 border-green-dark text-white bg-green dark:border-yellow-dark dark:text-black dark:bg-yellow-dark"
                      : `border-2 border-green-dark text-green-dark dark:border-yellow-dark dark:text-yellow-dark ${
                          parseFloat(tier.price) > 0
                            ? "hover:bg-green hover:text-white dark:hover:bg-yellow-dark dark:hover:text-black"
                            : " cursor-default"
                        }`,
                    "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                  )}
                >
                  {tier._id === currentPlanId
                    ? "Your current plan"
                    : "Get started today"}
                </button>

                <ul role="list" className="mt-8 text-sm leading-6 space-y-3">
                  {tier.features.map((feature: any) => (
                    <li
                      key={feature}
                      className="flex gap-x-2 justify-start place-items-center"
                    >
                      <Check className="h-6 w-5 flex-none" />
                      <span className="">{feature.split(" / ")[0]}</span>
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
  );
}
