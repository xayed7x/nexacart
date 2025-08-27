// src/app/api/initiate-ssl-payment/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { total_amount, currency, cartItems, customer_info } = body;

    // 1. Generate a unique transaction ID
    const tran_id = `TXN_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // 2. Get credentials from environment variables
    const store_id = process.env.SSLCOMMERZ_STORE_ID;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
    const is_live = false; // Set to true for live environment

    // 3. Prepare the data payload for SSLCOMMERZ
    const data = {
      store_id,
      store_passwd,
      total_amount: total_amount,
      currency: currency,
      tran_id: tran_id, // a unique transection id
      // These URLs will be used by SSLCOMMERZ to redirect the user back to our site
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
      fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment-ipn`, // We will build this later
      shipping_method: "Courier",
      product_name: cartItems.map((item: any) => item.name).join(", "),
      product_category: "E-commerce",
      product_profile: "general",
      cus_name: `${customer_info.firstName} ${customer_info.lastName}`,
      cus_email: customer_info.email,
      cus_add1: customer_info.address,
      cus_city: customer_info.city,
      cus_postcode: customer_info.postalCode,
      cus_country: customer_info.country,
      cus_phone: "01711111111", // Placeholder - you might want to add this to your form
      ship_name: `${customer_info.firstName} ${customer_info.lastName}`,
      ship_add1: customer_info.address,
      ship_city: customer_info.city,
      ship_postcode: customer_info.postalCode,
      ship_country: customer_info.country,
    };

    // 4. Use FormData as SSLCOMMERZ expects x-www-form-urlencoded
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, (data as any)[key]);
    }

    // 5. Make the API call to SSLCOMMERZ
    const sslcz = await fetch(
      is_live
        ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
        : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const response = await sslcz.json();

    // 6. Send the response back to the client
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in SSLCOMMERZ initiation:", error);
    return NextResponse.json(
      {
        status: "FAILED",
        message: "Failed to initiate payment.",
      },
      { status: 500 }
    );
  }
}
