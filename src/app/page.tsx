import { Suspense } from "react";
import { SearchFilters } from "@/components/search-filters";
import { EventsList } from "@/components/events-list";
import { InfoIcon as InfoCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getEvents } from "@/lib/api";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const events = await getEvents();

  return (
    <main
      className="flex min-h-screen flex-col"
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="https://egruppa-storage.s3.amazonaws.com/assets/landing/banner-landing-viajes.png"
          alt="Eventos deportivos"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Search Section */}
      <section className="bg-white py-8 px-4 md:py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#021925]">
            Encuentra Tu Evento Deportivo
          </h2>
          <SearchFilters />
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-[#021925]/5 py-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <InfoCircle className="text-[#F06F51] mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium mb-2 text-[#021925]">
                Eventos gestionados por Athlos
              </h2>
              <p className="text-gray-600">
                Los eventos mostrados a continuación son aquellos que Athlos
                esta trabajando. Si no encuentras el evento que buscas, puedes
                crear tu propio viaje personalizado en nuestra plataforma y te
                garantizamos un excelente servicio y los mejores precios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events-section" className="bg-gray-50 py-12 px-4 md:py-16">
        <div className="container mx-auto">
          <Suspense fallback={<div>Cargando eventos...</div>}>
            <EventsList initialEvents={events} />
          </Suspense>
        </div>
      </section>

      {/* Can't Find Event Section */}
      <section className="bg-white py-12 px-4 border-t border-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#021925]">
            ¿No encuentras el evento que buscas?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            En Athlos te ayudamos a crear tu viaje deportivo personalizado.
            Cuéntanos qué evento te interesa y nos pondremos en contacto
            contigo.
          </p>
          <Button className="bg-[#F06F51] hover:bg-[#F06F51]/90 text-white px-8 py-6 text-lg">
            Solicitar Evento Personalizado
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#021925] text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para una Experiencia Inolvidable?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de entusiastas del deporte que han viajado con
            nosotros a los eventos más grandes del mundo
          </p>
          <Button className="bg-[#F06F51] hover:bg-[#F06F51]/90 text-white px-8 py-6 text-lg rounded-full">
            Contacta a Nuestro Equipo
          </Button>
        </div>
      </section>
    </main>
  );
}
