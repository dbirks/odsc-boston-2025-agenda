import { useEffect, useState } from "react";
import rawAgendaData from "../../data/agenda.json";

export function LastUpdatedIndicator() {
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");

  useEffect(() => {
    // Handle both old and new data formats
    const apiResponse = rawAgendaData as unknown as APIResponse;
    
    // Check if we have the new format with version field
    if (apiResponse.success && apiResponse.data?.version) {
      // Use the version timestamp (milliseconds) from the API
      const timestamp = new Date(apiResponse.data.version);
      const formattedDate = timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York'
      });
      
      setLastUpdateTime(formattedDate);
    } else {
      // Fall back to old format logic
      const sessions = rawAgendaData as SessionItem[];
      
      if (!Array.isArray(sessions) || sessions.length === 0) return;

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
    }
  }, []);

  if (!lastUpdateTime) return null;

  return (
    <div className="text-xs text-gray-500 text-center mt-1 mb-4">
      <span>Agenda last updated: {lastUpdateTime} ET</span>
    </div>
  );
}