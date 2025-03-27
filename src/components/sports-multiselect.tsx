"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SPORTS } from "@/lib/constants";

type Sport = (typeof SPORTS)[number];

interface SportsMultiselectProps {
  selectedSports: string[];
  onChange: (sports: string[]) => void;
}

export function SportsMultiselect({
  selectedSports,
  onChange,
}: SportsMultiselectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSports = SPORTS.filter((sport) =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSport = (sportId: string) => {
    const newSelection = selectedSports.includes(sportId)
      ? selectedSports.filter((id) => id !== sportId)
      : [...selectedSports, sportId];
    onChange(newSelection);
  };

  const removeSport = (sportId: string) => {
    onChange(selectedSports.filter((id) => id !== sportId));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedSports.length === 0
            ? "Seleccionar deportes"
            : `${selectedSports.length} deporte${
                selectedSports.length === 1 ? "" : "s"
              }`}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {selectedSports.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedSports.map((sportId) => {
            const sport = SPORTS.find((s) => s.id === sportId);
            if (!sport) return null;
            return (
              <Badge
                key={sport.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {sport.icon} {sport.name}
                <button
                  type="button"
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => removeSport(sport.id)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-white p-2 shadow-md">
          <Input
            type="search"
            placeholder="Buscar deportes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <div className="max-h-60 overflow-auto">
            {filteredSports.map((sport) => (
              <div
                key={sport.id}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleSport(sport.id)}
              >
                <div className="flex h-4 w-4 items-center justify-center">
                  {selectedSports.includes(sport.id) && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <span className="mr-2">{sport.icon}</span>
                {sport.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
