"use client";

import { useEffect, useState } from "react";

type Activity = {
  name: string;
  city?: string;
  action: string;
  type: "normal" | "premium";
};

const activities: Activity[] = [
  { name: "Michael", city: "Abuja", action: "generated 5 picks", type: "normal" },
  { name: "Chinedu", action: "unlocked Premium", type: "premium" },
  { name: "David", city: "Lagos", action: "generated 3 picks", type: "normal" },
  { name: "Samuel", city: "Port Harcourt", action: "upgraded to PRO", type: "premium" },
  { name: "Ibrahim", city: "Kano", action: "generated 7 picks", type: "normal" },
  { name: "Tobi", city: "Ibadan", action: "unlocked VIP access", type: "premium" },
];

export default function ActivityTicker() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [visible, setVisible] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const showActivity = () => {
      const random =
        activities[Math.floor(Math.random() * activities.length)];

      setActivity(random);
      setSecondsAgo(0);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    showActivity();

    const interval = setInterval(showActivity, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  if (!activity) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div
        className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-xl max-w-sm border ${
          activity.type === "premium"
            ? "bg-yellow-500/10 border-yellow-500/30"
            : "bg-gray-900/90 border-gray-800"
        }`}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-semibold">
            {activity.name[0]}
          </div>

          {/* Live pulse */}
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-sm text-white leading-snug">
            <span className="font-semibold">{activity.name}</span>
            {activity.city && (
              <span className="text-gray-400"> from {activity.city}</span>
            )}{" "}
            {activity.action}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {secondsAgo}s ago
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="text-gray-500 hover:text-white text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}