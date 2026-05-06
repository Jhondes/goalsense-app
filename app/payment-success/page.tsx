"use client";

import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    // Optional: small delay then go home
    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="bg-gray-900 p-6 rounded-xl text-center max-w-md w-full space-y-4">

        <h1 className="text-2xl font-bold text-green-400">
          ✅ Payment Successful
        </h1>

        <p className="text-sm text-gray-300">
          Your payment has been received.
        </p>

        <p className="text-sm text-yellow-400">
          🚀 Activating your premium access...
        </p>

        <p className="text-xs text-gray-500">
          You will be redirected shortly.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 w-full bg-green-600 hover:bg-green-500 py-2 rounded-lg font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}