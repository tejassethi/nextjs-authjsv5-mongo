"use server";

import { auth } from "../../auth";
import Stripe from "stripe";
import { Plan, User } from "../models/userModel";
import { connectToDatabase } from "../database/db";
import { redirect } from "next/navigation";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

export async function manageStripeSubscriptionAction(lineItems: LineItem[]) {
  const userSession = await auth();
  if (!userSession?.user) {
    return { sessionId: null, checkoutError: "You need to sign in first." };
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL as string;

  const isSubscribed =
    userSession.user.stripePriceId &&
    userSession.user.stripeCurrentPeriodEnd &&
    new Date(userSession.user.stripeCurrentPeriodEnd).getTime() > Date.now();

  if (isSubscribed && userSession.user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSession.user.stripeCustomerId,
      return_url: origin,
    });

    return { url: stripeSession.url };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: origin,
    cancel_url: origin,
    customer_email: userSession.user.email,
    metadata: {
      email: userSession.user.email,
    },
  });

  return redirect(session.url as string);
}

export default async function UpdatePeriodEnded(customerEmail: any) {
  await connectToDatabase();
  const user = await User.findOne({ email: customerEmail });

  console.log(user);

  if (!user || !user.stripeSubscriptionId)
    return { message: "No user subscription" };

  if (
    user.stripeCurrentPeriodEnd &&
    new Date() < new Date(user.stripeCurrentPeriodEnd)
  )
    return { message: "Subscription not ended" };

  const subscription = await stripe.subscriptions.retrieve(
    user.stripeSubscriptionId
  );

  if (subscription.status === "active") {
    const subscriptionData = {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: user.plan,
    };
    await User.findOneAndUpdate({ email: customerEmail }, subscriptionData);
    return { message: "Subscription active, updated stripeCurrentPeriodEnd" };
  } else {
    await User.findOneAndUpdate(
      { email: customerEmail },
      {
        stripeSubscriptionId: null,
        stripePriceId: null,
        plan: "6648677b5167ea9cbc4310d0",
      }
    );
    return { message: "Subscription inactive, updated plan to default." };
  }

  return;
}

// export async function getUserSubscriptionPlan() {
//   const session = await auth();
//   await connectToDatabase();

//   if (!session || !session.user) {
//     throw new Error("User not found in session.");
//   }

//   const user = await User.findOne({ email: session.user.email });

//   if (!user) {
//     throw new Error("User not found in database.");
//   }

//   const isSubscribed =
//     user.stripePriceId &&
//     user.stripeCurrentPeriodEnd &&
//     new Date(user.stripeCurrentPeriodEnd).getTime() > Date.now();

//   const plan = isSubscribed
//     ? await Plan.findOne({ stripePriceId: user.stripePriceId })
//     : null;

//   let isCanceled = false;
//   let stripePlan;
//   if (isSubscribed && user.stripeSubscriptionId) {
//     stripePlan = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
//     isCanceled = stripePlan.cancel_at_period_end;
//   }

//   return {
//     ...plan,
//     stripePlan,
//     stripeSubscriptionId: user.stripeSubscriptionId,
//     stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
//     stripeCustomerId: user.stripeCustomerId,
//     isSubscribed,
//     isCanceled,
//   };
// }
