// src/app/api/create-payment-intent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: Request) {
  try {
    const { amount, currency } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new NextResponse(errorMessage, { status: 400 });
  }
}
