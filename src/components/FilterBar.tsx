import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { ChevronDown, Filter } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (ticketType: TicketType) => void;
}

const TICKET_TYPES: TicketType[] = ["All", "Platinum", "Gold", "Silver", "VIP", "Bootcamp", "Expo"];
const LOCAL_STORAGE_KEY = "odsc-ticket-type-filter";

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedType, setSelectedType] = useState<TicketType>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return (saved as TicketType) || "All";
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedType);
    onFilterChange(selectedType);
  }, [selectedType, onFilterChange]);

  useEffect(() => {
    // Click outside handler to close dropdown
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center mb-3" ref={dropdownRef}>
      <div className="relative">
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center gap-2"
          variant="outline"
        >
          <Filter size={16} />
          <span>Filter: {selectedType}</span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 min-w-full w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 left-0">
            <div className="py-1 grid gap-1">
              {TICKET_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "ghost"}
                  onClick={() => {
                    setSelectedType(type);
                    setIsOpen(false);
                  }}
                  className="justify-start"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}