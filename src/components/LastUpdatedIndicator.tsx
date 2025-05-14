import { useEffect, useState } from "react";
import agendaData from "../../data/agenda.json";

export function LastUpdatedIndicator() {
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");

  useEffect(() => {
    // Find the most recent _updatedAt timestamp
    const sessions = agendaData as SessionItem[];
    
    if (sessions.length === 0) return;

    // Find the latest _updatedAt timestamp
    const latestTimestamp = sessions.reduce((latest, session) => {
      if (!session._updatedAt) return latest;
      return new Date(session._updatedAt) > new Date(latest) ? session._updatedAt : latest;
    }, sessions[0]._updatedAt || "");

    if (latestTimestamp) {
      // Format the timestamp nicely
      const date = new Date(latestTimestamp);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York' // Assuming conference is in Eastern time
      });
      
      setLastUpdateTime(formattedDate);
    }
  }, []);

  if (!lastUpdateTime) return null;

  return (
    <div className="text-xs text-gray-500 text-center mt-1 mb-4">
      <span>Agenda last updated: {lastUpdateTime} ET</span>
    </div>
  );
}