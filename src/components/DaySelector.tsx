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
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];

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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {availableDays.map((day) => (
        <Button
          key={day}
          variant={selectedDay === day ? "default" : "outline"}
          onClick={() => setSelectedDay(day)}
          className="px-6"
        >
          {formatDisplayDate(day)}
        </Button>
      ))}
    </div>
  );
}