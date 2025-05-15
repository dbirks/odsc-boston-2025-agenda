import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const LOCAL_STORAGE_KEY = "odsc-selected-day";

interface DaySelectorProps {
  availableDays: string[];
  onDayChange: (day: string) => void;
}

export function DaySelector({ availableDays, onDayChange }: DaySelectorProps) {
  const [selectedDay, setSelectedDay] = useState<string>(() => {
    // Try to get saved day from local storage
    const savedDay = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedDay || "";
  });

  useEffect(() => {
    if (availableDays.length === 0) return;

    // If we already have a selectedDay and it's in the availableDays, keep it
    if (selectedDay && availableDays.includes(selectedDay)) {
      // Just use the existing selected day
    } else {
      // Format today's date in the same format as in the data (YYYY-MM-DD)
      // Use Eastern time (ET) for consistency with conference timezone
      const today = new Date();
      const todayET = new Date(today.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const formattedToday = todayET.toISOString().split('T')[0];

      // Check if today's date is in the available days
      if (availableDays.includes(formattedToday)) {
        setSelectedDay(formattedToday);
      } else {
        // Default to May 13th if today is not in the available days
        const defaultDay = availableDays.find(day => day === "2025-05-13") || availableDays[0];
        setSelectedDay(defaultDay);
      }
    }
  }, [availableDays, selectedDay]);

  useEffect(() => {
    if (selectedDay) {
      // Save to local storage when selectedDay changes
      localStorage.setItem(LOCAL_STORAGE_KEY, selectedDay);
      onDayChange(selectedDay);
    }
  }, [selectedDay, onDayChange]);

  // Format date for display (e.g., "May 13")
  const formatDisplayDate = (dateString: string) => {
    // Ensure consistent timezone handling
    const date = new Date(dateString + 'T12:00:00'); // Add noon time to avoid DST issues
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'America/New_York' });
  };

  // Handler to ensure clean day selection
  const handleDaySelect = (day: string) => {
    // Only update if actually changing days
    if (day !== selectedDay) {
      setSelectedDay(day);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-3">
      {availableDays.map((day) => (
        <Button
          key={day}
          variant={selectedDay === day ? "default" : "outline"}
          onClick={() => handleDaySelect(day)}
          className="px-6"
        >
          {formatDisplayDate(day)}
        </Button>
      ))}
    </div>
  );
}