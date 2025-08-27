// src/app/api/payment-ipn/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    console.log("Received SSLCOMMERZ IPN:", data);

    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
    if (!store_passwd) {
      throw new Error('SSLCOMMERZ_STORE_PASSWORD is not set');
    }

    // 1. Check if the IPN is valid
    if (data.verify_sign && data.verify_key) {
      // Step 1: Create a hash of the store password
      const pass_hash = crypto.createHash('md5').update(store_passwd).digest('hex').toUpperCase();

      // Step 2: Prepare the data to be hashed by sorting and concatenating
      const received_hash = data.verify_sign as string;
      const verify_keys = (data.verify_key as string).split(',');
      
      let string_to_hash = '';
      verify_keys.forEach(key => {
        string_to_hash += `${key}=${data[key]}&`;
      });
      string_to_hash = string_to_hash.slice(0, -1); // remove last '&'

      // Step 3: Append the hashed password to the string
      const string_with_pass = string_to_hash + '&store_passwd=' + pass_hash;

      // Step 4: Create the final hash
      const calculated_hash = crypto.createHash('md5').update(string_with_pass).digest('hex').toUpperCase();
      
      // Step 5: Compare the hashes
      if (calculated_hash === received_hash.toUpperCase()) {
        
        // At this point, the IPN is VERIFIED.
        // Now, we check the transaction status.
        if (data.status === 'VALID') {
          console.log(`IPN VALIDATION SUCCESS: Transaction ID ${data.tran_id} is successful.`);
          // =================================================================
          // THIS IS WHERE YOU WOULD UPDATE YOUR DATABASE
          // e.g., markOrderAsPaid(data.tran_id);
          // =================================================================
        } else {
          console.log(`IPN VALIDATION SUCCESS: Transaction ID ${data.tran_id} failed or was cancelled. Status: ${data.status}`);
          // =================================================================
          // THIS IS WHERE YOU WOULD UPDATE YOUR DATABASE
          // e.g., markOrderAsFailed(data.tran_id);
          // =================================================================
        }

        return NextResponse.json({ status: 'SUCCESS', message: 'IPN Verified.' }, { status: 200 });

      } else {
        // Hash mismatch - IPN is tampered or fraudulent
        console.error("IPN HASH MISMATCH: Validation failed.");
        return NextResponse.json({ status: 'FAILED', message: 'Invalid IPN Signature.' }, { status: 403 });
      }
    } else {
      // No signature found - Invalid request
      console.error("IPN VALIDATION FAILED: No verify_sign or verify_key in request.");
      return NextResponse.json({ status: 'FAILED', message: 'Invalid IPN Request.' }, { status: 400 });
    }

  } catch (error) {
    console.error("Error processing IPN:", error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}