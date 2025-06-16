"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

// Se houvessem mais de um plano, teria que utilizar o .schema() com um objeto que teria um enum com {"essential", "pro"}
// export const createStripeCheckout = actionClient.schema(z.object({plan: z.enum(["essential", "pro"]),})).action(async ({parsedInput: {plan}}) => {
export const createStripeCheckout = actionClient.action(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  if (!session.user.clinic) {
    throw new Error("Clinic not found");
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  // Cada plano necessita de uma session diferente
  const { id: sessionId } = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "boleto"],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    subscription_data: {
      metadata: {
        userId: session.user.id,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_ESSENTIAL_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return {
    sessionId,
  };
});
