"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function AppLoader() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Only show once per browser tab
    if (sessionStorage.getItem("gs-splash")) return;

    sessionStorage.setItem("gs-splash", "true");

    setShowSplash(true);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 950);

    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen show={showSplash} />;
}