import { useEffect, useState } from "react";
import { FilterBar } from "./FilterBar";
import { SessionCard } from "./SessionCard";
import { DaySelector } from "./DaySelector";
import { LastUpdatedIndicator } from "./LastUpdatedIndicator";
import { Badge } from "./ui/badge";

export function AgendaDisplay() {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<SessionItem[]>([]);
  const [ticketFilter, setTicketFilter] = useState<TicketType>("All");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");

  // State to keep track of whether data has been fetched
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  
  // Load and parse JSON data
  useEffect(() => {
    // Avoid re-fetching data if it's already loaded
    if (dataFetched) return;
    
    // Fetch the data at runtime
    fetch('./data/agenda.json')
      .then(response => response.json())
      .then(data => {
        // Mark data as fetched
        setDataFetched(true);
        
        // Handle the new data format
        const apiResponse = data as unknown as APIResponse;
        
        // Extract sessions and map to compatible format if needed
        const sessionData = apiResponse.success && apiResponse.data ? 
          apiResponse.data.sessions.map(processSession) : [];
        
        // Clear previous sessions and set the new ones
        setSessions(sessionData);

        // Extract unique dates from the data structure
        const uniqueDates = apiResponse.success && apiResponse.data?.dates ? 
          apiResponse.data.dates.map(date => date.key) : [];
        
        console.log(`Total sessions: ${sessionData.length}`);
        console.log(`Available days: ${uniqueDates.join(', ')}`);

        setAvailableDays(uniqueDates);
        
        // Set default day if provided by API
        if (apiResponse.success && apiResponse.data?.dateIndex !== undefined && 
            apiResponse.data.dates && apiResponse.data.dates.length > 0) {
          const defaultIndex = apiResponse.data.dateIndex;
          if (apiResponse.data.dates[defaultIndex]) {
            setSelectedDay(apiResponse.data.dates[defaultIndex].key);
          }
        }
      })
      .catch(error => {
        console.error('Error loading agenda data:', error);
      });
  }, [dataFetched]);

  // Process session to ensure compatibility with UI
  const processSession = (session: SessionItem): SessionItem => {
    // Map new fields to old fields for compatibility
    const processed: SessionItem = {
      ...session,
      _id: session.uniqueId,
      _updatedAt: new Date().toISOString(), // Not available in new format
      talkTitle: session.title || session.talkTitle,
      timerStartTime: session.startTime || session.timerStartTime,
      // Access indicates ticket type level - we'll use the first in the array
      access: session.ticketTypes && session.ticketTypes.length > 0 ? 
        session.ticketTypes[0] : 'Premium',
      // For filtering purposes, set active to "yes" for all sessions
      active: session.isHighlighted === false ? "yes" : "no",
      difficulty: session.sessionLevel || session.difficulty,
      subtrack: session.sessionType || session.subtrack,
    };
    
    // Extract topic tags from the new tags array
    if (session.tags && session.tags.length > 0) {
      processed.topicTag1 = session.tags[0];
      if (session.tags.length > 1) processed.topicTag2 = session.tags[1];
      if (session.tags.length > 2) processed.topicTag3 = session.tags[2];
      if (session.tags.length > 3) processed.topicTag4 = session.tags[3];
    }
    
    // Speaker information
    if (session.speakers && session.speakers.length > 0) {
      const speaker = session.speakers[0];
      processed.speakerName = speaker.name;
      processed.speakerTitle = speaker.jobTitle;
      processed.speakerCompany = speaker.company;
    }
    
    return processed;
  };

  // Apply filters when sessions, ticketFilter, or selectedDay changes
  useEffect(() => {
    // Always clear filtered sessions first to avoid accumulation
    setFilteredSessions([]);
    
    // Make sure we have sessions to filter
    if (sessions.length === 0) return;
    
    // Create a new array for filtering to avoid mutations
    const filtered = sessions
      // First, filter by day
      .filter(session => !selectedDay || session.date === selectedDay)
      // Then, filter by ticket type
      .filter(session => {
        if (ticketFilter === "All") return true;
        
        // Try to match using the new ticketTypes array first
        if (session.ticketTypes && session.ticketTypes.includes(ticketFilter)) {
          return true;
        }
        
        // Fall back to the old access field
        return session.access === ticketFilter ||
          // Special case for Gold (which might include access to Premium and General)
          (ticketFilter === "Gold" && (session.access === "Premium" || session.access === "General"));
      })
      // Sort by start time
      .sort((a, b) => {
        if (a.utcStartTimeMilliseconds && b.utcStartTimeMilliseconds) {
          return a.utcStartTimeMilliseconds - b.utcStartTimeMilliseconds;
        }
        return (a.timerStartTime || '').localeCompare(b.timerStartTime || '');
      });
    
    console.log(`Filtered sessions for ${selectedDay || 'all days'}: ${filtered.length}`);
    
    // Set the filtered sessions with a clean array
    setFilteredSessions(filtered);
  }, [sessions, ticketFilter, selectedDay]);

  // Handle filter changes
  const handleFilterChange = (type: TicketType) => {
    setTicketFilter(type);
  };

  // Handle day selection changes
  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };

  // Format date for display (e.g., "2025-05-14" to "May 14, 2025")
  const formatDate = (dateString: string) => {
    // Add time component to avoid timezone issues
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-3">
      <h1 className="text-3xl font-bold mb-2 text-center">Unofficial ODSC Boston 2025 Agenda</h1>
      <LastUpdatedIndicator />
      
      <div className="space-y-2">
        <DaySelector availableDays={availableDays} onDayChange={handleDayChange} />
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      
      <div className="mt-6">
        {selectedDay && (
          <h2 className="text-xl font-semibold mb-4 flex items-center sticky top-0 bg-white z-10 py-2">
            <Badge variant="default" className="mr-2 text-base px-3 py-1">
              {formatDate(selectedDay)}
            </Badge>
            <Badge
              variant={
                ticketFilter === "Platinum" ? "destructive" :
                ticketFilter === "Gold" ? "gold" : 
                ticketFilter === "Silver" ? "secondary" :
                ticketFilter === "VIP" ? "default" :
                ticketFilter === "Bootcamp" ? "secondary" :
                ticketFilter === "Expo" ? "outline" : "outline"
              }
              className="text-base px-3 py-1">
              {ticketFilter}
            </Badge>
          </h2>
        )}
        
        {filteredSessions.map((session, index) => (
          <SessionCard 
            key={`${selectedDay}-${session._id}-${index}`} 
            session={session} 
          />
        ))}
      </div>
      
      {filteredSessions.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No sessions found matching your filters.</p>
        </div>
      )}
    </div>
  );
}