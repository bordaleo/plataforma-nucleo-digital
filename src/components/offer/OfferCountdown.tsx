"use client";

import { useEffect, useState } from "react";

function remaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function OfferCountdown({ endsAt }: { endsAt: string }) {
  const [time, setTime] = useState(() => remaining(endsAt));

  useEffect(() => {
    const tick = () => setTime(remaining(endsAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  if (time.expired) return <span className="text-sm">Janela encerrada</span>;

  return (
    <span className="inline-flex items-center gap-1 font-mono text-sm tabular-nums">
      <span>{pad(time.hours)}</span>
      <span>:</span>
      <span>{pad(time.minutes)}</span>
      <span>:</span>
      <span>{pad(time.seconds)}</span>
    </span>
  );
}
