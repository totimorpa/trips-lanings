"use client";

import Image from "next/image";
import { Hotel, Bus, Map, Package } from "lucide-react";
import type { EventService } from "@/types";

interface EventServicesProps {
  services: EventService[];
}

const serviceIcons = {
  accommodation: Hotel,
  transport: Bus,
  tour: Map,
  other: Package,
};

export function EventServices({ services }: EventServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-[#021925]">
        Servicios Disponibles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = serviceIcons[service.type];
          return (
            <div
              key={service.id}
              className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-[#F06F51] transition-colors"
            >
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6 text-[#F06F51]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#021925] mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {service.description_es}
                </p>
                {service.price_text && (
                  <span className="text-sm font-medium text-[#F06F51]">
                    {service.price_text}
                  </span>
                )}
              </div>
              {service.image && (
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
