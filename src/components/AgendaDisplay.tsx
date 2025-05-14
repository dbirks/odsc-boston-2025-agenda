import { useEffect, useState } from "react";
import type { SessionItem, TicketType } from "../types";
import { FilterBar } from "./FilterBar";
import { SessionCard } from "./SessionCard";
import { DaySelector } from "./DaySelector";
import agendaData from "../../data/agenda.json";
import { Badge } from "./ui/badge";

export function AgendaDisplay() {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<SessionItem[]>([]);
  const [ticketFilter, setTicketFilter] = useState<TicketType>("All");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");

  // Load and parse JSON data
  useEffect(() => {
    const data = agendaData as SessionItem[];
    setSessions(data);

    // Extract unique dates for the day selector
    const uniqueDates = [...new Set(data.map(session => session.date))];
    uniqueDates.sort(); // Sort chronologically
    setAvailableDays(uniqueDates);
  }, []);

  // Apply filters when sessions, ticketFilter, or selectedDay changes
  useEffect(() => {
    let filtered = [...sessions];

    // Apply ticket type filter
    if (ticketFilter !== "All") {
      filtered = filtered.filter(session =>
        session.access === ticketFilter ||
        // Special case for Gold (which might include access to Premium and General)
        (ticketFilter === "Gold" && (session.access === "Premium" || session.access === "General"))
      );
    }

    // Apply day filter
    if (selectedDay) {
      filtered = filtered.filter(session => session.date === selectedDay);
    }

    // Sort by start time
    filtered.sort((a, b) => {
      return a.timerStartTime.localeCompare(b.timerStartTime);
    });

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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ODSC Boston 2025 Agenda</h1>
      
      <div className="space-y-4">
        <DaySelector availableDays={availableDays} onDayChange={handleDayChange} />
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="mt-6">
        {selectedDay && (
          <h2 className="text-xl font-semibold mb-4 flex items-center sticky top-0 bg-white z-10 py-2">
            <Badge variant="secondary" className="mr-2 text-base px-3 py-1">
              {formatDate(selectedDay)}
            </Badge>
          </h2>
        )}

        {filteredSessions.map(session => (
          <SessionCard key={session._id} session={session} />
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