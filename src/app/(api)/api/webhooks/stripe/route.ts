import { connectToDatabase } from "../../../../../lib/database/db";
import { Plan, User } from "../../../../../lib/models/userModel";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await connectToDatabase();

    const planID = await Plan.findOne({
      stripePriceId: subscription.items.data[0].price.id,
    });

    await User.findOneAndUpdate(
      { email: session?.metadata?.email },
      {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        plan: planID?._id,
      }
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    try {
      await connectToDatabase();

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (!subscription) {
        console.error(
          "Subscription not found from session:",
          session.subscription
        );
        return new Response("Subscription not found.", { status: 404 });
      }

      const planID = await Plan.findOne({
        stripePriceId: subscription.items.data[0].price.id,
      });

      if (!planID) {
        console.error(
          "Plan not found for price ID:",
          subscription.items.data[0].price.id
        );
        return new Response("Plan not found.", { status: 404 });
      }

      console.log(
        "Checking for matching User document with stripeSubscriptionId:",
        subscription.id
      );

      const userCheck = await User.findOne({
        stripeSubscriptionId: subscription.id,
      });

      if (!userCheck) {
        console.error(
          "No user found with stripeSubscriptionId:",
          subscription.id
        );
        return new Response("No matching user found.", { status: 404 });
      }

      await User.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          plan: planID._id,
        },
        { new: true }
      ).populate("plan");
    } catch (err) {
      console.error(err);
      return new Response(
        `Database Error: ${
          err instanceof Error ? err.message : "Unknown Error"
        }`,
        { status: 500 }
      );
    }
  }

  return new Response(null, { status: 200 });
}
