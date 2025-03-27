"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Users,
  ArrowLeft,
} from "lucide-react";
import { EventRegistrationForm } from "@/components/event-registration-form";
import { EventServices } from "@/components/event-services";
import Link from "next/link";
import type { Event, EventService } from "@/types";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Mock event services data (replace with actual data from Supabase)
const mockServices: EventService[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    event_id: "1",
    type: "accommodation",
    title: "Hotel Grand Plaza",
    description_es: "Alojamiento de lujo en el centro de la ciudad",
    description_en: "Luxury accommodation in the city center",
    price_text: "Desde 150€/noche",
    image: "https://picsum.photos/id/1048/800/600",
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    event_id: "1",
    type: "transport",
    title: "Traslados Aeropuerto",
    description_es: "Servicio de transporte privado desde el aeropuerto",
    description_en: "Private airport transfer service",
    price_text: "50€ por trayecto",
  },
  {
    id: "3",
    created_at: new Date().toISOString(),
    event_id: "1",
    type: "tour",
    title: "Tour por la Ciudad",
    description_es: "Visita guiada por los principales puntos de interés",
    description_en: "Guided tour through main points of interest",
    price_text: "35€ por persona",
    image: "https://picsum.photos/id/1015/800/600",
  },
];

export default function EventPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [services, setServices] = useState<EventService[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchEventData();
  }, [params.id]);

  const fetchEventData = async () => {
    try {
      // Fetch event data from Supabase
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (eventError) throw eventError;

      // Fetch event services from Supabase
      const { data: servicesData, error: servicesError } = await supabase
        .from("event_services")
        .select("*")
        .eq("event_id", params.id);

      if (servicesError) throw servicesError;

      setEvent(eventData);
      setServices(servicesData || mockServices); // Use mock data if no services found
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F06F51]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Evento no encontrado</h1>
        <p className="mb-8">
          Lo sentimos, el evento que buscas no existe o ha sido eliminado.
        </p>
        <Link href="/" className="text-[#F06F51] hover:underline">
          Volver a la página principal
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <div className="absolute inset-0 bg-[#021925]/50 z-10"></div>
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white z-20">
          <Link
            href="/"
            className="inline-flex items-center text-white mb-4 hover:text-[#F06F51] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a eventos
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="inline-flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              {event.start_date} - {event.end_date}
            </span>
            <span className="inline-flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </span>
            <span className="inline-flex items-center text-sm">
              <Trophy className="mr-2 h-4 w-4" />
              {event.sport}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#021925]">
              Descripción del Evento
            </h2>
            <p className="text-gray-700 mb-6">{event.description_es}</p>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex items-start">
                <Trophy className="text-[#F06F51] mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-[#021925]">Deporte</h3>
                  <p className="text-gray-600">{event.sport}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-[#F06F51] mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-[#021925]">Ciudad</h3>
                  <p className="text-gray-600">{event.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Services */}
          <EventServices services={services} />

          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#021925]">
              Ubicación
            </h2>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="font-medium text-[#021925] bg-white px-4 py-2 rounded-lg">
                  {event.address}
                </p>
              </div>
              <Image
                src={`https://picsum.photos/id/${1080}/1200/600`}
                alt={`Mapa de ${event.location}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        </div>

        {/* Registration Form - Fixed on Desktop */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-10">
            <EventRegistrationForm event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
