import { connectToDatabase } from "@/lib/database/db";
import { Plan, User } from "@/lib/models/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const reqText = await req.text();
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "failed"
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  await connectToDatabase();
  const plan = await Plan.findOne({
    stripePriceId: subscription.items.data[0]?.price.id,
  });

  const subscriptionData = {
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    plan: plan._id || "6648677b5167ea9cbc4310d0",
  };

  let data;
  if (type === "failed") {
    data = await User.findOneAndUpdate(
      {
        email: customerEmail,
      },
      {
        stripeSubscriptionId: null,
        stripePriceId: null,
        plan: "6648677b5167ea9cbc4310d0",
      }
    );
    if (!data) {
      console.error("Error updating user subscription status:", data);
      return NextResponse.json({
        status: 500,
        error: "Error updating user subscription status",
      });
    }
  } else if (type === "created" || type === "updated") {
    data = await User.findOneAndUpdate(
      {
        email: customerEmail,
      },
      subscriptionData
    );
  }

  if (!data) {
    console.error(`Error during subscription ${type}:`, data);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Subscription ${type} success`,
    data,
  });
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata;
  const customerEmail = session.metadata?.email || session.customer_email;

  const subscriptionId = session.subscription;
  try {
    const subscription = await stripe.subscriptions.update(
      subscriptionId as string,
      { metadata }
    );

    await connectToDatabase();

    const plan = await Plan.findOne({
      stripePriceId: subscription.items.data[0]?.price.id,
    });

    const subscriptionData = {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: plan._id || "6648677b5167ea9cbc4310d0",
    };

    const data = await User.findOneAndUpdate(
      {
        email: customerEmail,
      },
      subscriptionData
    );

    if (!data) throw new Error("Error updating user subscription");

    return NextResponse.json({
      status: 200,
      message: "Subscription metadata updated successfully",
    });
  } catch (error) {
    console.error("Error updating subscription metadata:", error);
    return NextResponse.json({
      status: 500,
      error: "Error updating subscription metadata",
    });
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest
): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");

  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "checkout.session.async_payment_failed":
        return handleSubscriptionEvent(event, "failed");
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}
