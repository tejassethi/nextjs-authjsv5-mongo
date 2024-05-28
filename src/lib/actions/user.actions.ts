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
    const user = await User.findOne({ email: email });

    if (!user) {
      console.error("User not found for email:", email);
      return { success: false, message: "User not found." };
    }

    if (!user.stripeCustomerId) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
        message: "no payment",
      };
    }

    const subscription = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );

    if (!subscription) {
      console.error(
        "Subscription not found for customerId:",
        user.stripeCustomerId
      );
      return { success: false, message: "Subscription not found." };
    }

    const planID = await Plan.findOne({
      stripePriceId: subscription.items.data[0].price.id,
    });

    if (!planID) {
      console.error(
        "Plan not found for price ID:",
        subscription.items.data[0].price.id
      );
      return { success: false, message: "Plan not found." };
    }

    console.log(
      "Checking for matching User document with stripeSubscriptionId:",
      subscription.id
    );

    const update = await User.findOneAndUpdate(
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

    console.log("Updated User Plan From Stripe", update);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(update)),
      message: "member",
    };
  } catch (error) {
    console.error("Error in getUserPlan:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
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
    const plans = await Plan.find();
    return { success: true, plans: JSON.parse(JSON.stringify(plans)) };
  } catch (error) {
    console.log("getAllPlans", error);
    return { success: false, message: "An error occured. Please try again." };
  }
}
