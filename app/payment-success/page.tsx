"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function PaymentSuccess() {

  const { refreshProfile } = useUser();

  useEffect(() => {

  const activatePremium = async () => {

    for (let i = 0; i < 5; i++) {

      const updatedProfile = await refreshProfile();

      if (updatedProfile?.is_premium) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    window.location.href = "/";
  };

  activatePremium();

}, [refreshProfile]);

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

      </div>
    </div>
  );
}