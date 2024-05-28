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

export async function getUserSubscriptionPlan() {
  const session = await auth();
  await connectToDatabase();

  if (!session || !session.user) {
    throw new Error("User not found in session.");
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    throw new Error("User not found in database.");
  }

  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    new Date(user.stripeCurrentPeriodEnd).getTime() > Date.now();

  const plan = isSubscribed
    ? await Plan.findOne({ stripePriceId: user.stripePriceId })
    : null;

  let isCanceled = false;
  let stripePlan;
  if (isSubscribed && user.stripeSubscriptionId) {
    stripePlan = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripePlan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}
