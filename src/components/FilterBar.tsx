import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface FilterBarProps {
  onFilterChange: (ticketType: TicketType) => void;
}

const TICKET_TYPES: TicketType[] = ["All", "General", "Premium", "Platinum", "Gold"];
const LOCAL_STORAGE_KEY = "odsc-ticket-type-filter";

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedType, setSelectedType] = useState<TicketType>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return (saved as TicketType) || "All";
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedType);
    onFilterChange(selectedType);
  }, [selectedType, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {TICKET_TYPES.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "outline"}
          onClick={() => setSelectedType(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
}