"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  // null = we haven't checked sessionStorage yet
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const seenSplash = sessionStorage.getItem("gs-splash");

    if (seenSplash) {
      setShowSplash(false);
      return;
    }

    setShowSplash(true);
    sessionStorage.setItem("gs-splash", "true");

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 950);

    return () => clearTimeout(timer);
  }, []);

  // Wait until the client has checked sessionStorage
  if (showSplash === null) {
    return null;
  }

  if (showSplash) {
    return <SplashScreen show={true} />;
  }

  return <>{children}</>;
}