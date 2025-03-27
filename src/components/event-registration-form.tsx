"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import type { Event, EventRegistration } from "@/types";

interface EventRegistrationFormProps {
  event: Event;
}

export function EventRegistrationForm({ event }: EventRegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<EventRegistration>({
    registerSport: event.sport,
    registerClubName: "",
    registerUserName: "",
    registerUserEmail: "",
    registerUserPhone: "",
    eventName: event.title,
    eventCity: event.city || "",
    eventAddress: event.address || "",
    eventCoordinates: event.coordinates || "",
    startDate: event.start_date,
    endDate: event.end_date,
    competitionId: event.competition_id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the form data to your backend
    // For now, we'll just simulate a successful submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#021925]">
            ¡Registro Enviado!
          </h2>
          <p className="text-gray-600 mb-6">
            Gracias por tu interés en {event.title}. Te enviaremos un email con
            los accesos a la plataforma.
          </p>
          <Button
            className="w-full bg-[#021925] hover:bg-[#021925]/90 text-white"
            onClick={() => setSubmitted(false)}
          >
            Registrar otro participante
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#021925]">
          Accede a la plataforma
        </h2>
        <p className="text-gray-600">
          Entra en la plataforma para ver los detalles y montarte tu viaje a
          medida
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="registerUserName">Nombre completo</Label>
          <Input
            id="registerUserName"
            name="registerUserName"
            placeholder="Tu nombre y apellidos"
            value={formData.registerUserName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="registerUserEmail">Correo electrónico</Label>
          <Input
            id="registerUserEmail"
            name="registerUserEmail"
            type="email"
            placeholder="tu@email.com"
            value={formData.registerUserEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="registerUserPhone">Teléfono</Label>
          <Input
            id="registerUserPhone"
            name="registerUserPhone"
            placeholder="+34 600 000 000"
            value={formData.registerUserPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="registerClubName">Nombre del Club</Label>
          <Input
            id="registerClubName"
            name="registerClubName"
            placeholder="Nombre de tu club deportivo"
            value={formData.registerClubName}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#F06F51] hover:bg-[#F06F51]/90 text-white"
        >
          Acceder
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-[#F06F51] mt-0.5 mr-2" />
          <p className="text-sm text-gray-600">
            Al registrarte, podrás personalizar tu experiencia y elegir los
            servicios que mejor se adapten a tus necesidades.
          </p>
        </div>
      </div>
    </div>
  );
}
