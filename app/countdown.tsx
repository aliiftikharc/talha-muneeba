"use client";

import { useEffect, useState } from "react";

// Arrival time in Pakistan Standard Time (UTC+5).
const eventTime = new Date("2026-11-16T19:00:00+05:00").getTime();

const units = [
  { label: "Days", ms: 86_400_000, max: Infinity },
  { label: "Hours", ms: 3_600_000, max: 24 },
  { label: "Minutes", ms: 60_000, max: 60 },
  { label: "Seconds", ms: 1_000, max: 60 },
];

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = now === null ? null : Math.max(0, eventTime - now);

  if (remaining === 0) {
    return (
      <div className="countdown" aria-live="polite">
        <p className="countdown-title">The celebration has begun</p>
      </div>
    );
  }

  return (
    <div className="countdown" aria-label="Countdown to the Wedding">
      <p className="countdown-title">Counting down to the celebration</p>
      <div className="countdown-grid">
        {units.map(({ label, ms, max }) => {
          const value = remaining === null ? null : Math.floor(remaining / ms) % max;
          return (
            <div className="countdown-unit" key={label}>
              <strong>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
