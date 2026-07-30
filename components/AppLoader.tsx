"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("gs-splash");
  });

  useEffect(() => {
    if (!showSplash) return;

    sessionStorage.setItem("gs-splash", "true");

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 950);

    return () => clearTimeout(timer);
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen show={true} />;
  }

  return <>{children}</>;
}