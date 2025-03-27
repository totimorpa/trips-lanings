"use client";

import { useState } from "react";
import {
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { SportsMultiselect } from "./sports-multiselect";
import { SPORTS } from "@/lib/constants";

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

// Sample sports data with icons
const sports = [
  { id: "football", name: "Fútbol", icon: "⚽" },
  { id: "basketball", name: "Baloncesto", icon: "🏀" },
  { id: "tennis", name: "Tenis", icon: "🎾" },
  { id: "golf", name: "Golf", icon: "⛳" },
  { id: "rugby", name: "Rugby", icon: "🏉" },
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "baseball", name: "Béisbol", icon: "⚾" },
  { id: "f1", name: "Fórmula 1", icon: "🏎️" },
  { id: "athletics", name: "Atletismo", icon: "🏃" },
  { id: "swimming", name: "Natación", icon: "🏊" },
  { id: "cycling", name: "Ciclismo", icon: "🚴" },
  { id: "volleyball", name: "Voleibol", icon: "🏐" },
  { id: "handball", name: "Balonmano", icon: "🤾" },
  { id: "hockey", name: "Hockey", icon: "🏑" },
  { id: "boxing", name: "Boxeo", icon: "🥊" },
];

// Sample events for autocomplete
const sampleEvents = [
  "Copa Mundial FIFA 2026",
  "Wimbledon 2025",
  "Juegos Olímpicos 2024",
  "Super Bowl LIX",
  "F1 Gran Premio de Mónaco 2024",
  "Copa Mundial de Rugby 2027",
  "Tour de Francia 2024",
  "US Open 2024",
  "Champions League Final 2025",
  "Masters de Augusta 2025",
  "NBA Finals 2024",
  "Copa América 2024",
  "Australian Open 2025",
  "Mundial de Atletismo 2025",
];

export function SearchFilters() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleYearChange = (increment: number) => {
    setSelectedYear((prev) => prev + increment);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
  };

  const handleSearch = () => {
    // Emit the filter criteria
    window.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: {
          filters: {
            searchTerm,
            location,
            selectedSports,
            selectedMonth,
            selectedYear,
          },
        },
      })
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm max-w-4xl mx-auto">
      <div className="flex flex-col gap-3">
        {/* First Row: Sport, Date, Location */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="w-full sm:w-[300px]">
            <SportsMultiselect
              selectedSports={selectedSports}
              onChange={setSelectedSports}
            />
          </div>
          <div className="w-full sm:w-[150px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    selectedMonth === null && "text-muted-foreground"
                  }`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedMonth !== null
                    ? `${MONTHS[selectedMonth]} ${selectedYear}`
                    : "Mes"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleYearChange(-1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">{selectedYear}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleYearChange(1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {MONTHS.map((month, index) => (
                      <Button
                        key={month}
                        variant={
                          selectedMonth === index ? "default" : "outline"
                        }
                        className="h-8"
                        onClick={() => handleMonthSelect(index)}
                      >
                        {month}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full sm:w-[200px]">
            <Input
              type="text"
              placeholder="Ubicación..."
              className="w-full"
              startIcon={<MapPin className="w-4 h-4 text-gray-500" />}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Second Row: Search Bar and Button */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar evento..."
              className="w-full"
              startIcon={<Search className="w-4 h-4 text-gray-500" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[120px]">
            <Button
              className="w-full bg-[#F06F51] hover:bg-[#F06F51]/90 text-white px-6"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
