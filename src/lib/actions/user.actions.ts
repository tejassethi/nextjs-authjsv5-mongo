"use server";

import { Plan, User } from "../models/userModel";
import { connectToDatabase } from "../database/db";
import { compare, hash } from "bcryptjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function createUserWithGoogle(
  name: any,
  email: any,
  googleID: any
) {
  try {
    await connectToDatabase();
    const newUser = await User.create({
      name: name,
      email: email,
      googleID: googleID,
    });
    return { success: true, message: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    console.error("Error in createUserWithGoogle:", error);
    return { success: false, message: "An error occured. Please try again." };
  }
}

export async function createUserWithCredentail(
  name: any,
  email: any,
  password: any
) {
  try {
    await connectToDatabase();
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return { success: true, message: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    console.error("Error in createUserWithCredentail:", error);

    return { success: false, message: "An error occured. Please try again." };
  }
}

export async function authorizeUser(email: any, password: any) {
  try {
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { email: email },
      { last_login: Date.now() },
      { new: true }
    ).select("+password");

    if (!user) throw new Error("Invalid credentials");
    if (!user.password) throw new Error("Please sign in with your provider.");
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect Password");
    const userObject = user.toObject();
    const { password: userPassword, ...userSafe } = userObject;
    console.log("User logged in:", userSafe);
    console.log("done");
    return { success: true, data: userSafe };
  } catch (error: any) {
    console.error("Error in authorizeUser:", error);
    let errorMessage = "An error occurred. Please try again.";
    if (
      [
        "Invalid credentials",
        "Please sign in with your provider.",
        "Incorrect Password",
      ].includes(error.message)
    ) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
export async function getUser(email: any) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Invalid credentials");

    console.log("GET USER: ", user);

    return { success: true, data: user.toObject() };
  } catch (error) {
    let errorMessage = "An error occurred. Please try again.";
    if (["Invalid credentials"].includes((error as Error)?.message)) {
      errorMessage = (error as Error)?.message;
    }
    console.error("Error in getUser:", error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function getUserWithPlan(email: any) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email: email }).populate("plan");

    if (!user) throw new Error("Invalid credentials");

    console.log("GET USER: ", user);

    return { success: true, data: user.toObject() };
  } catch (error) {
    let errorMessage = "An error occurred. Please try again.";
    if (["Invalid credentials"].includes((error as Error)?.message)) {
      errorMessage = (error as Error)?.message;
    }
    console.error("Error in getUserWithPlan:", error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function getUserWithPassword(email: any) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) throw new Error("Invalid credentials");

    console.log("GET USER: ", user);

    return { success: true, data: user.toObject() };
  } catch (error) {
    let errorMessage = "An error occurred. Please try again.";
    if (["Invalid credentials"].includes((error as Error)?.message)) {
      errorMessage = (error as Error)?.message;
    }
    console.error("Error in getUserWithPassword:", error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function getUserPlanFromStripe(email: any) {
  try {
    await connectToDatabase();
    let user = await User.findOne({ email: email }).populate("plan");

    if (!user) {
      console.error("User not found for email:", email);
      return { success: false, message: "User not found." };
    }

    if (!user.stripeCustomerId || !user.stripeSubscriptionId) {
      const customer = await findStripeCustomerByEmail(email);

      if (!customer) {
        return createNonMemberResponse(user);
      }

      const subscription = await findStripeSubscription(customer.id);

      if (!subscription) {
        return createNonMemberResponse(user);
      }

      user = await updateUserSubscription(user, subscription);
      console.log("Updated User Plan From Stripe", user);
    }

    const subscription = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );

    if (!subscription) {
      console.error("Subscription not found for customerId:");
      return { success: false, message: "Subscription not found." };
    }

    const currentTime = new Date().getTime();
    const subscriptionEnd = new Date(user.stripeCurrentPeriodEnd).getTime();

    if (
      currentTime > subscriptionEnd &&
      subscription?.items.data[0].plan?.active === false
    ) {
      if (user.plan.toString() !== "6648677b5167ea9cbc4310d0") {
        user = await User.findOneAndUpdate(
          { email: email },
          {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
            plan: "6648677b5167ea9cbc4310d0",
          },
          { new: true }
        ).populate("plan");
      }
    } else {
      user = await updateUserSubscription(user, subscription);
    }

    console.log("Updated User Plan From Stripe", user);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
      message: "Member",
    };
  } catch (error) {
    console.error("Error in getUserPlan:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
}

async function findStripeCustomerByEmail(email: any) {
  const customer = await stripe.customers.search({
    query: `email:'${email}'`,
    limit: 1,
  });

  return customer.data[0];
}

async function findStripeSubscription(customerId: any) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
  });

  return subscriptions.data[0];
}

function createNonMemberResponse(user: any) {
  return {
    success: true,
    data: JSON.parse(JSON.stringify(user)),
    message: "Non Member User",
  };
}

async function updateUserSubscription(user: any, subscription: any) {
  const planID = await Plan.findOne({
    stripePriceId: subscription.items.data[0].price.id,
  });

  if (!planID) {
    console.error(
      "Plan not found for price ID:",
      subscription.items.data[0].price.id
    );
    throw new Error("Plan not found.");
  }

  return await User.findOneAndUpdate(
    { email: user.email },
    {
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: planID._id,
    },
    { new: true }
  ).populate("plan");
}

export async function resetPassword(email: any, password: any) {
  try {
    await connectToDatabase();
    const hashedPassword = await hash(password, 10);
    const newUser = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    return { success: true, message: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    console.log("resetPassword", error);
    return { success: false, message: "An error occured. Please try again." };
  }
}

export async function getAllPlans() {
  try {
    await connectToDatabase();
    const plans = await Plan.find();
    return { success: true, plans: JSON.parse(JSON.stringify(plans)) };
  } catch (error) {
    console.log("getAllPlans", error);
    return { success: false, message: "An error occured. Please try again." };
  }
}
