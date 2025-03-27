"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/event-card";
import { Pagination } from "@/components/pagination";
import type { Event } from "@/types";
import { getEvents } from "@/lib/api";

interface EventsListProps {
  initialEvents: Event[];
}

interface Filters {
  searchTerm: string;
  location: string;
  selectedSports: string[];
  selectedMonth: number | null;
  selectedYear: number;
}

export function EventsList({ initialEvents }: EventsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState<Event[]>(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    location: "",
    selectedSports: [],
    selectedMonth: null,
    selectedYear: new Date().getFullYear(),
  });
  const eventsPerPage = 8;
  // Fetch all events once when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const events = await getEvents();
        setAllEvents(events);
        setFilteredEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    const filtered = allEvents.filter((event) => {
      const matchesSearch = filters.searchTerm
        ? event.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;

      const matchesLocation = filters.location
        ? event.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      const matchesSport =
        filters.selectedSports.length > 0
          ? filters.selectedSports.includes(event.sport)
          : true;

      const eventDate = new Date(event.start_date);
      const matchesMonth =
        filters.selectedMonth !== null
          ? eventDate.getMonth() === filters.selectedMonth
          : true;

      const matchesYear = eventDate.getFullYear() === filters.selectedYear;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSport &&
        matchesMonth &&
        matchesYear
      );
    });

    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, allEvents]);

  // Listen for filter changes from SearchFilters
  useEffect(() => {
    const handleFiltersChanged = (event: CustomEvent<{ filters: Filters }>) => {
      setFilters(event.detail.filters);
    };

    window.addEventListener(
      "filtersChanged",
      handleFiltersChanged as EventListener
    );

    return () => {
      window.removeEventListener(
        "filtersChanged",
        handleFiltersChanged as EventListener
      );
    };
  }, []);

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of events section
    document
      .getElementById("events-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F06F51]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              No se encontraron eventos con los filtros seleccionados.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
