"use client";

import { manageStripeSubscriptionAction } from "@/lib/actions/stripe.actions";
import { UseCurrentUser } from "@/lib/use-current-user";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PlanButton = (currentPlanId: any, tier: any) => {
  const router = useRouter();
  const user = UseCurrentUser();
  const handleSubmit = async (selectedStripePriceId: any) => {
    try {
      await manageStripeSubscriptionAction([
        {
          price: selectedStripePriceId,
          quantity: 1,
        },
      ]);
    } catch (err) {
      console.error((err as Error).message);
      toast.error("Something went wrong, please try again later.");
    }
  };
  return (
    <button
      onClick={() => {
        if (!user) router.push("/login");
        if (parseFloat(tier?.price) > 0) {
          handleSubmit(tier?.stripePriceId);
        }
      }}
      className={cn(
        tier?._id !== currentPlanId
          ? "border-2 border-green-dark text-white bg-green dark:border-yellow-dark dark:text-black dark:bg-yellow-dark"
          : `border-2 border-green-dark text-green-dark dark:border-yellow-dark dark:text-yellow-dark ${
              parseFloat(tier?.price) > 0
                ? "hover:bg-green hover:text-white dark:hover:bg-yellow-dark dark:hover:text-black"
                : " cursor-default"
            }`,
        "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
      )}
    >
      {tier?._id === currentPlanId ? "Your current plan" : "Get started today"}
    </button>
  );
};

export default PlanButton;
