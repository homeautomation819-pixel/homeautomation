"use client";

import { useState } from "react";
import { useContentOverrides } from "@/components/EditableText";

export const DEFAULT_ANNOUNCEMENT =
  "Same/next-day furniture assembly across the GTA — book your build this week";

export default function AnnouncementBar() {
  const overrides = useContentOverrides();
  const [dismissed, setDismissed] = useState(false);
  const text = overrides["announcement_bar"] ?? DEFAULT_ANNOUNCEMENT;

  if (dismissed || !text.trim()) return null;

  return (
    <div className="bg-accent-blue text-white">
      <div className="container-site flex items-center justify-center gap-4 py-2 text-center text-sm font-medium">
        <span className="text-on-accent">{text}</span>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="text-on-accent/80 transition hover:text-on-accent"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
