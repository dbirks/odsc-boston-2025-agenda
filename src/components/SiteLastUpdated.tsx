import { useState } from "react";

export function SiteLastUpdated() {
  const [lastUpdateTime] = useState<string>("May 15, 2025 12:57 AM");

  return (
    <div className="text-xs text-gray-500 text-center mb-1">
      <span>Site last updated: {lastUpdateTime} ET</span>
    </div>
  );
}