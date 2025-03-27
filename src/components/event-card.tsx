import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const formattedStartDate = format(startDate, "d 'de' MMMM, yyyy", {
    locale: es,
  });
  const formattedEndDate = format(endDate, "d 'de' MMMM, yyyy", { locale: es });

  return (
    <Link href={`/event/${event.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-sm font-medium bg-[#021925]/10 text-[#021925] rounded">
              {event.sport}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-[#021925]">
            {event.title}
          </h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {formattedStartDate}
                {startDate.toISOString() !== endDate.toISOString() &&
                  ` - ${formattedEndDate}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
