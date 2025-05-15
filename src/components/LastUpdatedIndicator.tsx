import { useEffect, useState } from "react";

export function LastUpdatedIndicator() {
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Only fetch the data if it hasn't been loaded yet
    if (hasLoaded) return;

    // Fetch the data at runtime
    fetch('./data/agenda.json')
      .then(response => response.json())
      .then(data => {
        setHasLoaded(true);
        
        // Handle both old and new data formats
        const apiResponse = data as unknown as APIResponse;
        
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
          const sessions = data as unknown as SessionItem[];
          
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
      })
      .catch(error => {
        console.error('Error loading agenda data for timestamp:', error);
      });
  }, [hasLoaded]);

  if (!lastUpdateTime) return null;

  return (
    <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 mb-4">
      <span>Agenda data last refreshed at: {lastUpdateTime} ET</span>
    </div>
  );
}